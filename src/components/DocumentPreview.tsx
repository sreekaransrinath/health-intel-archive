
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const DocumentPreview: React.FC = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Document preview would be displayed here</p>
          <p className="text-sm text-gray-500 mt-2">
            PDF viewer or image display component
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
