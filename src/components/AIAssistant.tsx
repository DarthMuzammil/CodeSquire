
import React, { useState } from 'react';
import { Bot, X, ArrowRight, Calendar, RefreshCcw, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from '@/hooks/use-toast';

const projectStrategies = [
  {
    name: 'Agile/Scrum',
    description: 'Iterative approach with sprints and daily standups',
  },
  {
    name: 'Kanban',
    description: 'Visualize workflow, limit work in progress',
  },
  {
    name: 'Lean',
    description: 'Minimize waste, maximize value',
  },
];

interface AIAssistantProps {}

const AIAssistant: React.FC<AIAssistantProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedStrategy, setSelectedStrategy] = useState('Agile/Scrum');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your AI project assistant. I can help with tasks like scheduling meetings, creating tickets, or suggesting management strategies. How can I help you today?'
    }
  ]);
  const { toast } = useToast();

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setIsThinking(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Add AI response after thinking
      let response = '';
      
      if (inputValue.toLowerCase().includes('meeting') || inputValue.toLowerCase().includes('schedule')) {
        response = "I can help schedule that meeting. Would you like me to find a time slot next week that works for everyone and send out calendar invites?";
      } else if (inputValue.toLowerCase().includes('ticket') || inputValue.toLowerCase().includes('issue')) {
        response = "I can create a ticket for that. Let me gather some information first. What priority would you assign to this issue, and who should be responsible for it?";
      } else if (inputValue.toLowerCase().includes('sprint') || inputValue.toLowerCase().includes('planning')) {
        response = "For sprint planning, I recommend reviewing the backlog first to identify high-priority items. Based on your team's velocity of 45 points, you should be able to commit to approximately 40-50 points for the next sprint.";
      } else {
        response = "I understand. How would you like me to help with that? I can assist with scheduling, creating tickets, or providing project management advice.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsThinking(false);
      setInputValue('');
    }, 1500);
  };
  
  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: "Daily standup meeting scheduled for tomorrow at 10:00 AM",
    });
    setIsOpen(false);
  };
  
  const handleCreateTicket = () => {
    toast({
      title: "Ticket Created",
      description: "New bug ticket has been created and assigned to the team",
    });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Bot size={18} />
          <span>AI Assistant</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="end">
        <div className="bg-primary/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-primary" />
            <span className="font-medium">Project Assistant</span>
          </div>
          <ToggleGroup type="single" value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
            <ToggleGroupItem value="chat" size="sm">Chat</ToggleGroupItem>
            <ToggleGroupItem value="actions" size="sm">Actions</ToggleGroupItem>
            <ToggleGroupItem value="pm" size="sm">PM</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {activeTab === 'chat' && (
          <>
            <div className="h-[260px] overflow-y-auto p-3 space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-2 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your message..." 
                  className="min-h-[60px] resize-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button className="self-end" onClick={handleSend}>
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'actions' && (
          <div className="p-3 space-y-4">
            <p className="text-sm text-muted-foreground">What would you like me to do?</p>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleMeeting}>
                <Calendar size={16} className="mr-2" />
                Schedule Daily Standup
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={handleCreateTicket}>
                <RefreshCcw size={16} className="mr-2" />
                Create Sprint Planning Ticket
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                toast({
                  title: "Reminder Set",
                  description: "Team members will be reminded of due tasks",
                });
                setIsOpen(false);
              }}>
                <Calendar size={16} className="mr-2" />
                Send Task Reminders
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm">Custom command</Label>
              <div className="flex gap-2 mt-2">
                <Textarea 
                  placeholder="Enter a custom command..." 
                  className="min-h-[60px] resize-none text-sm"
                />
                <Button className="self-end" size="sm">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'pm' && (
          <div className="p-3 space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Brain size={16} className="mr-2" />
                Project Management Strategy
              </h4>
              <RadioGroup value={selectedStrategy} onValueChange={setSelectedStrategy}>
                {projectStrategies.map((strategy) => (
                  <div key={strategy.name} className="flex items-start space-x-2 py-2">
                    <RadioGroupItem value={strategy.name} id={strategy.name} />
                    <div className="grid gap-1.5">
                      <Label htmlFor={strategy.name} className="font-medium">
                        {strategy.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              
              <Button className="w-full mt-2" onClick={() => {
                toast({
                  title: "Strategy Applied",
                  description: `Project is now using ${selectedStrategy} methodology`,
                });
                setIsOpen(false);
              }}>
                Apply Strategy
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Automated Schedules</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-sm">Daily Standup</span>
                  <Badge>10:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-sm">Sprint Planning</span>
                  <Badge>Monday 2:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-sm">Retrospective</span>
                  <Badge>Friday 4:00 PM</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AIAssistant;
