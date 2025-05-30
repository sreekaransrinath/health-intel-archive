
import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Edit, 
  Link, 
  History,
  Download,
  Share,
  Flag,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentViewerProps {
  document: any;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  if (!document) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a document</h3>
          <p className="text-gray-600">Choose a document from the list to view its details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Document Header */}
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

      {/* Document Content Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 grid w-full grid-cols-5">
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="extracted">
              <FileText className="w-4 h-4 mr-2" />
              Extracted Text
            </TabsTrigger>
            <TabsTrigger value="metadata">
              <Edit className="w-4 h-4 mr-2" />
              Metadata
            </TabsTrigger>
            <TabsTrigger value="related">
              <Link className="w-4 h-4 mr-2" />
              Related
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden px-6 pb-6">
            <TabsContent value="preview" className="h-full mt-4">
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
            </TabsContent>
            
            <TabsContent value="extracted" className="h-full mt-4">
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
                          {/* Mock extracted text */}
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
            </TabsContent>
            
            <TabsContent value="metadata" className="h-full mt-4">
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
            </TabsContent>
            
            <TabsContent value="related" className="h-full mt-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Related Documents</CardTitle>
                </CardHeader>
                <CardContent className="h-full overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="space-y-3">
                      {/* Mock related documents */}
                      <RelatedDocument 
                        title="Lab Order - Metabolic Panel"
                        date="2024-05-27"
                        type="Lab Orders"
                        relationship="Precedes this result"
                      />
                      <RelatedDocument 
                        title="Follow-up Appointment Note"
                        date="2024-05-30"
                        type="Clinical Notes"
                        relationship="Follow-up to this result"
                      />
                      <RelatedDocument 
                        title="Previous Blood Test Results"
                        date="2024-02-15"
                        type="Lab Results"
                        relationship="Historical comparison"
                      />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="h-full mt-4">
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const MetadataSection = ({ title, data }) => (
  <div>
    <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">{key}</span>
          <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const RelatedDocument = ({ title, date, type, relationship }) => (
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

const HistoryItem = ({ action, timestamp, details }) => (
  <div className="flex items-start space-x-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
    <div>
      <h5 className="font-medium text-gray-900 text-sm">{action}</h5>
      <p className="text-xs text-gray-500">{timestamp}</p>
      <p className="text-xs text-gray-600 mt-1">{details}</p>
    </div>
  </div>
);

// Helper function to get type colors (reused from DocumentList)
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
