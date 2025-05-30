
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Activity, 
  AlertTriangle, 
  BarChart3,
  FolderOpen,
  Filter,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const sidebarItems = [
  { icon: FileText, label: 'All Documents', count: 1247, active: true },
  { icon: Calendar, label: 'Timeline View', count: null },
  { icon: Activity, label: 'Dashboard', count: null },
  { icon: AlertTriangle, label: 'Needs Review', count: 23, variant: 'destructive' },
  { icon: BarChart3, label: 'Analytics', count: null },
];

const documentTypes = [
  { label: 'Lab Results', count: 342, color: 'bg-green-100 text-green-800' },
  { label: 'Clinical Notes', count: 298, color: 'bg-blue-100 text-blue-800' },
  { label: 'Imaging', count: 156, color: 'bg-purple-100 text-purple-800' },
  { label: 'Prescriptions', count: 189, color: 'bg-orange-100 text-orange-800' },
  { label: 'Bills/Insurance', count: 134, color: 'bg-gray-100 text-gray-800' },
  { label: 'Uncategorized', count: 12, color: 'bg-red-100 text-red-800' },
];

export const Sidebar = () => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
              {item.count && (
                <Badge 
                  variant={item.variant as any || "secondary"} 
                  className="ml-auto"
                >
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* Document Categories */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setCategoriesExpanded(!categoriesExpanded)}
            className="w-full justify-start p-2 h-auto"
          >
            {categoriesExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )}
            <FolderOpen className="w-4 h-4 mr-2" />
            <span className="font-medium">Categories</span>
          </Button>
          
          {categoriesExpanded && (
            <div className="ml-6 mt-2 space-y-1">
              {documentTypes.map((type) => (
                <Button
                  key={type.label}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8"
                >
                  <div className={`w-2 h-2 rounded-full mr-3 ${type.color.split(' ')[0]}`} />
                  {type.label}
                  <span className="ml-auto text-xs text-gray-500">
                    {type.count}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="w-full justify-start p-2 h-auto"
          >
            {filtersExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )}
            <Filter className="w-4 h-4 mr-2" />
            <span className="font-medium">Quick Filters</span>
          </Button>
          
          {filtersExpanded && (
            <div className="ml-6 mt-2 space-y-1">
              {['This Week', 'This Month', 'This Year', 'Flagged Items', 'Recent Uploads'].map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8"
                >
                  {filter}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
