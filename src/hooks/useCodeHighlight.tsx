
import { useState, useEffect } from 'react';
import { CodeIssue } from '@/utils/codeExamples';

export const useCodeHighlight = (code: string, issues: CodeIssue[]) => {
  const [highlightedCode, setHighlightedCode] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!code) {
      setHighlightedCode([]);
      return;
    }

    const lines = code.split('\n');
    const result = lines.map((line, index) => {
      const lineNumber = index + 1;
      const issue = issues.find(i => i.line === lineNumber);
      
      const className = issue 
        ? `code-line highlight-${issue.type}` 
        : 'code-line';
      
      return (
        <div 
          key={`line-${lineNumber}`} 
          className={className}
          data-line-number={lineNumber}
          data-issue-id={issue?.id}
          data-ticket-linked={issue?.id ? 'true' : 'false'}
        >
          {line || ' '}
        </div>
      );
    });

    setHighlightedCode(result);
  }, [code, issues]);

  return highlightedCode;
};

export default useCodeHighlight;
