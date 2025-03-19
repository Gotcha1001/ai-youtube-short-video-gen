// import React, { useEffect } from 'react';
// import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

// function RemotionComposition({ videoData }) {
//     const captions = videoData?.captionJson;
//     const { fps } = useVideoConfig();
//     const imageList = videoData?.images;
//     const frame = useCurrentFrame();

//     useEffect(() => {
//         videoData && getDurationFrame();
//     }, [videoData]);

//     const getDurationFrame = () => {
//         const totalDuration = captions?.[captions.length - 1]?.end * fps;
//         // setDurationInFrame(totalDuration);
//         return totalDuration;
//     };

//     // ✅ Move getCurrentCaption outside of .map()
//     const getCurrentCaption = () => {
//         const currentTime = frame / fps; // Make sure to use fps from useVideoConfig()
//         const currentCaption = captions?.find(
//             (item) => currentTime >= item?.start && currentTime <= item?.end
//         );
//         return currentCaption ? capitalizeEveryWord(currentCaption?.word) : '';
//     };

//     // Function to capitalize every word in a sentence
//     const capitalizeEveryWord = (text) => {
//         if (!text) return '';
//         return text.split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');
//     };

//     return (
//         <div>
//             <AbsoluteFill>
//                 {imageList?.map((item, index) => {
//                     const startTime = (index * getDurationFrame()) / imageList?.length;
//                     const duration = getDurationFrame();

//                     const scale = (index) =>
//                         interpolate(
//                             frame,
//                             [startTime, startTime + duration / 2, startTime + duration],
//                             index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
//                             { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                         );

//                     return (
//                         <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
//                             <AbsoluteFill>
//                                 <Img
//                                     src={item}
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover',
//                                         borderRadius: '5%',
//                                         transform: `scale(${scale(index)})`
//                                     }}
//                                 />
//                             </AbsoluteFill>
//                         </Sequence>
//                     );
//                 })}

//                 {/* Text positioned at the top */}
//                 <AbsoluteFill className="bubble-text-container">
//                     <div className="bubble-text">
//                         <h2>{getCurrentCaption()}</h2>
//                     </div>
//                 </AbsoluteFill>
//             </AbsoluteFill>
//             {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
//         </div>
//     );
// }

// export default RemotionComposition;


// import React, { useEffect } from 'react';
// import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

// function RemotionComposition({ videoData }) {
//     const captions = videoData?.captionJson;
//     const { fps } = useVideoConfig();
//     const imageList = videoData?.images;
//     const frame = useCurrentFrame();

//     // Calculate duration once and memoize the result
//     const getDurationFrame = () => {
//         if (!captions || captions.length === 0) {
//             console.log("No captions found, using default duration");
//             return 200; // Default duration if no captions
//         }

//         const lastCaption = captions[captions.length - 1];
//         const totalDuration = Math.ceil(lastCaption.end * fps);

//         console.log("RemotionComposition - Duration calculation:", {
//             lastCaptionEnd: lastCaption.end,
//             fps,
//             calculatedDuration: totalDuration
//         });

//         return totalDuration;
//     };

//     // ✅ Move getCurrentCaption outside of .map()
//     const getCurrentCaption = () => {
//         const currentTime = frame / fps; // Make sure to use fps from useVideoConfig()
//         const currentCaption = captions?.find(
//             (item) => currentTime >= item?.start && currentTime <= item?.end
//         );
//         return currentCaption ? capitalizeEveryWord(currentCaption?.word) : '';
//     };

//     // Function to capitalize every word in a sentence
//     const capitalizeEveryWord = (text) => {
//         if (!text) return '';
//         return text.split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');
//     };

//     // Calculate the total duration once
//     const totalDuration = getDurationFrame();

//     return (
//         <div>
//             <AbsoluteFill>
//                 {imageList?.map((item, index) => {
//                     const startTime = Math.floor((index * totalDuration) / imageList?.length);
//                     const duration = totalDuration;

//                     const scale = (index) =>
//                         interpolate(
//                             frame,
//                             [startTime, startTime + duration / 2, startTime + duration],
//                             index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
//                             { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                         );

//                     return (
//                         <Sequence key={index} from={startTime} durationInFrames={duration}>
//                             <AbsoluteFill>
//                                 <Img
//                                     src={item}
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover',
//                                         borderRadius: '5%',
//                                         transform: `scale(${scale(index)})`
//                                     }}
//                                 />
//                             </AbsoluteFill>
//                         </Sequence>
//                     );
//                 })}

//                 {/* Text positioned at the top */}
//                 <AbsoluteFill className="bubble-text-container">
//                     <div className="bubble-text">
//                         <h2>{getCurrentCaption()}</h2>
//                     </div>
//                 </AbsoluteFill>
//             </AbsoluteFill>
//             {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
//         </div>
//     );
// }

// export default RemotionComposition;




