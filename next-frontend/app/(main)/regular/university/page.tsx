"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUniversity } from '@/context/university-context';
import { universityGetOneQueryFn } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Download, Eye, FileText, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'





// Extracted FileCard component
const FileCard = ({ file }) => {
    const FilePreviewDialog = () => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <TooltipProvider >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View File</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="mr-2 text-red-500" />
                {file.title}
              </DialogTitle>
              <DialogDescription>
                {file.description || "No additional description available."}
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-[600px]">
              <iframe 
                src={file.url} 
                width="100%" 
                height="100%" 
                className="border rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    };
  
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="h-10 w-10 text-red-500" />
            <div>
              <h4 className="text-sm font-semibold dark:text-gray-200">{file.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {file.size ? `${file.size} KB` : 'Unknown size'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-green-500 hover:bg-green-50 dark:hover:bg-green-900"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download File</TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <FilePreviewDialog />
  
          </div>
        </CardContent>
      </Card>
    );
  };
   

function page() {

     const { selectedUniversity } = useUniversity();
     console.log("fix",selectedUniversity)
    const {
      data: universityResponse,
      isLoading,
      isError,
      error,
      refetch
    } = useQuery({
      queryKey: ["university", selectedUniversity?.id],
      queryFn: () => universityGetOneQueryFn(selectedUniversity?.id),
      enabled: !!selectedUniversity?.id,
    });
   
    const university = universityResponse?.data;
  return (
    <div className="p-6 max-w-4xl mx-auto  dark:text-white">
      {isLoading ? (
        <Card className="p-4 dark:bg-gray-900 dark:border-gray-700">
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </Card>
      ) : isError ? (
        <div className="text-center text-red-500">
          <p>Error: {error?.message || "Unable to load university details."}</p>
        </div>
      ) : university ? (
        <Card className="shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="p-0">
            <img
              src={university.banner}
              alt={`${university.universityName} Banner`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="text-center">
            <img
              src={university.universityLogo}
              alt={`${university.universityName} Logo`}
              className="w-24 h-24 object-cover rounded-full mx-auto -mt-12 border-4 border-white shadow-lg"
            />
            <CardTitle className="mt-4 text-2xl font-semibold dark:text-gray-200">
              {university.universityName}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{university.address}</p>
            <div className="grid grid-cols-2 gap-2 mb-4 dark:text-gray-300">
              <div>
                <strong>Vertical:</strong> {university.vertical}
              </div>
              <div>
                <strong>Dealing With:</strong> {university.dealingWith}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center dark:text-gray-200">
                <FileText className="mr-2 h-5 w-5" /> 
                University Files
              </h3>
              {university.files?.length > 0 ? (
                <div className="space-y-3">
                  {university.files.map((file) => (
                    <FileCard 
                      key={file._id} 
                      file={file} 
                   
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No files available</p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No data available for this university.
        </div>
      )}
    </div>
  )
}

export default page