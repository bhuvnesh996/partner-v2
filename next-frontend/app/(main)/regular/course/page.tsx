"use client"
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  getCoursesQueryFn, needUniversitiesQueryFn } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
 
  RefreshCw,
} from "lucide-react";
// import CourseCard from "../_components/CourseCard";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import CourseCard from "../../_components/CourseCard";
import { useUniversity } from "@/context/university-context";



const CourseCategories = [
  "Engineering",
  "Medicine",
  "Law",
  "Arts",
  "Commerce",
  "Science",
  "Business Management",
  "Architecture",
  "Agriculture",
  "Education",
  "Hotel Management",
  "Design",
  "Journalism",
  "Fashion",
  "Animation",
];

const FeeTypes = ["Year", "Semester"];

export default function page() {
  const { selectedUniversity } = useUniversity();

  const InitialFilters = {
    name: "",
    category: "",
    specialization: "",
    duration: "",
    universityId: selectedUniversity?.id,
    minFee: "",
    maxFee: "",
    minAge: "",
    maxAge: "",
    eligibility: "",
  };
  const [filters, setFilters] = useState(InitialFilters);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

 
  
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["courses", { ...filters, page, limit }],
    queryFn: () => getCoursesQueryFn({ ...filters, page, limit }),
    staleTime: Infinity,
  });



  const handleFilterChange = (key:any, value:any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(InitialFilters);
    setPage(1);
  };

  const handleView = (courseId:string) => {
    router.push(`/course/view/${courseId}`)
    // Navigate to course details or open a modal
  };
 
     // Fetch universities using useQuery
     const { data:uni} = useQuery({
      queryKey: ["universities", { }],
      queryFn: async () => {
        const params: any = {
         
        };
        return needUniversitiesQueryFn(params);
      },
      staleTime: Infinity, // Retain previous data while fetching new
    });
   
    const universities = uni?.data;
    console.log("universitry",universities)
 

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Filters Panel */}
      <Card className="md:w-1/4 h-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-medium">Filters</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="basic">
              <AccordionTrigger>Basic Filters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Name</label>
                    <Input
                      placeholder="Search courses..."
                      value={filters.name}
                      onChange={(e) => handleFilterChange("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => handleFilterChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-72">
                          {CourseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fees">
              <AccordionTrigger>Fee Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Min Fee"
                    value={filters.minFee}
                    onChange={(e) => handleFilterChange("minFee", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Fee"
                    value={filters.maxFee}
                    onChange={(e) => handleFilterChange("maxFee", e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="age">
              <AccordionTrigger>Age Requirements</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Min Age"
                    value={filters.minAge}
                    onChange={(e) => handleFilterChange("minAge", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Age"
                    value={filters.maxAge}
                    onChange={(e) => handleFilterChange("maxAge", e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            className="w-full mt-4" 
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Filter className="h-4 w-4 mr-2" />
            )}
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="md:w-3/4">
        {isError ? (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>Failed to load courses. Please try again.</CardDescription>
            </CardHeader>
          </Card>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : data?.data?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            {data.data.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onView={handleView}
              />
            ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={data.data.length < limit || isFetching}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>No Courses Found</CardTitle>
              <CardDescription>
                Try adjusting your filters to find more courses
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}