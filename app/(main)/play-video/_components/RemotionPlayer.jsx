"use client"
import React, { useState, useEffect } from 'react'
import { Player } from "@remotion/player";
import RemotionComposition from '@/app/_components/RemotionComposition';
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect';

function RemotionPlayer({ videoData }) {
    // const [durationInFrames, setDurationInFrames] = useState(100)

    // Define dimensions consistently for the composition
    const compositionWidth = 720;
    const compositionHeight = 1280;

    return (
        <div className="w-full flex justify-center items-center relative">
            <div className="w-full md:w-4/5 lg:w-3/5 relative  rounded-lg ">
                <Player className=''
                    component={RemotionComposition}
                    durationInFrames={videoData?.captionJson ? Number((videoData?.captionJson?.[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0)) : 200}
                    compositionWidth={compositionWidth}
                    compositionHeight={compositionHeight}
                    fps={30}
                    controls
                    style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: `${compositionWidth}/${compositionHeight}`,
                        maxHeight: '78vh',
                    }}
                    inputProps={{
                        videoData: videoData,
                        // setDurationInFrame: (frameValue) => setDurationInFrames(frameValue)
                    }}
                />
            </div>
            <div className="absolute inset-0 pointer-events-none">
                <SmokeEffect isVisible={true} />
            </div>
        </div>
    )
}

export default RemotionPlayer