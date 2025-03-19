import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionComposition({ videoData }) {
    const captions = videoData?.captionJson;
    const { fps } = useVideoConfig();
    const imageList = videoData?.images;
    const frame = useCurrentFrame();

    useEffect(() => {
        videoData && getDurationFrame();
    }, [videoData]);

    const getDurationFrame = () => {
        const totalDuration = captions?.[captions.length - 1]?.end * fps;
        // setDurationInFrame(totalDuration);
        return totalDuration;
    };

    // ✅ Move getCurrentCaption outside of .map()
    const getCurrentCaption = () => {
        const currentTime = frame / fps; // Make sure to use fps from useVideoConfig()
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

    return (
        <div>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const startTime = (index * getDurationFrame()) / imageList?.length;
                    const duration = getDurationFrame();

                    const scale = (index) =>
                        interpolate(
                            frame,
                            [startTime, startTime + duration / 2, startTime + duration],
                            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                    return (
                        <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
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