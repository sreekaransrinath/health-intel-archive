
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
    <div className="border-b border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {document.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{new Date(document.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{document.provider}</span>
            <span>•</span>
            <span>{document.facility}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Badge className={`${getTypeColor(document.type)}`}>
          {document.type}
        </Badge>
        {document.status === 'needs_review' && (
          <Badge variant="outline" className="border-amber-200 text-amber-600">
            Needs Review
          </Badge>
        )}
        <span className="text-sm text-gray-500">
          Processing confidence: {Math.round(document.confidence * 100)}%
        </span>
      </div>
    </div>
  );
};
