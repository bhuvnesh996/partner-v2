"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link, Users, Phone, Mail, TrendingUp, TrendingDown, Graduate, Building, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StatCard = () => (
  <Card className="hover:shadow-lg transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">
        fsafasfsa
      </CardTitle>
      {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">100</div>
      <div className="flex items-center mt-1">
        {'up' === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <Badge variant={'up' === 'up' ? "success" : "destructive"} className="text-xs">
          10
        </Badge>
      </div>
    </CardContent>
  </Card>
);
const Dashboard = () => {
  const admissionsData = [
    { month: 'Jan', count: 65, students: 120, revenue: 25000 },
    { month: 'Feb', count: 85, students: 150, revenue: 32000 },
    { month: 'Mar', count: 120, students: 180, revenue: 41000 },
    { month: 'Apr', count: 90, students: 140, revenue: 35000 },
    { month: 'May', count: 110, students: 160, revenue: 38000 },
    { month: 'Jun', count: 130, students: 200, revenue: 45000 },
    { month: 'Jul', count: 130, students: 200, revenue: 35000 },
    { month: 'Aug', count: 130, students: 200, revenue: 25000 },
    { month: 'Sept', count: 130, students: 200, revenue: 65000 },
    { month: 'Oct', count: 130, students: 200, revenue: 15000 },
    { month: 'Nov', count: 130, students: 200, revenue: 95000 },
    { month: 'Dec', count: 130, students: 200, revenue: 5000 },
  ];

  const studentDistribution = [
    { name: 'Undergraduate', value: 400, color: '#0ea5e9' },
    { name: 'Graduate', value: 300, color: '#8b5cf6' },
    { name: 'PhD', value: 100, color: '#f43f5e' },
  ];

  const relationshipManagers = [
    { name: 'John Doe', phone: '+1 234-567-8901', email: 'john@example.com', students: 45, performance: 'high' },
    { name: 'Jane Smith', phone: '+1 234-567-8902', email: 'jane@example.com', students: 38, performance: 'medium' },
    { name: 'Mike Johnson', phone: '+1 234-567-8903', email: 'mike@example.com', students: 52, performance: 'high' },
    { name: 'Sarah Wilson', phone: '+1 234-567-8904', email: 'sarah@example.com', students: 31, performance: 'medium' },
  ];


  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of  performance metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Assigned Universities"
            value="245"
            trend="up"
            trendValue="+4% this month"
            icon={Building}
          />
          <StatCard 
            title="Total Students"
            value="800"
            trend="up"
            trendValue="+15% this month"
            icon={Graduate}
          />
          <StatCard 
            title="Active Applications"
            value="1,324"
            trend="up"
            trendValue="+12% this year"
            icon={FileText}
          />
          <StatCard 
            title="Relationship Managers"
            value={relationshipManagers.length}
            trend="up"
            trendValue="Full capacity"
            icon={Users}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Revenue Line Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Revenue Overview
                <Badge variant="secondary">This Year</Badge>
              </CardTitle>
              <CardDescription>Monthly revenue from admissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={admissionsData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={{ fill: '#0ea5e9' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Students Bar Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Student Enrollment
                <Badge variant="secondary">Monthly Trend</Badge>
              </CardTitle>
              <CardDescription>New students added per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={admissionsData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="students" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Student Distribution */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Student Distribution
                <Badge variant="secondary">By Level</Badge>
              </CardTitle>
              <CardDescription>Distribution across education levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {studentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Relationship Managers */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Relationship Managers
                <Badge variant="secondary">Team Overview</Badge>
              </CardTitle>
              <CardDescription>Performance and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {relationshipManagers.map((manager, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{manager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {manager.name}
                              <Badge variant={manager.performance === 'high' ? 'success' : 'secondary'}>
                                {manager.students} students
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {manager.email}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;