
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitBranch, Upload, Code, Link, ArrowRight } from 'lucide-react';
import { codeExamples } from '@/utils/codeExamples';
import { useToast } from '@/hooks/use-toast';

interface CodeInputProps {
  onSubmit: (code: string, issues: any[]) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('url');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (activeTab === 'url' && !url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, we'll use the first example
    const example = codeExamples[0];
    toast({
      title: "Code loaded",
      description: "Analyzing code for issues...",
    });
    
    onSubmit(example.code, example.issues);
  };

  const handleExampleSelect = (exampleId: string) => {
    const example = codeExamples.find(ex => ex.id === exampleId);
    if (example) {
      onSubmit(example.code, example.issues);
      toast({
        title: `${example.name} loaded`,
        description: "Analyzing code for issues...",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Code Review Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Get instant feedback on your code quality, identify potential issues, and receive suggestions for improvement.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-subtle border border-gray-200 dark:border-gray-800 transition-all duration-200">
        <Tabs defaultValue="url" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="url" className="flex items-center justify-center">
              <Link size={16} className="mr-2" />
              <span>PR URL</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center justify-center">
              <Upload size={16} className="mr-2" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center justify-center">
              <Code size={16} className="mr-2" />
              <span>Examples</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pr-url" className="text-sm font-medium">
                  GitHub Pull Request URL
                </label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <GitBranch size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="pr-url"
                      type="url"
                      placeholder="https://github.com/username/repo/pull/123"
                      className="pl-10"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700">
                    Review
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the URL of a GitHub Pull Request to analyze its code
                </p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center justify-center">
                <Upload 
                  size={36} 
                  className="text-gray-400 mb-4"
                />
                <h3 className="text-lg font-medium mb-2">Upload your code files</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <Button 
                  variant="outline" 
                  className="relative bg-white dark:bg-gray-900"
                  onClick={() => {
                    toast({
                      title: "Upload feature",
                      description: "This is a demo. Using example code instead.",
                    });
                    handleExampleSelect('example1');
                  }}
                >
                  Choose Files
                  <input type="file" className="absolute inset-0 opacity-0" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Select an example to review:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {codeExamples.map(example => (
                  <div 
                    key={example.id}
                    className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => handleExampleSelect(example.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{example.name}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                        {example.language}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {example.issues.length} issues found
                    </p>
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 dark:text-blue-400 p-0 h-auto hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <span className="mr-1">View</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeInput;
