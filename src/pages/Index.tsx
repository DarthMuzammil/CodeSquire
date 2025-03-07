
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeInput from '@/components/CodeInput';
import CodeViewer from '@/components/CodeViewer';
import IssueSidebar from '@/components/IssueSidebar';
import AIAssistant from '@/components/AIAssistant';
import { CodeIssue } from '@/utils/codeExamples';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [code, setCode] = useState('');
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [reviewStarted, setReviewStarted] = useState(false);

  const handleCodeSubmit = (newCode: string, newIssues: CodeIssue[]) => {
    setCode(newCode);
    setIssues(newIssues);
    setReviewStarted(true);
    if (newIssues.length > 0) {
      setSelectedIssueId(newIssues[0].id);
    }
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssueId(issueId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {!reviewStarted ? (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Code Review Assistant</h1>
              <div className="flex gap-4">
                <AIAssistant />
                <Link to="/issues">
                  <Button variant="outline">
                    Issue Tracker
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <CodeInput onSubmit={handleCodeSubmit} />
          </div>
        ) : (
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Code Review</h1>
              <div className="flex gap-2">
                <AIAssistant />
                <Link to="/issues">
                  <Button variant="outline" size="sm">
                    Issue Tracker
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-9rem)] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <ResizablePanel defaultSize={70} minSize={30} className="transition-all duration-200">
                <CodeViewer 
                  code={code} 
                  issues={issues} 
                  selectedIssueId={selectedIssueId}
                  onIssueSelect={handleIssueSelect}
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={30} minSize={15} className="transition-all duration-200">
                <IssueSidebar 
                  issues={issues}
                  selectedIssueId={selectedIssueId}
                  onIssueSelect={handleIssueSelect}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
