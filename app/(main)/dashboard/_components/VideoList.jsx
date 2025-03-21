// "use client"

// import ContinuousSmokeEffect from '@/app/_components/FramerMotion/ContinuousSmokeEffect'
// import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
// import { useAuthContext } from '@/app/provider'
// import { Button } from '@/components/ui/button'
// import { api } from '@/convex/_generated/api'
// import { useConvex } from 'convex/react'
// import { RefreshCcw } from 'lucide-react'
// import moment from 'moment'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'

// function VideoList() {
//     const [allVideoList, setAllVideoList] = useState([])
//     const [videoList, setVideoList] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [pageIndex, setPageIndex] = useState(0)
//     const pageSize = 5 // Number of videos per page

//     const convex = useConvex()
//     const { user } = useAuthContext()

//     useEffect(() => {
//         user && GetUserVideoList()
//     }, [user])

//     const GetUserVideoList = async () => {
//         setLoading(true)
//         // All Users Videos
//         const result = await convex.query(api.videoData.GetUserVideos, {
//             uid: user?._id
//         })

//         setAllVideoList(result)
//         setPaginatedVideos(result, 0)

//         const isPendingVideo = result?.find((item) => item.status == 'pending')
//         isPendingVideo && GetPedingVideoStatus(isPendingVideo)

//         setLoading(false)
//     }

//     const setPaginatedVideos = (videos, page) => {
//         const start = page * pageSize
//         setVideoList(videos.slice(start, start + pageSize))
//     }

//     const handlePageChange = (newIndex) => {
//         setPageIndex(newIndex)
//         setPaginatedVideos(allVideoList, newIndex)
//     }

//     const GetPedingVideoStatus = (pendingVideo) => {
//         const intervalId = setInterval(async () => {
//             // Get Video Data By ID
//             const result = await convex.query(api.videoData.GetVideoById, {
//                 videoId: pendingVideo?._id
//             })

//             if (result?.status == 'completed') {
//                 clearInterval(intervalId)
//                 console.log("Video Completed")
//                 GetUserVideoList()
//             }

//             console.log("Still Pending...")
//         }, 5000)
//     }

//     return (
//         <div>
//             {loading ? (
//                 <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
//                     {[1, 2, 3, 4, 5].map((_, index) => (
//                         <FeatureMotionWrapper key={index} index={index}>
//                             <div className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg aspect-[2/3]" />
//                         </FeatureMotionWrapper>
//                     ))}
//                 </div>
//             ) : allVideoList?.length == 0 ? (
//                 <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border-2 border-indigo-600 rounded-xl py-16'>
//                     <Image src={'/logo.svg'} alt='Logo' height={60} width={60} />
//                     <h2 className='text-gray-200 text-lg'>You Dont Have Any Videos Created, Create A New One...</h2>
//                     <Link href="/create-new-video">
//                         <Button variant="sex2">+Create New Video</Button>
//                     </Link>
//                 </div>
//             ) : (
//                 <>
//                     <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
//                         {videoList?.map((video, index) => (
//                             <FeatureMotionWrapper key={index} index={index}>
//                                 <Link href={'/play-video/' + video?._id}>
//                                     <div className='relative'>
//                                         {video?.status == 'completed' ? <Image
//                                             className='rounded-lg w-full object-cover aspect-[2/3]'
//                                             src={video?.images[0]} alt='Images' height={500} width={500} /> :
//                                             <div className='aspect-[2/3] p-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-900 to-black flex items-center justify-center gap-3'>
//                                                 <ContinuousSmokeEffect />
//                                                 <div className='gradient-background2 z-10 p-2 rounded-lg flex gap-3'>
//                                                     <RefreshCcw className='animate-spin h-10 w-10 text-teal-500' />
//                                                     <h2 className='text-xl font-bold zoom gradient-title overflow-hidden text-ellipsis w-full'>
//                                                         Generating...
//                                                     </h2>
//                                                 </div>
//                                             </div>
//                                         }
//                                         <div className='absolute bottom-0 w-full gradient-background2 rounded-b-xl'>
//                                             <h2 className='text-white font-bold text-center'>{video?.title}</h2>
//                                             <h2 className='text-white text-sm text-center'>{moment(video?._creationTime).fromNow()}</h2>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </FeatureMotionWrapper>
//                         ))}
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="flex justify-between mt-5">
//                         {pageIndex > 0 && (
//                             <Button variant="sex1" onClick={() => handlePageChange(pageIndex - 1)}>
//                                 Previous Page
//                             </Button>
//                         )}
//                         {allVideoList.length > (pageIndex + 1) * pageSize && (
//                             <Button variant="sex1" onClick={() => handlePageChange(pageIndex + 1)}>
//                                 Next Page
//                             </Button>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     )
// }

// export default VideoList



"use client"

