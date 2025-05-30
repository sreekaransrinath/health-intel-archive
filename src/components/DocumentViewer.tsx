
import React from 'react';
import { FileText, Eye, Edit, Link, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentHeader } from './DocumentHeader';
import { DocumentPreview } from './DocumentPreview';
import { DocumentExtracted } from './DocumentExtracted';
import { DocumentMetadata } from './DocumentMetadata';
import { DocumentRelated } from './DocumentRelated';
import { DocumentHistory } from './DocumentHistory';

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
      <DocumentHeader document={document} />

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
              <DocumentPreview />
            </TabsContent>
            
            <TabsContent value="extracted" className="h-full mt-4">
              <DocumentExtracted document={document} />
            </TabsContent>
            
            <TabsContent value="metadata" className="h-full mt-4">
              <DocumentMetadata document={document} />
            </TabsContent>
            
            <TabsContent value="related" className="h-full mt-4">
              <DocumentRelated />
            </TabsContent>
            
            <TabsContent value="history" className="h-full mt-4">
              <DocumentHistory />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
