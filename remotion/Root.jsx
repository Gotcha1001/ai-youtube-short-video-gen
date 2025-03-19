import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import RemotionComposition from './../app/_components/RemotionComposition';

const videoData = {
    audioUrl: '',
    captionJson: [
        {
            confidence: 0.9955472,
            end: 0.79999995,
            start: 0.48,
            word: "lost",
        },
        {
            confidence: 0.9781226,
            end: 1.04,
            start: 0.79999995,
            word: "and",
        },
        {
            confidence: 0.98142415,
            end: 1.68,
            start: 1.04,
            word: "adrift",
        },
        {
            confidence: 0.99812454,
            end: 1.8399999,
            start: 1.68,
            word: "a",
        },
        {
            confidence: 0.9999238,
            end: 2,
            start: 1.8399999,
            word: "boy",
        },
        {
            confidence: 0.9997911,
            end: 2.32,
            start: 2,
            word: "felt",
        },
        {
            confidence: 0.9996475,
            end: 2.6399999,
            start: 2.32,
            word: "life",
        },
        {
            confidence: 0.99972284,
            end: 3.04,
            start: 2.6399999,
            word: "lacked",
        },
        {
            confidence: 0.9675314,
            end: 3.6799998,
            start: 3.04,
            word: "meaning",
        },
        {
            confidence: 0.99988127,
            end: 4,
            start: 3.76,
            word: "he",
        },
        {
            confidence: 0.9996406,
            end: 4.3199997,
            start: 4,
            word: "compared",
        },
        {
            confidence: 0.99989235,
            end: 4.72,
            start: 4.3199997,
            word: "himself",
        },
        {
            confidence: 0.9999285,
            end: 4.88,
            start: 4.72,
            word: "to",
        },
        {
            confidence: 0.9999094,
            end: 5.2,
            start: 4.88,
            word: "others",
        },
        {
            confidence: 0.8027944,
            end: 5.68,
            start: 5.2,
            word: "always",
        },
        {
            confidence: 0.99981755,
            end: 6.08,
            start: 5.68,
            word: "falling",
        },
        {
            confidence: 0.9733001,
            end: 6.8,
            start: 6.08,
            word: "short",
        },
        {
            confidence: 0.9997342,
            end: 7.2799997,
            start: 7.12,
            word: "then",
        },
        {
            confidence: 0.96733576,
            end: 7.44,
            start: 7.2799997,
            word: "he",
        },
        {
            confidence: 0.99995494,
            end: 7.7599998,
            start: 7.44,
            word: "found",
        },
        {
            confidence: 0.99982905,
            end: 8,
            start: 7.7599998,
            word: "joy",
        },
        {
            confidence: 0.99837804,
            end: 8.24,
            start: 8,
            word: "in",
        },
        {
            confidence: 0.99993503,
            end: 8.72,
            start: 8.24,
            word: "small",
        },
        {
            confidence: 0.9543599,
            end: 9.36,
            start: 8.72,
            word: "things",
        },
        {
            confidence: 0.9998498,
            end: 9.679999,
            start: 9.5199995,
            word: "a",
        },
        {
            confidence: 0.998641,
            end: 10.559999,
            start: 9.679999,
            word: "sunset",
        },
        {
            confidence: 0.9999416,
            end: 10.719999,
            start: 10.559999,
            word: "a",
        },
        {
            confidence: 0.99989593,
            end: 11.04,
            start: 10.719999,
            word: "kind",
        },
        {
            confidence: 0.9982753,
            end: 11.44,
            start: 11.04,
            word: "word",
        },
        {
            confidence: 0.9998677,
            end: 12.349937,
            start: 11.949938,
            word: "he",
        },

    ],
    images: ['https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=600'],
}

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id="youtubeShort"
                component={RemotionComposition}
                durationInFrames={Number((videoData?.captionJson?.[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0))}
                fps={30}
                width={720}
                height={1280}
                defaultProps={{
                    videoData: videoData
                }}

            />
        </>
    );
};


// import React from 'react';
// import { Composition } from 'remotion';
// import RemotionComposition from './../app/_components/RemotionComposition';

// // Remove or comment out the hardcoded videoData
// // const videoData = { ... }

// export const RemotionRoot = ({ videoData }) => {
//     // Calculate duration based on input props or use a default duration
//     const durationInFrames = videoData?.captionJson?.length
//         ? Math.ceil((videoData.captionJson[videoData.captionJson.length - 1]?.end || 15) * 30)
//         : 450; // 15 seconds default if no captions provided

//     return (
//         <>
//             <Composition
//                 id="youtubeShort"
//                 component={RemotionComposition}
//                 durationInFrames={durationInFrames}
//                 fps={30}
//                 width={720}
//                 height={1280}
//                 defaultProps={{
//                     videoData: videoData
//                 }}
//             />
//         </>
//     );
// };
