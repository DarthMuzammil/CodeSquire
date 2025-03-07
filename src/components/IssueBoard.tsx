
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusCircle, MoreHorizontal, Clock, AlertCircle, FileCode, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import IssueForm from './IssueForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Sample data - In a real app, this would come from a backend
const initialColumns = {
  backlog: {
    id: 'backlog',
    title: 'Backlog',
    issueIds: ['issue-1', 'issue-2', 'issue-3'],
  },
  todo: {
    id: 'todo',
    title: 'To Do',
    issueIds: ['issue-4', 'issue-5'],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    issueIds: ['issue-6', 'issue-7'],
  },
  review: {
    id: 'review',
    title: 'Review',
    issueIds: ['issue-8'],
  },
  done: {
    id: 'done',
    title: 'Done',
    issueIds: ['issue-9', 'issue-10'],
  },
};

const initialIssues = {
  'issue-1': {
    id: 'issue-1',
    title: 'Refactor authentication module',
    description: 'Improve code quality and test coverage',
    priority: 'medium',
    assignee: 'Alex Chen',
    dueDate: '2023-10-25',
    type: 'task',
    codeReviewId: null,
  },
  'issue-2': {
    id: 'issue-2',
    title: 'Fix CSS layout on mobile',
    description: 'Menu overlaps content on small screens',
    priority: 'high',
    assignee: 'Maya Johnson',
    dueDate: '2023-10-20',
    type: 'bug',
    codeReviewId: 'issue1',
  },
  'issue-3': {
    id: 'issue-3',
    title: 'Update dependencies',
    description: 'Upgrade to latest versions of React and TypeScript',
    priority: 'low',
    assignee: 'Unassigned',
    dueDate: null,
    type: 'maintenance',
    codeReviewId: null,
  },
  'issue-4': {
    id: 'issue-4',
    title: 'Add dark mode toggle',
    description: 'Implement theme switching with system preference detection',
    priority: 'medium',
    assignee: 'Taylor Smith',
    dueDate: '2023-10-22',
    type: 'feature',
    codeReviewId: null,
  },
  'issue-5': {
    id: 'issue-5',
    title: 'Optimize image loading',
    description: 'Implement lazy loading for better performance',
    priority: 'medium',
    assignee: 'Jamie Park',
    dueDate: '2023-10-28',
    type: 'task',
    codeReviewId: null,
  },
  'issue-6': {
    id: 'issue-6',
    title: 'Implement SSO login',
    description: 'Add support for Google and GitHub login',
    priority: 'high',
    assignee: 'Alex Chen',
    dueDate: '2023-10-18',
    type: 'feature',
    codeReviewId: null,
  },
  'issue-7': {
    id: 'issue-7',
    title: 'Refine search algorithm',
    description: 'Improve relevance ranking in search results',
    priority: 'medium',
    assignee: 'Maya Johnson',
    dueDate: '2023-10-23',
    type: 'improvement',
    codeReviewId: null,
  },
  'issue-8': {
    id: 'issue-8',
    title: 'Fix account settings bug',
    description: 'Profile changes not saving correctly',
    priority: 'high',
    assignee: 'Taylor Smith',
    dueDate: '2023-10-15',
    type: 'bug',
    codeReviewId: 'issue4',
  },
  'issue-9': {
    id: 'issue-9',
    title: 'Add API documentation',
    description: 'Create comprehensive API reference for developers',
    priority: 'medium',
    assignee: 'Jamie Park',
    dueDate: '2023-10-10',
    type: 'documentation',
    codeReviewId: null,
  },
  'issue-10': {
    id: 'issue-10',
    title: 'Update privacy policy',
    description: 'Review and update for compliance with new regulations',
    priority: 'high',
    assignee: 'Legal Team',
    dueDate: '2023-10-08',
    type: 'task',
    codeReviewId: null,
  },
};

// Check for existing tickets from code review
const checkForCodeReviewTickets = () => {
  try {
    const storedIssues = localStorage.getItem('reviewIssues');
    if (storedIssues) {
      const parsedIssues = JSON.parse(storedIssues);
      const ticketIssues = parsedIssues.filter((issue: any) => issue.ticketId);
      
      return ticketIssues.map((issue: any) => ({
        id: `cr-${issue.id}`,
        title: `Fix: ${issue.message}`,
        description: issue.suggestion || issue.message,
        priority: issue.type === 'error' ? 'high' : issue.type === 'warning' ? 'medium' : 'low',
        assignee: 'Unassigned',
        dueDate: null,
        type: issue.type === 'error' ? 'bug' : 'task',
        codeReviewId: issue.id,
      }));
    }
    return [];
  } catch (e) {
    console.error('Error checking for code review tickets:', e);
    return [];
  }
};

const IssueBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [issues, setIssues] = useState(initialIssues);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for tickets from code review on mount
  useEffect(() => {
    const codeReviewTickets = checkForCodeReviewTickets();
    if (codeReviewTickets.length > 0) {
      const newIssues = { ...issues };
      const newColumns = { ...columns };
      
      codeReviewTickets.forEach(ticket => {
        // Only add if we don't already have this ticket
        if (!Object.values(issues).some(issue => issue.codeReviewId === ticket.codeReviewId)) {
          newIssues[ticket.id] = ticket;
          newColumns.todo.issueIds = [ticket.id, ...newColumns.todo.issueIds];
        }
      });
      
      setIssues(newIssues);
      setColumns(newColumns);
      
      toast({
        title: "Code review tickets imported",
        description: `${codeReviewTickets.length} tickets were imported from your code review`,
      });
    }
  }, []);
  
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const sourceColumn = columns[source.droppableId as keyof typeof columns];
    const destColumn = columns[destination.droppableId as keyof typeof columns];
    
    if (sourceColumn === destColumn) {
      const newIssueIds = Array.from(sourceColumn.issueIds);
      newIssueIds.splice(source.index, 1);
      newIssueIds.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...sourceColumn,
        issueIds: newIssueIds,
      };
      
      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      
      return;
    }
    
    // Moving from one column to another
    const sourceIssueIds = Array.from(sourceColumn.issueIds);
    sourceIssueIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      issueIds: sourceIssueIds,
    };
    
    const destIssueIds = Array.from(destColumn.issueIds);
    destIssueIds.splice(destination.index, 0, draggableId);
    const newDestColumn = {
      ...destColumn,
      issueIds: destIssueIds,
    };
    
    setColumns({
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestColumn.id]: newDestColumn,
    });
    
    toast({
      title: "Issue moved",
      description: `Issue moved to ${destColumn.title}`,
    });
  };
  
  const handleCreateIssue = (newIssue: any) => {
    const issueId = `issue-${Date.now()}`;
    
    setIssues({
      ...issues,
      [issueId]: {
        id: issueId,
        ...newIssue,
        codeReviewId: null,
      },
    });
    
    setColumns({
      ...columns,
      backlog: {
        ...columns.backlog,
        issueIds: [...columns.backlog.issueIds, issueId],
      },
    });
    
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Issue created",
      description: "New issue has been added to the backlog",
    });
  };
  
  const handleViewCodeReview = (codeReviewId: string) => {
    navigate('/review');
    
    setTimeout(() => {
      // This would be handled better in a real app with proper state management
      const event = new CustomEvent('selectIssue', { detail: { issueId: codeReviewId } });
      window.dispatchEvent(event);
    }, 100);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <AlertCircle size={14} className="text-red-500" />;
      case 'feature': return <PlusCircle size={14} className="text-purple-500" />;
      default: return <Clock size={14} className="text-blue-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-13rem)]">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Issue Board</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle size={16} className="mr-2" />
              New Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Issue</DialogTitle>
            </DialogHeader>
            <IssueForm onSubmit={handleCreateIssue} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 h-full">
          {Object.values(columns).map(column => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-t-lg">
                <h3 className="font-medium">{column.title} ({column.issueIds.length})</h3>
              </div>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 p-2 rounded-b-lg overflow-y-auto"
                  >
                    {column.issueIds.map((issueId, index) => {
                      const issue = issues[issueId as keyof typeof issues];
                      if (!issue) return null;
                      return (
                        <Draggable key={issue.id} draggableId={issue.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <CardHeader className="p-3 pb-0">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-1">
                                    {getTypeIcon(issue.type)}
                                    <Badge variant="outline" className="capitalize">{issue.type}</Badge>
                                    {issue.codeReviewId && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              className="h-6 w-6 ml-1"
                                              onClick={() => handleViewCodeReview(issue.codeReviewId!)}
                                            >
                                              <FileCode size={12} className="text-blue-500" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>View in Code Review</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreHorizontal size={14} />
                                  </Button>
                                </div>
                                <CardTitle className="text-sm font-medium mt-1">{issue.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="flex justify-between items-center mt-2 text-xs">
                                  <span className="text-gray-600 dark:text-gray-400">{issue.assignee}</span>
                                  <Badge className={getPriorityColor(issue.priority)}>
                                    {issue.priority}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default IssueBoard;
