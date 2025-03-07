
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeInput from '@/components/CodeInput';
import CodeViewer from '@/components/CodeViewer';
import IssueSidebar from '@/components/IssueSidebar';
import { CodeIssue } from '@/utils/codeExamples';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

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
          <CodeInput onSubmit={handleCodeSubmit} />
        ) : (
          <div className="flex-1 p-4">
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
