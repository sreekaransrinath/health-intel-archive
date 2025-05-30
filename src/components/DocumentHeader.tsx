
import React from 'react';
import { Download, Share, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DocumentHeaderProps {
  document: any;
}

// Helper function to get type colors
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

export const DocumentHeader: React.FC<DocumentHeaderProps> = ({ document }) => {
  return (
    <div className="border-b border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 space-y-4 lg:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 truncate">
            {document.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 space-y-1 sm:space-y-0">
            <span>{new Date(document.date).toLocaleDateString()}</span>
            <span className="hidden sm:inline">•</span>
            <span className="truncate">{document.provider}</span>
            <span className="hidden sm:inline">•</span>
            <span className="truncate">{document.facility}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="sm:hidden">
            <Share className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
        <Badge className={`${getTypeColor(document.type)} w-fit`}>
          {document.type}
        </Badge>
        {document.status === 'needs_review' && (
          <Badge variant="outline" className="border-amber-200 text-amber-600 w-fit">
            Needs Review
          </Badge>
        )}
        <span className="text-xs lg:text-sm text-gray-500">
          Processing confidence: {Math.round(document.confidence * 100)}%
        </span>
      </div>
    </div>
  );
};
