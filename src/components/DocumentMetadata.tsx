
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentMetadataProps {
  document: any;
}

interface MetadataSectionProps {
  title: string;
  data: Record<string, string>;
}

const MetadataSection: React.FC<MetadataSectionProps> = ({ title, data }) => (
  <div>
    <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">{key}</span>
          <span className="text-sm font-medium text-gray-900">{String(value)}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DocumentMetadata: React.FC<DocumentMetadataProps> = ({ document }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Document Metadata</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            <MetadataSection 
              title="Basic Information" 
              data={{
                'Document Type': document.type,
                'Date of Service': document.date,
                'Provider': document.provider,
                'Facility': document.facility,
                'Processing Date': new Date().toLocaleDateString()
              }}
            />
            
            <MetadataSection 
              title="Clinical Data" 
              data={{
                'Primary Diagnosis': 'Hyperglycemia',
                'ICD-10 Code': 'R73.9',
                'Test Type': 'Complete Metabolic Panel',
                'Critical Values': 'Glucose: 125 mg/dL (HIGH)',
                'Recommendations': 'Follow-up with PCP'
              }}
            />
            
            <MetadataSection 
              title="Processing Information" 
              data={{
                'OCR Confidence': `${Math.round(document.confidence * 100)}%`,
                'Status': document.status,
                'Auto-Categorized': 'Yes',
                'Requires Review': document.status === 'needs_review' ? 'Yes' : 'No'
              }}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
