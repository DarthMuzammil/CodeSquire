
import React, { useRef, useEffect } from 'react';
import { CodeIssue } from '@/utils/codeExamples';
import useCodeHighlight from '@/hooks/useCodeHighlight';
import { Button } from '@/components/ui/button';
import { Copy, Download, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeViewerProps {
  code: string;
  issues: CodeIssue[];
  selectedIssueId: string | null;
  onIssueSelect: (issueId: string) => void;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, issues, selectedIssueId, onIssueSelect }) => {
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const highlightedCode = useCodeHighlight(code, issues);
  const { toast } = useToast();
  
  // Scroll to the selected issue
  useEffect(() => {
    if (selectedIssueId && codeContainerRef.current) {
      const issueElement = codeContainerRef.current.querySelector(`[data-issue-id="${selectedIssueId}"]`);
      if (issueElement) {
        issueElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedIssueId]);

  const handleLineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const lineElement = target.closest('.code-line');
    if (lineElement) {
      const issueId = lineElement.getAttribute('data-issue-id');
      if (issueId) {
        onIssueSelect(issueId);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it anywhere",
      duration: 2000,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-subtle overflow-hidden animate-scale-in">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-medium">Code Review</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8" onClick={handleCopyCode}>
            <Copy size={14} className="mr-1" />
            <span className="text-xs">Copy</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Download size={14} className="mr-1" />
            <span className="text-xs">Download</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Line numbers */}
          <div className="bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs p-2 text-right select-none border-r border-gray-200 dark:border-gray-700 w-12">
            {code.split('\n').map((_, i) => (
              <div key={`line-number-${i + 1}`} className="h-[22px]">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code content */}
          <div 
            ref={codeContainerRef}
            className="flex-1 overflow-auto bg-code text-gray-800 dark:text-gray-200 text-sm font-mono p-2"
            onClick={handleLineClick}
          >
            {highlightedCode}
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
            <span>Errors</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
            <span>Warnings</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
            <span>Info</span>
          </div>
        </div>
        <div>
          Click on highlighted lines to see details
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
