
import React from 'react';
import { DocumentBrowser } from '../components/DocumentBrowser';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-hidden">
          <DocumentBrowser />
        </main>
      </div>
    </div>
  );
};

export default Index;
