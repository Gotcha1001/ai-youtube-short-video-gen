// import { Button } from '@/components/ui/button'
// import { ArrowLeft, DownloadIcon } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// function VideoInfo({ videoData }) {
//     return (
//         <div className='border p-4 rounded-lg' >
//             <Link href={'/dashboard'}>
//                 <h2 className='flex gap-2 items-center text-white'>
//                     <ArrowLeft />
//                     Back To DashBoard
//                 </h2>
//             </Link>

//             <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
//                 <h2 className='mt-5 text-lg font-bold text-indigo-500'>Project Name: {videoData?.title}</h2>
//                 <p className='text-gray-200'>Script: {videoData?.script}</p>
//                 <h2 className='text-purple-600'>Video Style: {videoData?.videoStyle}</h2>
//                 <Button variant="sex2"><DownloadIcon />Export & Download</Button>
//             </div>

//         </div>
//     )
// }

// export default VideoInfo


// import { Button } from '@/components/ui/button';
// import { ArrowLeft, DownloadIcon, Loader2 } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { toast } from 'sonner'; // Assuming you're using sonner for toast notifications
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function VideoInfo({ videoData: initialVideoData }) {
//     const [isDownloading, setIsDownloading] = useState(false);
//     const convex = useConvex();
//     const [videoData, setVideoData] = useState(initialVideoData);

//     // Function to get the latest video data
//     const refreshVideoData = async () => {
//         if (!videoData?._id) return;

//         try {
//             const freshData = await convex.query(api.videoData.GetVideoById, {
//                 videoId: videoData._id
//             });

//             setVideoData(freshData);
//             return freshData;
//         } catch (error) {
//             console.error("Error fetching latest video data:", error);
//             toast.error("Couldn't fetch the latest video status");
//             return null;
//         }
//     };

//     // Function to handle download
//     const handleDownload = async () => {
//         setIsDownloading(true);

//         try {
//             // Get the latest data first
//             const latestData = await refreshVideoData();
//             const currentData = latestData || videoData;

//             if (!currentData?.downloadUrl) {
//                 toast.error("Video is still being processed. Please try again later.");
//                 setIsDownloading(false);
//                 return;
//             }

//             // Create a temporary anchor element to trigger the download
//             const link = document.createElement('a');
//             link.href = currentData.downloadUrl;
//             link.setAttribute('download', `${currentData?.title || 'video'}.mp4`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             toast.success("Download started!");
//         } catch (error) {
//             console.error("Download error:", error);
//             toast.error("Failed to download the video");
//         } finally {
//             setIsDownloading(false);
//         }
//     };

//     // Check if video is still processing
//     const isVideoProcessing = videoData?.status !== "completed" || !videoData?.downloadUrl;

//     return (
//         <div className='border p-4 rounded-lg'>
//             <Link href={'/dashboard'}>
//                 <h2 className='flex gap-2 items-center text-white'>
//                     <ArrowLeft />
//                     Back To DashBoard
//                 </h2>
//             </Link>
//             <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
//                 <h2 className='mt-5 text-lg font-bold text-indigo-500'>Project Name: {videoData?.title}</h2>
//                 <p className='text-gray-200'>Script: {videoData?.script}</p>
//                 <h2 className='text-purple-600'>Video Style: {videoData?.videoStyle}</h2>

//                 <Button
//                     variant="sex2"
//                     onClick={handleDownload}
//                     disabled={isVideoProcessing || isDownloading}
//                 >
//                     {isDownloading ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Downloading...
//                         </>
//                     ) : isVideoProcessing ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Processing...
//                         </>
//                     ) : (
//                         <>
//                             <DownloadIcon className="mr-2" />
//                             Export & Download
//                         </>
//                     )}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default VideoInfo;


// import { Button } from '@/components/ui/button';
// import { ArrowLeft, DownloadIcon, Loader2 } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'sonner'; // Assuming you're using sonner for toast notifications
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function VideoInfo({ videoData: initialVideoData }) {
//     const [isDownloading, setIsDownloading] = useState(false);
//     const convex = useConvex();
//     const [videoData, setVideoData] = useState(initialVideoData);
//     const [isPolling, setIsPolling] = useState(false);

//     // Function to check if the video is still processing
//     const isVideoStillProcessing = () => {
//         return videoData?.status !== "completed" || !videoData?.downloadUrl;
//     };

//     // Set up polling for video status if it's processing
//     useEffect(() => {
//         let intervalId;

//         if (isVideoStillProcessing() && !isPolling) {
//             setIsPolling(true);

//             intervalId = setInterval(async () => {
//                 try {
//                     if (!videoData?._id) return;

//                     const freshData = await convex.query(api.videoData.GetVideoById, {
//                         videoId: videoData._id
//                     });

//                     if (freshData) {
//                         setVideoData(freshData);

//                         // If video is complete, stop polling
//                         if (freshData.status === "completed" && freshData.downloadUrl) {
//                             clearInterval(intervalId);
//                             setIsPolling(false);
//                             toast.success("Video processing complete! Ready to download.");
//                         }
//                     }
//                 } catch (error) {
//                     console.error("Error polling video status:", error);
//                 }
//             }, 5000); // Poll every 5 seconds
//         }

//         return () => {
//             if (intervalId) clearInterval(intervalId);
//         };
//     }, [videoData?._id, isPolling]);

//     // Function to handle download
//     const handleDownload = () => {
//         if (!videoData?.downloadUrl) {
//             toast.error("Download URL not available. Please wait for processing to complete.");
//             return;
//         }

//         setIsDownloading(true);

//         try {
//             // Create a temporary anchor element to trigger the download
//             const link = document.createElement('a');
//             link.href = videoData.downloadUrl;
//             link.setAttribute('download', `${videoData?.title || 'video'}.mp4`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             toast.success("Download started!");
//         } catch (error) {
//             console.error("Download error:", error);
//             toast.error("Failed to download the video");
//         } finally {
//             setIsDownloading(false);
//         }
//     };

//     return (
//         <div className='border p-4 rounded-lg'>
//             <Link href={'/dashboard'}>
//                 <h2 className='flex gap-2 items-center text-white'>
//                     <ArrowLeft />
//                     Back To DashBoard
//                 </h2>
//             </Link>
//             <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
//                 <h2 className='mt-5 text-lg font-bold text-indigo-500'>Project Name: {videoData?.title}</h2>
//                 <p className='text-gray-200'>Script: {videoData?.script}</p>
//                 <h2 className='text-purple-600'>Video Style: {videoData?.videoStyle}</h2>

//                 <div className="space-y-2">
//                     {videoData?.status && (
//                         <p className={`text-sm ${videoData.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
//                             Status: {videoData.status === "completed" ? "Completed" : "Processing..."}
//                         </p>
//                     )}

//                     <Button
//                         variant="sex2"
//                         onClick={handleDownload}
//                         disabled={isVideoStillProcessing() || isDownloading}
//                     >
//                         {isDownloading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Downloading...
//                             </>
//                         ) : isVideoStillProcessing() ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Processing Video...
//                             </>
//                         ) : (
//                             <>
//                                 <DownloadIcon className="mr-2" />
//                                 Export & Download
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default VideoInfo;

// import { Button } from '@/components/ui/button';
// import { ArrowLeft, DownloadIcon, Loader2 } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function VideoInfo({ videoData: initialVideoData }) {
//     const [isDownloading, setIsDownloading] = useState(false);
//     const [isCheckingStatus, setIsCheckingStatus] = useState(false);
//     const convex = useConvex();
//     const [videoData, setVideoData] = useState(initialVideoData);

//     // Set initial data on component mount or when initialVideoData changes
//     useEffect(() => {
//         if (initialVideoData) {
//             setVideoData(initialVideoData);
//         }
//     }, [initialVideoData]);

//     // Function to check video status and download
//     const handleExportAndDownload = async () => {
//         // Start the loading state
//         setIsCheckingStatus(true);

//         try {
//             // Check the latest video status
//             const freshData = await convex.query(api.videoData.GetVideoById, {
//                 videoId: initialVideoData._id
//             });

//             // Update our local state
//             if (freshData) {
//                 setVideoData(freshData);
//             }

//             // If download URL is available, start download
//             if (freshData?.downloadUrl) {
//                 setIsCheckingStatus(false);
//                 setIsDownloading(true);

//                 // Create a temporary anchor element to trigger the download
//                 const link = document.createElement('a');
//                 link.href = freshData.downloadUrl;
//                 link.setAttribute('download', `${freshData?.title || 'video'}.mp4`);
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);

//                 toast.success("Download started!");
//                 setIsDownloading(false);
//             } else {
//                 // If no download URL, show processing message
//                 toast.info("Video is still processing. Please try again later.");
//                 setIsCheckingStatus(false);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Failed to download the video");
//             setIsCheckingStatus(false);
//             setIsDownloading(false);
//         }
//     };

//     return (
//         <div className='border p-4 rounded-lg'>
//             <Link href={'/dashboard'}>
//                 <h2 className='flex gap-2 items-center text-white'>
//                     <ArrowLeft />
//                     Back To DashBoard
//                 </h2>
//             </Link>
//             <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
//                 <h2 className='mt-5 text-lg font-bold text-indigo-500'>
//                     Project Name: {videoData?.title || initialVideoData?.title}
//                 </h2>
//                 <p className='text-gray-200'>
//                     Script: {videoData?.script || initialVideoData?.script}
//                 </p>
//                 <h2 className='text-purple-600'>
//                     Video Style: {videoData?.videoStyle || initialVideoData?.videoStyle}
//                 </h2>

//                 <Button
//                     variant="sex2"
//                     onClick={handleExportAndDownload}
//                     disabled={isCheckingStatus || isDownloading}
//                 >
//                     {isCheckingStatus ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Checking Status...
//                         </>
//                     ) : isDownloading ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Downloading...
//                         </>
//                     ) : (
//                         <>
//                             <DownloadIcon className="mr-2" />
//                             Export & Download
//                         </>
//                     )}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default VideoInfo;


// import { Button } from '@/components/ui/button';
// import { ArrowLeft, DownloadIcon, Loader2 } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function VideoInfo({ videoData: initialVideoData }) {
//     const [isDownloading, setIsDownloading] = useState(false);
//     const [isCheckingStatus, setIsCheckingStatus] = useState(false);
//     const convex = useConvex();
//     const [videoData, setVideoData] = useState(initialVideoData);

//     // Set initial data on component mount or when initialVideoData changes
//     useEffect(() => {
//         if (initialVideoData) {
//             setVideoData(initialVideoData);
//         }
//     }, [initialVideoData]);

//     // Function to check video status and download
//     const handleExportAndDownload = async () => {
//         // Start the loading state
//         setIsCheckingStatus(true);

//         try {
//             // Check the latest video status
//             const freshData = await convex.query(api.videoData.GetVideoById, {
//                 videoId: initialVideoData._id
//             });

//             // Update our local state
//             if (freshData) {
//                 setVideoData(freshData);
//             }

//             // If download URL is available, start download
//             if (freshData?.downloadUrl) {
//                 setIsCheckingStatus(false);
//                 setIsDownloading(true);

//                 // Open the download URL in a new tab
//                 window.open(freshData.downloadUrl, '_blank');

//                 toast.success("Download opened in new tab!");
//                 setIsDownloading(false);
//             } else {
//                 // If no download URL, show processing message
//                 toast.info("Video is still processing. Please try again later.");
//                 setIsCheckingStatus(false);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Failed to download the video");
//             setIsCheckingStatus(false);
//             setIsDownloading(false);
//         }
//     };

//     return (
//         <div className='border p-4 rounded-lg'>
//             <Link href={'/dashboard'}>
//                 <h2 className='flex gap-2 items-center text-white'>
//                     <ArrowLeft />
//                     Back To DashBoard
//                 </h2>
//             </Link>
//             <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
//                 <h2 className='mt-5 text-lg font-bold text-indigo-500'>
//                     Project Name: {videoData?.title || initialVideoData?.title}
//                 </h2>
//                 <p className='text-gray-200'>
//                     Script: {videoData?.script || initialVideoData?.script}
//                 </p>
//                 <h2 className='text-purple-600'>
//                     Video Style: {videoData?.videoStyle || initialVideoData?.videoStyle}
//                 </h2>

//                 <Button
//                     variant="sex2"
//                     onClick={handleExportAndDownload}
//                     disabled={isCheckingStatus || isDownloading}
//                 >
//                     {isCheckingStatus ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Checking Status...
//                         </>
//                     ) : isDownloading ? (
//                         <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Downloading...
//                         </>
//                     ) : (
//                         <>
//                             <DownloadIcon className="mr-2" />
//                             Export & Download
//                         </>
//                     )}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default VideoInfo;


import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function VideoInfo({ videoData: initialVideoData }) {
    const [videoData, setVideoData] = useState(initialVideoData);

    // Set initial data on component mount or when initialVideoData changes
    useEffect(() => {
        if (initialVideoData) {
            setVideoData(initialVideoData);
        }
    }, [initialVideoData]);

    return (
        <div className='border p-4 rounded-lg'>
            <Link href={'/dashboard'}>
                <h2 className='flex gap-2 items-center text-white'>
                    <ArrowLeft />
                    Back To DashBoard
                </h2>
            </Link>
            <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
                <h2 className='mt-5 text-lg font-bold text-indigo-500'>
                    Project Name: {videoData?.title || initialVideoData?.title}
                </h2>
                <p className='text-gray-200'>
                    Script: {videoData?.script || initialVideoData?.script}
                </p>
                <h2 className='text-purple-600'>
                    Video Style: {videoData?.videoStyle || initialVideoData?.videoStyle}
                </h2>
            </div>
        </div>
    );
}

export default VideoInfo;