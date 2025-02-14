"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, UserPlus, GraduationCap, DollarSign, UsersRound, Phone, Mail } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const mockData = {
  activeUsers: [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 150 },
    { month: 'Mar', count: 180 },
    { month: 'Apr', count: 220 },
    { month: 'May', count: 250 },
  ],
  recentLeads: [
    { id: 1, name: "Rahul Sharma", course: "B.Tech CSE", phone: "+91 98765-43210", email: "rahul.s@email.com", status: "New" },
    { id: 2, name: "Priya Patel", course: "MBA Finance", phone: "+91 87654-32109", email: "priya.p@email.com", status: "Contacted" },
    { id: 3, name: "Amit Kumar", course: "BBA", phone: "+91 76543-21098", email: "amit.k@email.com", status: "Interested" },
    { id: 4, name: "Neha Singh", course: "M.Tech", phone: "+91 65432-10987", email: "neha.s@email.com", status: "New" },
    { id: 5, name: "Vikram Malhotra", course: "BCA", phone: "+91 54321-09876", email: "vikram.m@email.com", status: "Contacted" },
  ],
  bankAccounts: [
    {
      bankName: "State Bank of India",
      accountNumber: "1234567890",
      ifscCode: "SBIN0012345",
      accountType: "Current",
      branch: "Main Branch"
    },
    {
      bankName: "HDFC Bank",
      accountNumber: "0987654321",
      ifscCode: "HDFC0000123",
      accountType: "Current",
      branch: "City Branch"
    }
  ],
  recentAdmissions: [
    { id: 1, name: "Ankit Verma", course: "B.Tech CSE", date: "2024-02-10", fees: "₹85,000", status: "Confirmed" },
    { id: 2, name: "Meera Reddy", course: "MBA", date: "2024-02-09", fees: "₹95,000", status: "Pending" },
    { id: 3, name: "Rajesh Kumar", course: "BCA", date: "2024-02-08", fees: "₹45,000", status: "Confirmed" },
    { id: 4, name: "Sanya Gupta", course: "M.Tech", date: "2024-02-07", fees: "₹75,000", status: "Confirmed" },
    { id: 5, name: "Karan Shah", course: "BBA", date: "2024-02-06", fees: "₹55,000", status: "Pending" },
  ]
};

const DashboardPage = () => {
  const stats = [
    {
      title: "Active Sessions",
      value: "2,845",
      description: "Users online now",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      trend: "+12.5%"
    },
    {
      title: "Total Courses",
      value: "48",
      description: "Available courses",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      trend: "+4"
    },
    {
      title: "New Leads",
      value: "389",
      description: "This month",
      icon: <UserPlus className="h-6 w-6 text-purple-600" />,
      trend: "+22.4%"
    },
    {
      title: "Admissions",
      value: "156",
      description: "Total enrolled",
      icon: <GraduationCap className="h-6 w-6 text-orange-600" />,
      trend: "+18.2%"
    },
    {
      title: "Commission Received",
      value: "₹1,28,450",
      description: "This month",
      icon: <DollarSign className="h-6 w-6 text-yellow-600" />,
      trend: "+32.8%"
    },
    {
      title: "Relation Managers",
      value: "24",
      description: "Active managers",
      icon: <UsersRound className="h-6 w-6 text-red-600" />,
      trend: "+2"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Interested': 'bg-green-100 text-green-800',
      'Confirmed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-gray-600 mt-1">
                {stat.description}
                <span className="text-green-600 ml-2">{stat.trend}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Active Users Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.activeUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.course}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {lead.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {lead.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bank Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>University Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>IFSC Code</TableHead>
                  <TableHead>Branch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.bankAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{account.bankName}</TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell>{account.ifscCode}</TableCell>
                    <TableCell>{account.branch}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Admissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Fees Paid</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.recentAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-medium">{admission.name}</TableCell>
                  <TableCell>{admission.course}</TableCell>
                  <TableCell>{admission.date}</TableCell>
                  <TableCell>{admission.fees}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(admission.status)}>
                      {admission.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;