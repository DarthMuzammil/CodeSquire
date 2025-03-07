
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IssueBoard from '@/components/IssueBoard';
import PerformanceDashboard from '@/components/PerformanceDashboard';
import AIAssistant from '@/components/AIAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IssueTracker = () => {
  const [activeTab, setActiveTab] = useState('board');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Management</h1>
          <AIAssistant />
        </div>
        
        <Tabs defaultValue="board" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="board">Issue Board</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="planning">Sprint Planning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="board" className="mt-0">
            <IssueBoard />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <PerformanceDashboard />
          </TabsContent>
          
          <TabsContent value="planning" className="mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Sprint Planning</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Sprint planning tools coming soon. The AI assistant can help with planning in the meantime.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default IssueTracker;
