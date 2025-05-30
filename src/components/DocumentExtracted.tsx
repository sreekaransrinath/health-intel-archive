
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentExtractedProps {
  document: any;
}

export const DocumentExtracted: React.FC<DocumentExtractedProps> = ({ document }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Extracted Text</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Document Summary</h4>
              <p>{document.summary}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Full Extracted Text</h4>
              <div className="p-4 border border-gray-200 rounded-lg font-mono text-xs leading-relaxed">
                <p>LABORATORY REPORT</p>
                <p>Patient: John Doe</p>
                <p>DOB: 01/15/1980</p>
                <p>Date of Service: {document.date}</p>
                <br />
                <p>COMPLETE METABOLIC PANEL</p>
                <p>Glucose: 125 mg/dL (Reference: 70-99 mg/dL) HIGH</p>
                <p>BUN: 18 mg/dL (Reference: 7-20 mg/dL)</p>
                <p>Creatinine: 1.0 mg/dL (Reference: 0.7-1.3 mg/dL)</p>
                <p>Sodium: 140 mEq/L (Reference: 136-145 mEq/L)</p>
                <p>Potassium: 4.2 mEq/L (Reference: 3.5-5.1 mEq/L)</p>
                <br />
                <p>INTERPRETATION:</p>
                <p>Elevated glucose levels suggest further evaluation for diabetes mellitus.</p>
                <p>Recommend follow-up with primary care physician.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
