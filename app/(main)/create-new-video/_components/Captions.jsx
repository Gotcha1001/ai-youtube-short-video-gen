// import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
// import React, { useState } from 'react'

// const options = [
//     {
//         name: "Youtuber",
//         style: 'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-yellow-900'
//     },
//     {
//         name: "Supreme",
//         style: 'text-white text-3xl font-bold italic tracking-wide drop-shadow-lg uppercase px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-red-900'
//     },
//     {
//         name: "Neon",
//         style: 'text-green-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-green-900'
//     },
//     {
//         name: "Glitch",
//         style: 'text-pink-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-pink-900'
//     },
//     {
//         name: "Fire",
//         style: 'text-red-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-red-900'
//     },
//     {
//         name: "Futuristic",
//         style: 'text-blue-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
//         background: 'bg-gradient-to-r from-gray-900 to-blue-900'
//     },
// ]

// function Captions({ onHandleInputChange }) {
//     const [selectedCaptionStyle, setSelectedCaptionStyle] = useState();


//     return (
//         <div className="mt-5 border p-4 rounded-xl">
//             <h2 className="text-4xl gradient-title text-center">Captions Style</h2>
//             <p className="text-gray-300 text-sm text-center mb-3">Select Caption Style</p>

//             <div className="flex flex-wrap gap-4">
//                 {options.map((option, index) => (
//                     <FeatureMotionWrapper key={index} index={index}>
//                         <div
//                             className={`
//                                 ${option.background} p-1 overflow-hidden rounded-xl cursor-pointer transition-all duration-300
//                                 ${selectedCaptionStyle === option.name ? 'ring-2 ring-white shadow-lg scale-105' : 'hover:ring-2 hover:ring-indigo-400 hover:scale-102'}
//                             `}
//                             onClick={() => {
//                                 onHandleInputChange(option)
//                                 setSelectedCaptionStyle(option.name)
//                             }}
//                         >
//                             <h2 className={option.style}>{option.name}</h2>
//                         </div>
//                     </FeatureMotionWrapper>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Captions

import React, { useState } from 'react'
import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect'

const options = [
    {
        name: "Youtuber",
        style: 'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-yellow-900'
    },
    {
        name: "Supreme",
        style: 'text-white text-3xl font-bold italic tracking-wide drop-shadow-lg uppercase px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-red-900'
    },
    {
        name: "Neon",
        style: 'text-green-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-green-900'
    },
    {
        name: "Glitch",
        style: 'text-pink-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-pink-900'
    },
    {
        name: "Fire",
        style: 'text-red-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-red-900'
    },
    {
        name: "Futuristic",
        style: 'text-blue-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg px-3 py-1 rounded-lg',
        background: 'bg-gradient-to-r from-gray-900 to-blue-900'
    },
]

function Captions({ onHandleInputChange }) {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState()
    const [smokeKey, setSmokeKey] = useState(0) // Key to re-trigger SmokeEffect

    const handleCaptionSelection = (option) => {
        setSelectedCaptionStyle(option.name)
        onHandleInputChange('caption', option)
        setSmokeKey(prevKey => prevKey + 1) // Change key to re-trigger smoke effect
    }

    return (
        <div className="relative mt-5 border p-3 rounded-xl ">
            {/* Smoke effect re-triggers when `smokeKey` changes */}
            <SmokeEffect key={smokeKey} isVisible={true} />

            <h2 className="text-3xl gradient-title text-center">Captions Style</h2>
            <p className="text-gray-300 text-sm text-center mb-3">Select Caption Style</p>

            <div className="flex flex-wrap gap-4 justify-center">
                {options.map((option, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div
                            className={`
                                ${option.background} p-1 overflow-hidden rounded-xl cursor-pointer transition-all duration-300
                                ${selectedCaptionStyle === option.name ? 'ring-2 ring-white shadow-lg scale-105' : 'hover:ring-2 hover:ring-indigo-400 hover:scale-102'}
                            `}
                            onClick={() => handleCaptionSelection(option)}
                        >
                            <h2 className={option.style}>{option.name}</h2>
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default Captions
