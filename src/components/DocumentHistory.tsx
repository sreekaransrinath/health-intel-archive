
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryItemProps {
  action: string;
  timestamp: string;
  details: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ action, timestamp, details }) => (
  <div className="flex items-start space-x-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
    <div>
      <h5 className="font-medium text-gray-900 text-sm">{action}</h5>
      <p className="text-xs text-gray-500">{timestamp}</p>
      <p className="text-xs text-gray-600 mt-1">{details}</p>
    </div>
  </div>
);

export const DocumentHistory: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Processing History</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <HistoryItem 
              action="Document uploaded"
              timestamp="2024-05-29 09:15:00"
              details="Original PDF uploaded via drag-and-drop"
            />
            <HistoryItem 
              action="OCR processing completed"
              timestamp="2024-05-29 09:15:30"
              details="Text extraction completed with 95% confidence"
            />
            <HistoryItem 
              action="Auto-categorized as Lab Results"
              timestamp="2024-05-29 09:15:45"
              details="LLM classification with high confidence"
            />
            <HistoryItem 
              action="Metadata extracted"
              timestamp="2024-05-29 09:16:00"
              details="Clinical data and identifiers extracted"
            />
            <HistoryItem 
              action="Related documents linked"
              timestamp="2024-05-29 09:16:15"
              details="3 related documents automatically identified"
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
