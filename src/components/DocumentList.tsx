
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Calendar, 
  User, 
  Building, 
  Search,
  SortAsc,
  Filter,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock data for demonstration
const mockDocuments = [
  {
    id: 1,
    title: 'Blood Test Results - Complete Metabolic Panel',
    type: 'Lab Results',
    date: '2024-05-28',
    provider: 'Dr. Sarah Johnson',
    facility: 'City Medical Lab',
    status: 'processed',
    priority: 'high',
    summary: 'Glucose levels elevated, recommend follow-up',
    confidence: 0.95
  },
  {
    id: 2,
    title: 'Chest X-Ray Report',
    type: 'Imaging',
    date: '2024-05-25',
    provider: 'Dr. Michael Chen',
    facility: 'Regional Hospital',
    status: 'processed',
    priority: 'normal',
    summary: 'Normal chest X-ray, no acute findings',
    confidence: 0.98
  },
  {
    id: 3,
    title: 'Prescription - Metformin 500mg',
    type: 'Prescriptions',
    date: '2024-05-20',
    provider: 'Dr. Sarah Johnson',
    facility: 'Primary Care Clinic',
    status: 'needs_review',
    priority: 'normal',
    summary: 'New prescription for diabetes management',
    confidence: 0.87
  },
  {
    id: 4,
    title: 'Annual Physical Exam Notes',
    type: 'Clinical Notes',
    date: '2024-05-15',
    provider: 'Dr. Sarah Johnson',
    facility: 'Primary Care Clinic',
    status: 'processed',
    priority: 'normal',
    summary: 'Routine annual exam, overall health good',
    confidence: 0.92
  },
  {
    id: 5,
    title: 'Insurance EOB - Lab Services',
    type: 'Bills/Insurance',
    date: '2024-05-10',
    provider: 'BlueCross BlueShield',
    facility: 'City Medical Lab',
    status: 'processed',
    priority: 'low',
    summary: 'Payment processed for lab services',
    confidence: 0.99
  }
];

const getTypeColor = (type: string) => {
  const colors = {
    'Lab Results': 'bg-green-100 text-green-800',
    'Imaging': 'bg-purple-100 text-purple-800',
    'Prescriptions': 'bg-orange-100 text-orange-800',
    'Clinical Notes': 'bg-blue-100 text-blue-800',
    'Bills/Insurance': 'bg-gray-100 text-gray-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getPriorityIcon = (priority: string, status: string) => {
  if (status === 'needs_review') {
    return <AlertCircle className="w-4 h-4 text-amber-500" />;
  }
  return <CheckCircle className="w-4 h-4 text-green-500" />;
};

interface Filters {
  type: string[];
  status: string[];
  priority: string[];
  provider: string[];
  dateRange: string;
}

interface DocumentListProps {
  selectedDocument: any;
  onSelectDocument: (doc: any) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ 
  selectedDocument, 
  onSelectDocument 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<Filters>({
    type: [],
    status: [],
    priority: [],
    provider: [],
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const types = [...new Set(mockDocuments.map(doc => doc.type))];
    const statuses = [...new Set(mockDocuments.map(doc => doc.status))];
    const priorities = [...new Set(mockDocuments.map(doc => doc.priority))];
    const providers = [...new Set(mockDocuments.map(doc => doc.provider))];
    
    return { types, statuses, priorities, providers };
  }, []);

  // Filter and sort documents
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = mockDocuments.filter(doc => {
      // Text search
      const searchMatch = !searchTerm || 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.facility.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const typeMatch = filters.type.length === 0 || filters.type.includes(doc.type);
      
      // Status filter
      const statusMatch = filters.status.length === 0 || filters.status.includes(doc.status);
      
      // Priority filter
      const priorityMatch = filters.priority.length === 0 || filters.priority.includes(doc.priority);
      
      // Provider filter
      const providerMatch = filters.provider.length === 0 || filters.provider.includes(doc.provider);
      
      // Date range filter
      const dateMatch = filters.dateRange === 'all' || (() => {
        const docDate = new Date(doc.date);
        const now = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            return docDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return docDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return docDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return docDate >= yearAgo;
          default:
            return true;
        }
      })();

      return searchMatch && typeMatch && statusMatch && priorityMatch && providerMatch && dateMatch;
    });

    // Sort documents
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'provider':
          comparison = a.provider.localeCompare(b.provider);
          break;
        case 'confidence':
          comparison = a.confidence - b.confidence;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, filters]);

  const toggleFilter = (filterType: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      type: [],
      status: [],
      priority: [],
      provider: [],
      dateRange: 'all'
    });
    setSearchTerm('');
  };

  const activeFilterCount = Object.values(filters).reduce((count, filterArray) => {
    if (Array.isArray(filterArray)) {
      return count + filterArray.length;
    }
    return count + (filterArray !== 'all' ? 1 : 0);
  }, 0) + (searchTerm ? 1 : 0);

  return (
    <div className="flex flex-col h-full">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents, providers, summaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchTerm('')}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SortAsc className="w-4 h-4 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
              <SelectItem value="confidence">Confidence</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="w-4 h-4" />
                {activeFilterCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Document Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Document Type</label>
                  <div className="flex flex-wrap gap-1">
                    {filterOptions.types.map(type => (
                      <Button
                        key={type}
                        variant={filters.type.includes(type) ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => toggleFilter('type', type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="flex flex-wrap gap-1">
                    {filterOptions.statuses.map(status => (
                      <Button
                        key={status}
                        variant={filters.status.includes(status) ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => toggleFilter('status', status)}
                      >
                        {status.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{filteredAndSortedDocuments.length} documents</span>
          <span>Sorted by {sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})</span>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {searchTerm && (
              <Badge variant="secondary" className="text-xs">
                Search: "{searchTerm}"
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}
            {filters.type.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                Type: {type}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => toggleFilter('type', type)}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            ))}
            {filters.status.map(status => (
              <Badge key={status} variant="secondary" className="text-xs">
                Status: {status.replace('_', ' ')}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => toggleFilter('status', status)}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            ))}
            {filters.dateRange !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Date: {filters.dateRange}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setFilters(prev => ({ ...prev, dateRange: 'all' }))}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Document List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredAndSortedDocuments.map((document) => (
            <div
              key={document.id}
              onClick={() => onSelectDocument(document)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedDocument?.id === document.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(document.priority, document.status)}
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {document.title}
                  </h3>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Badge variant="secondary" className={`text-xs ${getTypeColor(document.type)}`}>
                  {document.type}
                </Badge>
                
                <div className="flex items-center text-xs text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(document.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {document.provider}
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-600">
                  <Building className="w-3 h-3 mr-1" />
                  {document.facility}
                </div>
                
                <p className="text-xs text-gray-700 leading-relaxed">
                  {document.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Confidence: {Math.round(document.confidence * 100)}%</span>
                  </div>
                  {document.status === 'needs_review' && (
                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                      Needs Review
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredAndSortedDocuments.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium mb-2">No documents found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
