
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
      <div className="flex items-center justify-center h-full bg-gray-50 p-4">
        <div className="text-center">
          <FileText className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">Select a document</h3>
          <p className="text-sm lg:text-base text-gray-600">Choose a document from the list to view its details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <DocumentHeader document={document} />

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <TabsList className="mx-3 lg:mx-6 mt-4 grid w-full grid-cols-5 text-xs lg:text-sm">
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Preview</span>
              <span className="sm:hidden">Prev</span>
            </TabsTrigger>
            <TabsTrigger value="extracted" className="flex items-center">
              <FileText className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Extracted</span>
              <span className="sm:hidden">Text</span>
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex items-center">
              <Edit className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Metadata</span>
              <span className="sm:hidden">Meta</span>
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center">
              <Link className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Related</span>
              <span className="sm:hidden">Rel</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">Hist</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden px-3 lg:px-6 pb-3 lg:pb-6">
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
