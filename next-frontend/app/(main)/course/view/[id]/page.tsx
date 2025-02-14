"use client"
import { getOneCoursesQueryFn } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar, GraduationCap, MapPin, Clock, Book, Tag, IndianRupee } from 'lucide-react'

function Page() {
  const { theme, setTheme } = useTheme()
  const params = useParams()
  const { id } = params
  const { data, isLoading, isError } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getOneCoursesQueryFn(id),
  })

  if (isLoading) return <SkeletonLoader />
  if (isError) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="p-6">
        <CardContent>
          <p className="text-destructive">Error fetching course data. Please try again later.</p>
        </CardContent>
      </Card>
    </div>
  )

  const { name, shortName, categories, durationInYears, university, eligibility, specializations } = data?.data

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 space-y-8">
        {/* Course Header */}
        <Card className="border-none shadow-lg">
          <CardHeader className="rounded-t-lg space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">{shortName}</Badge>
                {categories?.split(',').map((category, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {category.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{durationInYears} Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{university.universityName}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Eligibility Criteria</h3>
                <div className="space-y-1">
                  {eligibility[0].highSchoolRequired && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">High School: {eligibility[0].highSchoolMinPercentage}%</Badge>
                        </TooltipTrigger>
                        <TooltipContent>Minimum high school percentage required</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {eligibility[0].intermediateRequired && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">Intermediate: {eligibility[0].intermediateMinPercentage}%</Badge>
                        </TooltipTrigger>
                        <TooltipContent>Minimum intermediate percentage required</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {eligibility[0].diplomaRequired && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">Diploma: {eligibility[0].diplomaMinPercentage}%</Badge>
                        </TooltipTrigger>
                        <TooltipContent>Minimum diploma percentage required</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {eligibility[0].ugRequired && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">UG: {eligibility[0].ugMinPercentage}%</Badge>
                        </TooltipTrigger>
                        <TooltipContent>Minimum undergraduate percentage required</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {eligibility[0].pgRequired && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">PG: {eligibility[0].pgMinPercentage}%</Badge>
                        </TooltipTrigger>
                        <TooltipContent>Minimum postgraduate percentage required</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* University Info */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
            <h3 className="text-xl font-semibold">University Information</h3>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-32">
                <Image
                  src={university.universityLogo}
                  alt={`${university.universityName} Logo`}
                  fill
                  className="rounded-full object-cover border-4 border-background"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="text-lg font-semibold">{university.universityName}</h4>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>{university.universityCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{university.address}</span>
                </div>
                <Button variant="outline" className="w-fit">
                  View University Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Specializations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec) => (
              <Card key={spec._id} className="border-none shadow-lg">
                <CardHeader className="bg-muted">
                  <h4 className="text-lg font-semibold">{spec.name}</h4>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {spec?.tags?.map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span className="text-sm">{tag}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <Accordion type="single" collapsible className="w-full">
                        {spec.feeStructure 
                              .slice() // Create a shallow copy to avoid mutating the original array
                              .sort((a, b) => {
                                if (typeof a.applicableTo === "string" && typeof b.applicableTo === "string") {
                                  return a.applicableTo.localeCompare(b.applicableTo); // String sorting
                                }
                                return a.applicableTo - b.applicableTo; // Numeric sorting
                              })
                        .map((fee, index) => {
                          const totalFees = (
                            fee.courseFee +
                            fee.registrationFee +
                            fee.examinationFee +
                            fee.prospectusFee +
                            fee.serviceCharge +
                            fee.otherCharges
                          );
                      
                          return (
                            <AccordionItem key={fee.applicableTo} value={`fee-${index}`}>
                              <AccordionTrigger className="text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <IndianRupee className="w-4 h-4" />
                                  <span> Fees Structure By {spec.feeType} {fee.applicableTo} - ₹{totalFees.toLocaleString('en-IN')}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <Table>
                                  <TableBody className="text-sm">
                                    {[
                                      ['Course Fee', fee.courseFee],
                                      ['Registration', fee.registrationFee],
                                      ['Examination', fee.examinationFee],
                                      ['Prospectus', fee.prospectusFee],
                                      ['Service Charge', fee.serviceCharge],
                                      ['Other Charges', fee.otherCharges],
                                      ['Late Fee', fee.lateFee],
                                    ].map(([label, value]) => (
                                      <TableRow key={label}>
                                        <TableCell className="py-2 font-medium">{label}</TableCell>
                                        <TableCell className="py-2 text-right">₹{value.toLocaleString('en-IN')}</TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow className="border-t-2">
                                      <TableCell className="py-2 font-bold">Total</TableCell>
                                      <TableCell className="py-2 text-right font-bold">
                                        ₹{totalFees.toLocaleString('en-IN')}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Explore Specialization
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, idx) => (
            <Card key={idx} className="border-none shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page