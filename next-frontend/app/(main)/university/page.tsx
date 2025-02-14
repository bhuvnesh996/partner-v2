"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from "@/context/auth-provider";
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, GraduationCap, AlertCircle, ArrowRight, Users, BookOpen,Percent  } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fetchAssignmentsByUserId } from '@/lib/api';
import { useUniversity } from '@/context/university-context';

const AssignmentsPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
      const { selectedUniversity, setSelectedUniversity } = useUniversity();
    
  const { data: assignments, isLoading, error } = useQuery({
    queryKey: ['assignments', user?._id],
    queryFn: () => fetchAssignmentsByUserId(user?._id),
    enabled: !!user?._id,
  });
  console.log("user",assignments)

  const handleCardClick = (assignment: any) => {
    console.log("assignment",assignment)
      // Save the university data in a cookie
  document.cookie = `selectedUniversity=${JSON.stringify({
    id: assignment.university._id,
    universityName: assignment.university.universityName,
    universityLogo: assignment.university.universityLogo,
    universityShortName: assignment.university.universityShortName,
    vertical: assignment.university.vertical
  })}; path=/`;
    setSelectedUniversity({
      id: assignment.university._id,
      universityName: assignment.university.universityName,
      universityLogo: assignment.university.universityLogo,
      universityShortName: assignment.university.universityShortName,
      vertical: assignment.university.vertical
    });
    
    // Route to vertical-specific home
    const baseRoute = assignment.university.vertical.toLowerCase();
    router.push(`/${baseRoute}`);
  };

  
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="space-y-2">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load university assignments. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-2 mb-8">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Assigned University</h1>
        </div>
        <p className="text-muted-foreground">
          View and manage your assigned universities. Each card represents a university where you have been assigned to assist students with their academic needs.
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : !assignments?.data || assignments.data.length === 0 ? (
        <Card className="bg-muted">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Building2 className="h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-xl font-medium text-muted-foreground mb-2">
              No Universities Assigned Yet
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              You haven't been assigned to any universities at the moment. Once you're assigned, you'll see the university details and assignments here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.data.map((assignment) => (
              <Card 
                key={assignment.id} 
                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                onClick={() => handleCardClick(assignment)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {assignment.university.universityLogo ? (
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={assignment.university.universityLogo}
                          alt={`${assignment.university.universityName} logo`}
                          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                        <Building2 className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <CardTitle className="text-md font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {assignment.university.universityName}
                      </CardTitle>
                      <Badge variant="secondary" className="group-hover:bg-primary/10">
                        {assignment.university.vertical}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Courses: 25+</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>Percentage:{assignment.percentage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-sm text-primary font-medium">
                    <span className="group-hover:underline">Visit Dashboard</span>
                    <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AssignmentsPage;