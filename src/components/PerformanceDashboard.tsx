
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const sprintVelocityData = [
  { name: 'Sprint 1', points: 24 },
  { name: 'Sprint 2', points: 35 },
  { name: 'Sprint 3', points: 42 },
  { name: 'Sprint 4', points: 38 },
  { name: 'Sprint 5', points: 45 },
  { name: 'Sprint 6', points: 47 },
];

const teamCommitsData = [
  { name: 'Mon', commits: 12 },
  { name: 'Tue', commits: 19 },
  { name: 'Wed', commits: 15 },
  { name: 'Thu', commits: 21 },
  { name: 'Fri', commits: 16 },
  { name: 'Sat', commits: 5 },
  { name: 'Sun', commits: 3 },
];

const issueStatusData = [
  { name: 'Completed', value: 48, color: '#10b981' },
  { name: 'In Progress', value: 27, color: '#3b82f6' },
  { name: 'Backlog', value: 85, color: '#6b7280' },
];

const devMetricsData = [
  { name: 'Alex', issues: 18, commits: 47, codeQuality: 92 },
  { name: 'Maya', issues: 15, commits: 39, codeQuality: 88 },
  { name: 'Taylor', issues: 22, commits: 56, codeQuality: 85 },
  { name: 'Jamie', issues: 17, commits: 42, codeQuality: 90 },
];

const burndownData = [
  { day: 1, remaining: 120 },
  { day: 2, remaining: 115 },
  { day: 3, remaining: 102 },
  { day: 4, remaining: 95 },
  { day: 5, remaining: 88 },
  { day: 6, remaining: 75 },
  { day: 7, remaining: 70 },
  { day: 8, remaining: 65 },
  { day: 9, remaining: 60 },
  { day: 10, remaining: 50 },
  { day: 11, remaining: 42 },
  { day: 12, remaining: 30 },
  { day: 13, remaining: 25 },
  { day: 14, remaining: 12 },
];

const PerformanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sprint Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 points</div>
            <p className="text-xs text-muted-foreground">Current sprint</p>
            <div className="h-[120px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sprintVelocityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="points" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Team Commits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
            <div className="h-[120px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamCommitsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="commits" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Issue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160 total</div>
            <p className="text-xs text-muted-foreground">All project issues</p>
            <div className="h-[120px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {issueStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sprint">
        <TabsList>
          <TabsTrigger value="sprint">Sprint Burndown</TabsTrigger>
          <TabsTrigger value="devs">Developer Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sprint">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Burndown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="remaining" stroke="#ff0000" name="Remaining Points" />
                    <Line 
                      type="linear" 
                      dataKey="day" 
                      stroke="#888888" 
                      strokeDasharray="5 5" 
                      name="Ideal Burndown"
                      connectNulls 
                      dot={false}
                      activeDot={false}
                      // Use a function to calculate the ideal burndown line
                      calculatePoints={(item, index) => (burndownData.length - index) * (burndownData[0].remaining / burndownData.length)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devs">
          <Card>
            <CardHeader>
              <CardTitle>Developer Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={devMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="issues" name="Issues Resolved" fill="#8884d8" />
                    <Bar dataKey="commits" name="Commits" fill="#82ca9d" />
                    <Bar dataKey="codeQuality" name="Code Quality Score" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceDashboard;
