
import React, { useState } from 'react';
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
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <SortAsc className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{filteredDocuments.length} documents</span>
          <span>Sorted by date</span>
        </div>
      </div>

      {/* Document List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredDocuments.map((document) => (
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
        </div>
      </ScrollArea>
    </div>
  );
};