import ContinuousSmokeEffect from '@/app/_components/FramerMotion/ContinuousSmokeEffect'
import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { RefreshCcw, Share2 } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa"
import { HiClipboardDocumentCheck } from "react-icons/hi2"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function VideoList() {
    const [allVideoList, setAllVideoList] = useState([])
    const [videoList, setVideoList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageIndex, setPageIndex] = useState(0)
    const pageSize = 5 // Number of videos per page
    const convex = useConvex()
    const { user } = useAuthContext()

    useEffect(() => {
        user && GetUserVideoList()
    }, [user])

    const GetUserVideoList = async () => {
        setLoading(true)
        // All Users Videos
        const result = await convex.query(api.videoData.GetUserVideos, {
            uid: user?._id
        })
        setAllVideoList(result)
        setPaginatedVideos(result, 0)
        const isPendingVideo = result?.find((item) => item.status == 'pending')
        isPendingVideo && GetPedingVideoStatus(isPendingVideo)
        setLoading(false)
    }

    const setPaginatedVideos = (videos, page) => {
        const start = page * pageSize
        setVideoList(videos.slice(start, start + pageSize))
    }

    const handlePageChange = (newIndex) => {
        setPageIndex(newIndex)
        setPaginatedVideos(allVideoList, newIndex)
    }

    const GetPedingVideoStatus = (pendingVideo) => {
        const intervalId = setInterval(async () => {
            // Get Video Data By ID
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: pendingVideo?._id
            })
            if (result?.status == 'completed') {
                clearInterval(intervalId)
                console.log("Video Completed")
                GetUserVideoList()
            }
            console.log("Still Pending...")
        }, 5000)
    }

    const copyToClipboard = async (videoId) => {
        const videoUrl = `${window.location.origin}/play-video/${videoId}`
        await navigator.clipboard.writeText(videoUrl)
        alert("Video URL copied!")
    }

    return (
        <div>
            {loading ? (
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg aspect-[2/3]" />
                        </FeatureMotionWrapper>
                    ))}
                </div>
            ) : allVideoList?.length == 0 ? (
                <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border-2 border-indigo-600 rounded-xl py-16'>
                    <Image src={'/logo.svg'} alt='Logo' height={60} width={60} />
                    <h2 className='text-gray-200 text-lg'>You Dont Have Any Videos Created, Create A New One...</h2>
                    <Link href="/create-new-video">
                        <Button variant="sex2">+Create New Video</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
                        {videoList?.map((video, index) => (
                            <FeatureMotionWrapper key={index} index={index}>
                                <div className='relative'>
                                    <Link href={'/play-video/' + video?._id}>
                                        <div className='relative'>
                                            {video?.status == 'completed' ? <Image
                                                className='rounded-lg w-full object-cover aspect-[2/3]'
                                                src={video?.images[0]} alt='Images' height={500} width={500} /> :
                                                <div className='aspect-[2/3] p-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-900 to-black flex items-center justify-center gap-3'>
                                                    <ContinuousSmokeEffect />
                                                    <div className='gradient-background2 z-10 p-2 rounded-lg flex gap-3'>
                                                        <RefreshCcw className='animate-spin h-10 w-10 text-teal-500' />
                                                        <h2 className='text-xl font-bold zoom gradient-title overflow-hidden text-ellipsis w-full'>
                                                            Generating...
                                                        </h2>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </Link>

                                    {/* Share Button - On all videos */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="absolute top-2 right-2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition-all">
                                                <Share2 className="h-5 w-5 text-white" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-3">
                                            <div className="flex flex-col gap-3">
                                                <p className="text-sm font-medium">Share this video</p>
                                                <div className="flex items-center gap-2">
                                                    <FacebookShareButton url={`${window.location.origin}/play-video/${video?._id}`}>
                                                        <FaFacebook className="text-blue-600 h-6 w-6 cursor-pointer" />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton url={`${window.location.origin}/play-video/${video?._id}`}>
                                                        <FaTwitter className="text-blue-400 h-6 w-6 cursor-pointer" />
                                                    </TwitterShareButton>
                                                    <WhatsappShareButton url={`${window.location.origin}/play-video/${video?._id}`}>
                                                        <FaWhatsapp className="text-green-500 h-6 w-6 cursor-pointer" />
                                                    </WhatsappShareButton>
                                                    <LinkedinShareButton url={`${window.location.origin}/play-video/${video?._id}`}>
                                                        <FaLinkedin className="text-blue-700 h-6 w-6 cursor-pointer" />
                                                    </LinkedinShareButton>
                                                    <HiClipboardDocumentCheck
                                                        className="text-yellow-500 h-6 w-6 cursor-pointer"
                                                        onClick={() => copyToClipboard(video?._id)}
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <div className='absolute bottom-0 w-full gradient-background2 rounded-b-xl'>
                                        <h2 className='text-white font-bold text-center'>{video?.title}</h2>
                                        <h2 className='text-white text-sm text-center'>{moment(video?._creationTime).fromNow()}</h2>
                                    </div>
                                </div>
                            </FeatureMotionWrapper>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-5">
                        {pageIndex > 0 && (
                            <Button variant="sex1" onClick={() => handlePageChange(pageIndex - 1)}>
                                Previous Page
                            </Button>
                        )}
                        {allVideoList.length > (pageIndex + 1) * pageSize && (
                            <Button variant="sex1" onClick={() => handlePageChange(pageIndex + 1)}>
                                Next Page
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default VideoList