
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeInput from '@/components/CodeInput';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, TicketCheck, LineChart, Zap, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">DevOps Hub</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The all-in-one platform for code reviews, issue tracking, and team performance monitoring.
            Powered by AI to streamline your development workflow.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <AIAssistant />
            <Link to="https://github.com/your-repo/devops-hub" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github size={16} />
                Star on GitHub
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="mb-2 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Code size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Automated Code Review</CardTitle>
              <CardDescription>
                Get instant feedback on your code quality with AI-powered static analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our code review tool identifies potential bugs, style issues, and security vulnerabilities before they make it to production.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/review" className="w-full">
                <Button variant="default" className="w-full">
                  Review Code
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="mb-2 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <TicketCheck size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Issue Tracking</CardTitle>
              <CardDescription>
                Manage your team's tasks and bugs with a powerful, customizable workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create, assign, and track issues across your entire team with our intuitive Kanban board. Seamlessly integrate with code reviews.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/issues" className="w-full">
                <Button variant="default" className="w-full">
                  Manage Issues
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="mb-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <LineChart size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Monitor velocity, quality, and productivity with insightful dashboards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get a clear view of your team's performance with real-time metrics and charts. Identify bottlenecks and improve efficiency.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/issues?tab=performance" className="w-full">
                <Button variant="default" className="w-full">
                  View Analytics
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Get Started with a Code Review</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Enter a GitHub PR URL or upload your code to get instant feedback on quality, style, and potential issues.
              </p>
              <div className="flex gap-4">
                <Link to="/review">
                  <Button variant="outline" className="gap-2">
                    <Zap size={16} />
                    Start Full Review
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <CodeInput onSubmit={(code, issues) => {
                // Store in localStorage and redirect
                localStorage.setItem('reviewCode', code);
                localStorage.setItem('reviewIssues', JSON.stringify(issues));
                window.location.href = '/review';
              }} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
