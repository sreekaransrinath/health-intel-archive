
import React, { useState } from 'react';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';

export const DocumentBrowser = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-1/3 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
        <DocumentList 
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />
      </div>
      <div className="flex-1 h-1/2 lg:h-full">
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
};
