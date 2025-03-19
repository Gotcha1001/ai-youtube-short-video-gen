import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

export const options = [
    {
        name: 'Realistic',
        image: '/real.jpg'
    },
    {
        name: 'Cinematic',
        image: '/cinematic.jpg'
    },
    {
        name: 'Gothic',
        image: '/gothic.jpg'
    },
    {
        name: 'Watercolor',
        image: '/watercolor1.jpg'
    },
    {
        name: 'CyberPunk',
        image: '/cyberpunk.jpg'
    },
    {
        name: 'Anime',
        image: '/anime.jpg'
    },
    {
        name: 'GTA',
        image: '/gta.jpg'
    },
    {
        name: '3D Cartoon',
        image: '/3d.jpg'
    },
    {
        name: 'Comic',
        image: '/comic.jpg'
    },
    {
        name: 'Cartoon',
        image: '/cartoon1.jpg'
    },
]

function VideoStyle({ onHandleInputChange }) {
    const [selectedStyle, setSelectedStyle] = useState()
    // Use a key to force the SmokeEffect to remount
    const [smokeKey, setSmokeKey] = useState(0)

    const handleStyleClick = (option) => {
        setSelectedStyle(option.name)
        onHandleInputChange('videoStyle', option.name)

        // Increment the key to force the SmokeEffect component to remount
        setSmokeKey(prevKey => prevKey + 1)
    }

    return (
        <div className='mt-5 relative border rounded-xl p-4  '>
            {/* Key prop forces component to remount when it changes */}
            <SmokeEffect key={smokeKey} isVisible={true} />

            <h2 className='font-bold text-4xl gradient-title text-center ' >Video Styles</h2>
            <p className='text-sm text-gray-300 text-center mb-3'>Select Video Style</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 '>
                {options?.map((option, index) => (
                    <FeatureMotionWrapper key={index} index={index}>

                        <div
                            className="relative"
                            onClick={() => handleStyleClick(option)}
                        >
                            <Image
                                className={`aspect-video h-[400px] md:h-[200px] lg:h-[230px] xl:h-[250px] rounded-xl hover:border border-indigo-500 cursor-pointer 
                                    ${option.name == selectedStyle && 'border-2 border-indigo-500'} `}
                                src={option.image}
                                alt='Images'
                                height={120}
                                width={500}
                            />
                            <h2
                                className={`
                                    absolute 
                                    p-1 
                                    gradient-background2 
                                    bottom-0 
                                    rounded-b-xl 
                                    w-full 
                                    text-center 
                                    font-bold 
                                    ${selectedStyle === option.name ? 'text-indigo-500' : 'text-white'}
                                `}
                            >
                                {option.name}
                            </h2>
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default VideoStyle