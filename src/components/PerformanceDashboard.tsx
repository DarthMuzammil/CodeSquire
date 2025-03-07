
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { mockPerformanceData, mockTeamMembers, getMemberName } from '@/utils/codeExamples';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PerformanceDashboard = () => {
  const currentSprint = mockPerformanceData[mockPerformanceData.length - 1];
  const completionRate = Math.round((currentSprint.completed / currentSprint.planned) * 100);
  
  const generateTrendData = () => {
    return mockPerformanceData.map(sprint => ({
      name: sprint.sprint,
      planned: sprint.planned,
      completed: sprint.completed,
      efficiency: Math.round((sprint.completed / sprint.planned) * 100),
    }));
  };
  
  const generateTypeData = () => {
    return mockPerformanceData.map(sprint => ({
      name: sprint.sprint,
      bugs: sprint.bugs,
      features: sprint.features,
    }));
  };
  
  const generateTeamData = () => {
    return currentSprint.team.map(member => ({
      name: getMemberName(member.memberId),
      tasks: member.tasks,
      completion: member.completion,
    }));
  };
  
  const trendData = generateTrendData();
  const typeData = generateTypeData();
  const teamData = generateTeamData();
  
  const issueDistribution = [
    { name: 'Bugs', value: currentSprint.bugs },
    { name: 'Features', value: currentSprint.features },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress 
              value={completionRate} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-2">
              {currentSprint.completed} of {currentSprint.planned} tasks completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentSprint.bugs + currentSprint.features}
            </div>
            <Progress 
              value={currentSprint.bugs / (currentSprint.bugs + currentSprint.features) * 100} 
              className="h-2 mt-2 bg-orange-100" 
              indicatorClassName="bg-orange-500" 
            />
            <p className="text-xs text-muted-foreground mt-2">
              {currentSprint.bugs} bugs / {currentSprint.features} features
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentSprint.completed}
            </div>
            <Progress 
              value={(currentSprint.completed / 40) * 100} 
              className="h-2 mt-2 bg-green-100" 
              indicatorClassName="bg-green-500" 
            />
            <p className="text-xs text-muted-foreground mt-2">
              Average: {Math.round((mockPerformanceData.reduce((acc, sprint) => acc + sprint.completed, 0)) / mockPerformanceData.length)} per sprint
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentSprint.team.reduce((acc, member) => acc + member.tasks, 0)}
            </div>
            <div className="grid grid-cols-4 gap-1 mt-2">
              {currentSprint.team.map((member, i) => (
                <div key={i} className="text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-xs font-medium">
                    {mockTeamMembers.find(m => m.id === member.memberId)?.avatar}
                  </div>
                  <div className="text-xs mt-1">{member.tasks}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sprint Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="linear" 
                    dataKey="planned" 
                    stroke="#8884d8" 
                    strokeDasharray="" 
                    name="Planned Tasks"
                    connectNulls 
                    dot={false}
                    activeDot={false}
                  />
                  <Line 
                    type="linear" 
                    dataKey="completed" 
                    stroke="#82ca9d" 
                    strokeDasharray="" 
                    name="Completed Tasks"
                    connectNulls 
                    dot={false}
                    activeDot={false}
                  />
                  <Line 
                    type="linear" 
                    dataKey="efficiency" 
                    stroke="#ff8042" 
                    strokeDasharray="3 3" 
                    name="Efficiency (%)"
                    connectNulls 
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Issue Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bugs" fill="#ff8042" name="Bugs" />
                  <Bar dataKey="features" fill="#8884d8" name="Features" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" name="Assigned Tasks" />
                  <Bar dataKey="completion" fill="#82ca9d" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
