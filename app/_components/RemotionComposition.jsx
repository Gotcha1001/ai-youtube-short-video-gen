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
//         // If we have predefined duration in videoData, use that
//         if (typeof videoData?.durationInFrames === 'number') {
//             return videoData.durationInFrames;
//         }

//         // Otherwise calculate from captions
//         if (!captions || captions.length === 0) {
//             console.log("No captions found, using default duration");
//             return 360; // Default duration if no captions
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

//     // Get current caption
//     const getCurrentCaption = () => {
//         const currentTime = frame / fps;
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
//     console.log("🎬 RemotionComposition - Duration from config:", durationInFrames);
//     console.log("🎬 videoData prop:", videoData);

//     const imageList = videoData?.images;
//     const frame = useCurrentFrame();

//     // Calculate duration for image sequences and animations
//     const getTotalDuration = () => {
//         // If the video data has a calculated duration, use that
//         if (videoData?.calculatedDuration) {
//             console.log("Using provided calculatedDuration:", videoData.calculatedDuration);
//             return videoData.calculatedDuration;
//         }

//         // Otherwise calculate from captions or use the durationInFrames from config
//         if (captions && captions.length > 0) {
//             const lastCaption = captions[captions.length - 1];
//             const calculatedDuration = Math.ceil(lastCaption.end * fps);
//             console.log("Calculated duration from captions:", calculatedDuration);
//             return calculatedDuration;
//         }

//         console.log("Using default durationInFrames:", durationInFrames);
//         return durationInFrames;
//     };

//     // Get current caption
//     const getCurrentCaption = () => {
//         if (!captions || captions.length === 0) return '';

//         const currentTime = frame / fps;
//         const currentCaption = captions.find(
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
//     const totalDuration = getTotalDuration();
//     console.log("Final totalDuration being used:", totalDuration);

//     return (
//         <div>
//             <AbsoluteFill>
//                 {imageList?.map((item, index) => {
//                     const imageCount = imageList.length || 1;
//                     const startTime = Math.floor((index * totalDuration) / imageCount);
//                     const imageDuration = Math.ceil(totalDuration / imageCount);

//                     // Use simpler animations for longer videos
//                     const scale = (index) => {
//                         // For longer videos, use simpler animations to avoid performance issues
//                         if (totalDuration > 600) { // Over 20 seconds
//                             return interpolate(
//                                 frame,
//                                 [startTime, startTime + imageDuration],
//                                 [1, 1.1],
//                                 { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                             );
//                         }

//                         // Original animation for shorter videos
//                         return interpolate(
//                             frame,
//                             [startTime, startTime + imageDuration / 2, startTime + imageDuration],
//                             index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
//                             { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                         );
//                     };

//                     return (
//                         <Sequence key={index} from={startTime} durationInFrames={imageDuration}>
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

// import React from 'react';
// import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

// function RemotionComposition({ videoData }) {
//     const captions = videoData?.captionJson;
//     const { fps, durationInFrames } = useVideoConfig();
//     console.log("🎬 RemotionComposition - Duration from config:", durationInFrames);
//     console.log("🎬 videoData prop:", videoData);

//     const imageList = videoData?.images;
//     const frame = useCurrentFrame();

//     // Calculate duration for image sequences and animations
//     const getTotalDuration = () => {
//         // If the video data has a calculated duration, use that
//         if (videoData?.calculatedDuration) {
//             console.log("Using provided calculatedDuration:", videoData.calculatedDuration);
//             return videoData.calculatedDuration;
//         }

//         // Otherwise calculate from captions or use the durationInFrames from config
//         if (captions && captions.length > 0) {
//             const lastCaption = captions[captions.length - 1];
//             const calculatedDuration = Math.ceil(lastCaption.end * fps);
//             console.log("Calculated duration from captions:", calculatedDuration);
//             return calculatedDuration;
//         }

//         console.log("Using default durationInFrames:", durationInFrames);
//         return durationInFrames;
//     };

//     // Get current caption
//     const getCurrentCaption = () => {
//         if (!captions || captions.length === 0) return '';

//         const currentTime = frame / fps;
//         const currentCaption = captions.find(
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
//     const totalDuration = getTotalDuration();
//     console.log("Final totalDuration being used:", totalDuration);

//     // Define bubble text styles directly here to ensure they're applied in exports
//     const bubbleTextStyles = {
//         position: 'absolute',
//         top: '10%',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         color: 'white',
//         padding: '15px 25px',
//         borderRadius: '25px',
//         fontSize: '2rem',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         maxWidth: '80%',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     };

//     return (
//         <div>
//             <AbsoluteFill>
//                 {imageList?.map((item, index) => {
//                     const imageCount = imageList.length || 1;
//                     const startTime = Math.floor((index * totalDuration) / imageCount);
//                     const imageDuration = Math.ceil(totalDuration / imageCount);

//                     // Use simpler animations for longer videos
//                     const scale = (index) => {
//                         // For longer videos, use simpler animations to avoid performance issues
//                         if (totalDuration > 600) { // Over 20 seconds
//                             return interpolate(
//                                 frame,
//                                 [startTime, startTime + imageDuration],
//                                 [1, 1.1],
//                                 { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                             );
//                         }

//                         // Original animation for shorter videos
//                         return interpolate(
//                             frame,
//                             [startTime, startTime + imageDuration / 2, startTime + imageDuration],
//                             index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
//                             { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//                         );
//                     };

//                     return (
//                         <Sequence key={index} from={startTime} durationInFrames={imageDuration}>
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

//                 {/* Text positioned with bubble styling */}
//                 <AbsoluteFill>
//                     <div style={bubbleTextStyles}>
//                         <h2>{getCurrentCaption()}</h2>
//                     </div>
//                 </AbsoluteFill>
//             </AbsoluteFill>

//             {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
//         </div>
//     );
// }

// export default RemotionComposition;


import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionComposition({ videoData }) {
    const captions = videoData?.captionJson;
    const { fps, durationInFrames } = useVideoConfig();
    console.log("🎬 RemotionComposition - Duration from config:", durationInFrames);
    console.log("🎬 videoData prop:", videoData);

    const imageList = videoData?.images;
    const frame = useCurrentFrame();

    // Get current caption
    const getCurrentCaption = () => {
        if (!captions || captions.length === 0) return '';
        const currentTime = frame / fps;
        const currentCaption = captions.find(
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

    // Calculate the total duration (use the explicit one if provided)
    const totalDuration = videoData?.calculatedDuration || durationInFrames;
    console.log("Final totalDuration being used:", totalDuration);

    // Define bubble text styles directly - IMPORTANT: use explicit pixel values
    const bubbleTextStyles = {
        position: 'absolute',
        top: '10%',
        left: '50%',
        width: 'auto',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '25px',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '80%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        display: 'block'
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const imageCount = imageList.length || 1;
                    const startTime = Math.floor((index * totalDuration) / imageCount);
                    const imageDuration = Math.ceil(totalDuration / imageCount);

                    // Simplify animation to ensure it works reliably
                    const scale = () => {
                        return interpolate(
                            frame,
                            [startTime, startTime + imageDuration],
                            [1, 1.1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );
                    };

                    return (
                        <Sequence key={index} from={startTime} durationInFrames={imageDuration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5%',
                                        transform: `scale(${scale()})`
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}

                {/* Text positioned with bubble styling - Use absolute positioning */}
                <AbsoluteFill>
                    <div style={bubbleTextStyles}>
                        {getCurrentCaption()}
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>

            {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
        </div>
    );
}

export default RemotionComposition;