// import React, { useEffect } from 'react';
// import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

// function RemotionComposition({ videoData }) {
//     const captions = videoData?.captionJson;
//     const { fps, durationInFrames } = useVideoConfig();

//     console.log("🎬 RemotionComposition - Duration:", durationInFrames); // Debugging

//     const imageList = videoData?.images;
//     const frame = useCurrentFrame();

//     // Calculate duration once and memoize the result
//     const getDurationFrame = () => {
//         if (!captions || captions.length === 0) {
//             console.log("No captions found, using default duration");
//             return 200; // Default duration if no captions
//         }

//         const lastCaption = captions[captions.length - 1];
//         const totalDuration = Math.ceil(lastCaption.end * fps);

//         console.log("RemotionComposition - Duration calculation:", {
//             lastCaptionEnd: lastCaption.end,
//             fps,
//             calculatedDuration: totalDuration
//         });

//         return totalDuration;
//     };

//     // ✅ Move getCurrentCaption outside of .map()
//     const getCurrentCaption = () => {
//         const currentTime = frame / fps; // Make sure to use fps from useVideoConfig()
//         const currentCaption = captions?.find(
//             (item) => currentTime >= item?.start && currentTime <= item?.end
//         );
//         return currentCaption ? capitalizeEveryWord(currentCaption?.word) : '';
//     };

//     // Function to capitalize every word in a sentence
//     const capitalizeEveryWord = (text) => {
//         if (!text) return '';
//         return text.split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');
//     };

//     // Calculate the total duration once
//     const totalDuration = getDurationFrame();

//     return (
//         <div>
//             <AbsoluteFill>
//                 {imageList?.map((item, index) => {
//                     const startTime = Math.floor((index * totalDuration) / imageList?.length);
//                     const duration = totalDuration;

//                     const scale = (index) =>
//                         interpolate(
//                             frame,
//                             [startTime, startTime + duration / 2, startTime + duration],
//                             index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
//                             { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                         );

//                     return (
//                         <Sequence key={index} from={startTime} durationInFrames={duration}>
//                             <AbsoluteFill>
//                                 <Img
//                                     src={item}
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover',
//                                         borderRadius: '5%',
//                                         transform: `scale(${scale(index)})`
//                                     }}
//                                 />
//                             </AbsoluteFill>
//                         </Sequence>
//                     );
//                 })}

//                 {/* Text positioned at the top */}
//                 <AbsoluteFill className="bubble-text-container">
//                     <div className="bubble-text">
//                         <h2>{getCurrentCaption()}</h2>
//                     </div>
//                 </AbsoluteFill>
//             </AbsoluteFill>
//             {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
//         </div>
//     );
// }

// export default RemotionComposition;



import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionComposition({ videoData }) {
    const captions = videoData?.captionJson;
    const { fps, durationInFrames } = useVideoConfig();
    console.log("🎬 RemotionComposition - Duration:", durationInFrames); // Debugging

    const imageList = videoData?.images;
    const frame = useCurrentFrame();

    // Calculate duration once and memoize the result
    const getDurationFrame = () => {
        // If we have predefined duration in videoData, use that
        if (typeof videoData?.durationInFrames === 'number') {
            return videoData.durationInFrames;
        }

        // Otherwise calculate from captions
        if (!captions || captions.length === 0) {
            console.log("No captions found, using default duration");
            return 360; // Default duration if no captions
        }

        const lastCaption = captions[captions.length - 1];
        const totalDuration = Math.ceil(lastCaption.end * fps);

        console.log("RemotionComposition - Duration calculation:", {
            lastCaptionEnd: lastCaption.end,
            fps,
            calculatedDuration: totalDuration
        });

        return totalDuration;
    };

    // Get current caption
    const getCurrentCaption = () => {
        const currentTime = frame / fps;
        const currentCaption = captions?.find(
            (item) => currentTime >= item?.start && currentTime <= item?.end
        );

        return currentCaption ? capitalizeEveryWord(currentCaption?.word) : '';
    };

    // Function to capitalize every word in a sentence
    const capitalizeEveryWord = (text) => {
        if (!text) return '';
        return text.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Calculate the total duration once
    const totalDuration = getDurationFrame();

    return (
        <div>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const startTime = Math.floor((index * totalDuration) / imageList?.length);
                    const duration = totalDuration;
                    const scale = (index) =>
                        interpolate(
                            frame,
                            [startTime, startTime + duration / 2, startTime + duration],
                            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                    return (
                        <Sequence key={index} from={startTime} durationInFrames={duration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5%',
                                        transform: `scale(${scale(index)})`
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}
                {/* Text positioned at the top */}
                <AbsoluteFill className="bubble-text-container">
                    <div className="bubble-text">
                        <h2>{getCurrentCaption()}</h2>
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>
            {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
        </div>
    );
}

export default RemotionComposition;