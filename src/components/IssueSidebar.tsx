
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeIssue, getIssueCount, getFilteredIssues } from '@/utils/codeExamples';
import IssueItem from './IssueItem';
import { AlertCircle, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface IssueSidebarProps {
  issues: CodeIssue[];
  selectedIssueId: string | null;
  onIssueSelect: (issueId: string) => void;
}

const IssueSidebar: React.FC<IssueSidebarProps> = ({ issues, selectedIssueId, onIssueSelect }) => {
  const [filters, setFilters] = useState({
    error: true,
    warning: true,
    info: true,
    success: true
  });
  
  const issueCounts = getIssueCount(issues);
  const filteredIssues = getFilteredIssues(issues, filters);
  
  const toggleFilter = (type: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-subtle animate-slide-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Issues</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {issues.length} found
          </span>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-medium mb-3">Filter by type</h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-error" 
              checked={filters.error}
              onCheckedChange={() => toggleFilter('error')}
            />
            <label 
              htmlFor="filter-error" 
              className="flex items-center text-sm cursor-pointer"
            >
              <AlertCircle size={14} className="text-red-500 mr-1" />
              <span>Errors</span>
              {issueCounts.error && (
                <Badge variant="outline" className="ml-1 h-5 text-xs">
                  {issueCounts.error}
                </Badge>
              )}
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-warning" 
              checked={filters.warning}
              onCheckedChange={() => toggleFilter('warning')}
            />
            <label 
              htmlFor="filter-warning" 
              className="flex items-center text-sm cursor-pointer"
            >
              <AlertTriangle size={14} className="text-yellow-500 mr-1" />
              <span>Warnings</span>
              {issueCounts.warning && (
                <Badge variant="outline" className="ml-1 h-5 text-xs">
                  {issueCounts.warning}
                </Badge>
              )}
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-info" 
              checked={filters.info}
              onCheckedChange={() => toggleFilter('info')}
            />
            <label 
              htmlFor="filter-info" 
              className="flex items-center text-sm cursor-pointer"
            >
              <Info size={14} className="text-blue-500 mr-1" />
              <span>Info</span>
              {issueCounts.info && (
                <Badge variant="outline" className="ml-1 h-5 text-xs">
                  {issueCounts.info}
                </Badge>
              )}
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-success" 
              checked={filters.success}
              onCheckedChange={() => toggleFilter('success')}
            />
            <label 
              htmlFor="filter-success" 
              className="flex items-center text-sm cursor-pointer"
            >
              <CheckCircle size={14} className="text-green-500 mr-1" />
              <span>Suggestions</span>
              {issueCounts.success && (
                <Badge variant="outline" className="ml-1 h-5 text-xs">
                  {issueCounts.success}
                </Badge>
              )}
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="issues">
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="issues" className="flex-1">Issues</TabsTrigger>
              <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="issues" className="mt-0 p-4 space-y-3">
            {filteredIssues.length > 0 ? (
              filteredIssues.map(issue => (
                <IssueItem 
                  key={issue.id}
                  issue={issue}
                  isSelected={selectedIssueId === issue.id}
                  onClick={() => onIssueSelect(issue.id)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <XCircle size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No issues matching your filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="mt-0 p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Overall summary</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Issues found</div>
                      <div className="text-2xl font-semibold">{issues.length}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Critical errors</div>
                      <div className="text-2xl font-semibold">{issueCounts.error || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Issues by type</h3>
                <div className="space-y-3">
                  {issueCounts.error && (
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <div className="flex items-center">
                        <AlertCircle size={16} className="text-red-500 mr-2" />
                        <span className="text-red-800 dark:text-red-300">Errors</span>
                      </div>
                      <span className="font-semibold">{issueCounts.error}</span>
                    </div>
                  )}
                  
                  {issueCounts.warning && (
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                      <div className="flex items-center">
                        <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                        <span className="text-yellow-800 dark:text-yellow-300">Warnings</span>
                      </div>
                      <span className="font-semibold">{issueCounts.warning}</span>
                    </div>
                  )}
                  
                  {issueCounts.info && (
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-2" />
                        <span className="text-blue-800 dark:text-blue-300">Improvements</span>
                      </div>
                      <span className="font-semibold">{issueCounts.info}</span>
                    </div>
                  )}
                  
                  {issueCounts.success && (
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                        <span className="text-green-800 dark:text-green-300">Suggestions</span>
                      </div>
                      <span className="font-semibold">{issueCounts.success}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Recommendation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review and address the critical errors first, followed by warnings. 
                  The suggestions can be implemented to improve code quality.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IssueSidebar;
