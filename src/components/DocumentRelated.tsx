
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface RelatedDocumentProps {
  title: string;
  date: string;
  type: string;
  relationship: string;
}

const RelatedDocumentItem: React.FC<RelatedDocumentProps> = ({ title, date, type, relationship }) => (
  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
    <div>
      <h5 className="font-medium text-gray-900 text-sm">{title}</h5>
      <div className="flex items-center space-x-2 mt-1">
        <Badge variant="secondary" className="text-xs">{type}</Badge>
        <span className="text-xs text-gray-600">{date}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{relationship}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-gray-400" />
  </div>
);

export const DocumentRelated: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Related Documents</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            <RelatedDocumentItem 
              title="Lab Order - Metabolic Panel"
              date="2024-05-27"
              type="Lab Orders"
              relationship="Precedes this result"
            />
            <RelatedDocumentItem 
              title="Follow-up Appointment Note"
              date="2024-05-30"
              type="Clinical Notes"
              relationship="Follow-up to this result"
            />
            <RelatedDocumentItem 
              title="Previous Blood Test Results"
              date="2024-02-15"
              type="Lab Results"
              relationship="Historical comparison"
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
