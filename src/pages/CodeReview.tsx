
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeViewer from '@/components/CodeViewer';
import IssueSidebar from '@/components/IssueSidebar';
import AIAssistant from '@/components/AIAssistant';
import { CodeIssue, createIssueTicket } from '@/utils/codeExamples';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, TicketCheck, Workflow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CodeReview = () => {
  const [code, setCode] = useState('');
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isCreateTicketDialogOpen, setIsCreateTicketDialogOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get the code and issues from localStorage or a mock example
  useEffect(() => {
    // In a real application, this would come from the API
    const storedCode = localStorage.getItem('reviewCode');
    const storedIssues = localStorage.getItem('reviewIssues');
    
    if (storedCode && storedIssues) {
      setCode(storedCode);
      setIssues(JSON.parse(storedIssues));
    } else {
      // Use the first example as fallback
      import('@/utils/codeExamples').then(({ codeExamples }) => {
        const example = codeExamples[0];
        setCode(example.code);
        setIssues(example.issues);
        
        if (example.issues.length > 0) {
          setSelectedIssueId(example.issues[0].id);
        }
      });
    }
  }, []);

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssueId(issueId);
  };
  
  const handleCreateTicket = () => {
    if (!selectedIssueId || !selectedAssignee) {
      toast({
        title: "Error",
        description: "Please select an assignee",
        variant: "destructive",
      });
      return;
    }
    
    const issue = issues.find(i => i.id === selectedIssueId);
    if (!issue) return;
    
    const ticketId = createIssueTicket(issue, selectedAssignee);
    
    // Update the issue with the ticket ID
    setIssues(issues.map(i => 
      i.id === selectedIssueId ? { ...i, ticketId } : i
    ));
    
    setIsCreateTicketDialogOpen(false);
    
    toast({
      title: "Ticket Created",
      description: `Ticket ${ticketId} has been created and linked to the issue`,
    });
  };
  
  const handleViewTicket = (ticketId: string) => {
    // Store the current state so we can return to it
    localStorage.setItem('reviewCode', code);
    localStorage.setItem('reviewIssues', JSON.stringify(issues));
    
    // Navigate to the issue tracker
    navigate('/issues');
    
    toast({
      title: "Navigating",
      description: "Taking you to the issue tracker",
    });
  };

  const selectedIssue = selectedIssueId ? issues.find(i => i.id === selectedIssueId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 p-4">
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
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center bg-muted/50">
                <h2 className="text-sm font-medium">Issue Details</h2>
                {selectedIssue && (
                  selectedIssue.ticketId ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTicket(selectedIssue.ticketId!)}
                      className="gap-1 text-xs"
                    >
                      <TicketCheck size={14} />
                      View Ticket {selectedIssue.ticketId}
                    </Button>
                  ) : (
                    <Dialog open={isCreateTicketDialogOpen} onOpenChange={setIsCreateTicketDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                          <Workflow size={14} />
                          Create Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Ticket from Issue</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Issue</h3>
                            <div className="rounded-md bg-muted p-3">
                              <p className="font-medium">{selectedIssue.message}</p>
                              {selectedIssue.suggestion && (
                                <p className="text-sm mt-2 text-muted-foreground">{selectedIssue.suggestion}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Title</h3>
                            <Input defaultValue={`Fix: ${selectedIssue.message}`} />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Assignee</h3>
                            <Select
                              value={selectedAssignee}
                              onValueChange={setSelectedAssignee}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select assignee" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Alex Chen">Alex Chen</SelectItem>
                                <SelectItem value="Maya Johnson">Maya Johnson</SelectItem>
                                <SelectItem value="Taylor Smith">Taylor Smith</SelectItem>
                                <SelectItem value="Jamie Park">Jamie Park</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Priority</h3>
                            <Select defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsCreateTicketDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleCreateTicket}>
                            Create Ticket
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )
                )}
              </div>
              
              <div className="flex-1 overflow-auto">
                <IssueSidebar 
                  issues={issues}
                  selectedIssueId={selectedIssueId}
                  onIssueSelect={handleIssueSelect}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      
      <Footer />
    </div>
  );
};

export default CodeReview;
