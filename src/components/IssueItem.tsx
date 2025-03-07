
import React from 'react';
import { CodeIssue } from '@/utils/codeExamples';
import { AlertCircle, AlertTriangle, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IssueItemProps {
  issue: CodeIssue;
  isSelected: boolean;
  onClick: () => void;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue, isSelected, onClick }) => {
  const getIcon = () => {
    switch (issue.type) {
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    if (isSelected) {
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
    return 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-800';
  };

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${getBgColor()}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 dark:text-gray-400">Line {issue.line}</span>
            <span className={`text-xs capitalize px-2 py-0.5 rounded-full ${
              issue.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
              issue.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
              issue.type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            }`}>
              {issue.type}
            </span>
          </div>
          <h4 className="text-sm font-medium mt-1">{issue.message}</h4>
          {issue.suggestion && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {issue.suggestion}
            </p>
          )}
          {issue.code && (
            <div className="mt-2 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500 dark:text-gray-400">Suggested fix:</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-blue-600 dark:text-blue-400 p-0 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <span className="text-xs mr-1">Apply</span>
                  <ArrowRight size={12} />
                </Button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                <code>{issue.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueItem;
