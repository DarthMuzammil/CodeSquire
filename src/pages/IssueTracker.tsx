
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IssueBoard from '@/components/IssueBoard';
import PerformanceDashboard from '@/components/PerformanceDashboard';
import AIAssistant from '@/components/AIAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileCode } from 'lucide-react';

const IssueTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || 'board');
  
  // Update URL when tab changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('tab', activeTab);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Management</h1>
          <div className="flex gap-2">
            <AIAssistant />
            <Button variant="outline" onClick={() => navigate('/review')} className="gap-2">
              <FileCode size={16} />
              Code Review
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Plan your next sprint, assign tasks, and set goals for your team. The AI assistant can help with planning and recommendations.
              </p>
              <div className="flex justify-center p-8">
                <Button variant="outline" size="lg" onClick={() => {
                  const aiButton = document.querySelector('[aria-label="AI Assistant"]') as HTMLButtonElement;
                  if (aiButton) aiButton.click();
                }}>
                  Start Planning with AI
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default IssueTracker;
