
import React, { useState } from 'react';
import { 
  Bot, X, Calendar, TicketCheck, Lightbulb, 
  MessageSquare, ChevronDown, ChevronUp 
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogClose 
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type AssistantMode = 'ticket' | 'schedule' | 'strategy' | 'general';

interface AIResponse {
  id: string;
  text: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [mode, setMode] = useState<AssistantMode>('general');
  const { toast } = useToast();
  
  const assistantModes = {
    general: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about your project...',
      icon: <Bot size={18} />
    },
    ticket: {
      title: 'Ticket Generator',
      placeholder: 'Describe the task or issue you want to create...',
      icon: <TicketCheck size={18} />
    },
    schedule: {
      title: 'Meeting Scheduler',
      placeholder: 'Describe the meeting you want to schedule...',
      icon: <Calendar size={18} />
    },
    strategy: {
      title: 'Strategy Advisor',
      placeholder: 'What kind of project management strategy do you need help with?',
      icon: <Lightbulb size={18} />
    }
  };
  
  const generateResponse = (userPrompt: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      let response = '';
      
      switch (mode) {
        case 'ticket':
          response = `Creating ticket: "${userPrompt.substring(0, 30)}..."\n\nAssigned to: Team Lead\nPriority: Medium\nDue Date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}\n\nWould you like to edit any of these details?`;
          break;
        case 'schedule':
          response = `I've scheduled a meeting for "${userPrompt.substring(0, 30)}..."\n\nDate: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}\nTime: 10:00 AM\nAttendees: Team\nLocation: Main Conference Room\n\nI've sent calendar invites to all team members.`;
          break;
        case 'strategy':
          response = `Based on your requirements, I recommend using an Agile Scrum methodology:\n\n• 2-week sprints\n• Daily standups at 9:30 AM\n• Sprint planning on Mondays\n• Retrospectives on Fridays\n\nThis will help maintain flexibility while ensuring regular delivery of working features.`;
          break;
        default:
          response = `I analyzed your request: "${userPrompt.substring(0, 30)}..."\n\nThis seems like a ${Math.random() > 0.5 ? 'medium' : 'high'} priority task. Would you like me to create a ticket for this, schedule a meeting to discuss it, or suggest a project management strategy?`;
      }
      
      setResponses(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
      setPrompt('');
      
      toast({
        title: "AI Assistant",
        description: "Response generated successfully",
      });
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setResponses(prev => [...prev, {
      id: `user-${Date.now()}`,
      text: prompt,
      timestamp: new Date()
    }]);
    
    generateResponse(prompt);
  };
  
  const handleModeChange = (newMode: AssistantMode) => {
    setMode(newMode);
    setResponses([]);
    toast({
      title: "Mode changed",
      description: `Switched to ${assistantModes[newMode].title} mode`,
    });
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Bot size={16} />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              {assistantModes[mode].icon}
              <DialogTitle>{assistantModes[mode].title}</DialogTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleModeChange('general')}>
                    <Bot size={16} className="mr-2" />
                    General Assistant
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleModeChange('ticket')}>
                    <TicketCheck size={16} className="mr-2" />
                    Ticket Generator
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleModeChange('schedule')}>
                    <Calendar size={16} className="mr-2" />
                    Meeting Scheduler
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleModeChange('strategy')}>
                    <Lightbulb size={16} className="mr-2" />
                    Strategy Advisor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X size={16} />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {responses.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Bot size={40} className="text-gray-400 mb-2" />
                <h3 className="text-lg font-medium">How can I help?</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-xs">
                  I can create tickets, schedule meetings, or recommend project management strategies.
                </p>
              </div>
            ) : (
              responses.map(response => (
                <div 
                  key={response.id} 
                  className={`flex ${response.id.startsWith('user') ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      response.id.startsWith('user') 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-line">{response.text}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {response.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-.3s]" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-.5s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t pt-4 mt-auto">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={assistantModes[mode].placeholder}
                className="min-h-12 resize-none pr-20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-2 bottom-2"
                disabled={!prompt.trim() || isTyping}
              >
                <MessageSquare size={16} className="mr-1" />
                Send
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
