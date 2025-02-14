"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Maximize2, X, Download, Youtube, Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPromotionalQueryFn } from "@/lib/api";
import { useRouter } from "next/navigation";

const SkeletonCard = () => (
  <Card className="group relative hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="space-y-2">
      <div className="h-6 bg-gray-200 rounded-md animate-pulse" />
      <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />
    </CardContent>
  </Card>
);

const MediaCard = ({ item }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDownload = async () => {
    if (item.mediaType === "VIDEO") {
      window.open(item.mediaUrl, "_blank");
      return;
    }

    try {
      const response = await fetch(item.mediaUrl);
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Add watermark text
        ctx.fillStyle = "rgba(56, 49, 49, 0.8)";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("NAME EXAMPLE", canvas.width / 2, canvas.height - 60);
        ctx.fillText("PHONE EXAMPLE", canvas.width / 2, canvas.height - 30);

        // Convert to blob and trigger download
        canvas.toBlob((newBlob) => {
          const url = URL.createObjectURL(newBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${item.title}.${item.mediaType.toLowerCase()}`;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, "image/png");
      };
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Card
      className="group relative overflow-hidden bg-black rounded-xl"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {item.mediaType === "VIDEO" ? (
        <div className="relative aspect-square">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Youtube className="w-12 h-12 text-red-600" />
          </div>
          <img
            src={`https://img.youtube.com/vi/${item.mediaUrl.split("v=")[1]}/maxresdefault.jpg`}
            alt={item.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-50"}`}
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-square relative">
          <img
            src={item.mediaUrl}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${loading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/70 flex flex-col justify-between p-4 transition-opacity duration-300 ${showOverlay ? "opacity-100" : "opacity-0"}`}
      >
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-gray-200 text-sm line-clamp-2">{item.description}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="icon" onClick={handleDownload} className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const PromotionalPage = () => {
  const [activeTab, setActiveTab] = useState("IMAGE");
  const fetchLimit = 12;
  const observerRef = useRef(null);
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["promotionalItems"],
    queryFn: ({ pageParam = 1 }) => getAllPromotionalQueryFn(pageParam, fetchLimit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length < fetchLimit ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("Fetching next page...");
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderMedia = (mediaType) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    const items = data?.pages.flatMap((page) => page.data.filter((item) => item.mediaType === mediaType));

    if (!items?.length) {
      return <div className="text-center py-8 text-gray-500">No {mediaType.toLowerCase()} content available</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="promotional-page p-6 max-w-7xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="IMAGE">Images</TabsTrigger>
          <TabsTrigger value="GIF">GIFs</TabsTrigger>
          <TabsTrigger value="VIDEO">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="IMAGE">{renderMedia("IMAGE")}</TabsContent>
        <TabsContent value="GIF">{renderMedia("GIF")}</TabsContent>
        <TabsContent value="VIDEO">{renderMedia("VIDEO")}</TabsContent>


      </Tabs>
      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
};

export default PromotionalPage;
