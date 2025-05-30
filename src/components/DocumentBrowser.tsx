
import React, { useState } from 'react';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';

export const DocumentBrowser = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        <DocumentList 
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />
      </div>
      <div className="flex-1">
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
};
