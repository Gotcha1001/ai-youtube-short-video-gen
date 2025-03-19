import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect';

const voiceOptions = [

    {
        "value": "af_sky",
        "name": "Sky (Female)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "am_adam",
        "name": "Adam (Male)",
        "flag": "https://flagcdn.com/w40/us.png"
    },

    {
        "value": "af_sarah",
        "name": "Sarah (Female)",
        "flag": "https://flagcdn.com/w40/in.png"
    },
    {
        "value": "am_echo",
        "name": "Echo (Male)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "am_michael",
        "name": "Michael (Male)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "aura-stella-en",
        "name": "Stella (Female)",
        "flag": "https://flagcdn.com/w40/in.png"
    },
    {
        "value": "hf_alpha",
        "name": "Alpha (Female)",
        "flag": "https://flagcdn.com/w40/in.png"
    },
    {
        "value": "hf_beta",
        "name": "Beta (Female)",
        "flag": "https://flagcdn.com/w40/in.png"
    },
    {
        "value": "am_onyx",
        "name": "Onyx (Male)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "af_nicole",
        "name": "Nicole (Female)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "af_river",
        "name": "River (Female)",
        "flag": "https://flagcdn.com/w40/us.png"
    },
    {
        "value": "bm_fable",
        "name": "Fable (Male)",
        "flag": "https://flagcdn.com/w40/gb.png"

    },
];

function Voice({ onHandleInputChange }) {
    const [selectedVoice, setSelectedVoice] = useState();
    const [showSmoke, setShowSmoke] = useState(false);

    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice.name);
        onHandleInputChange('voice', voice.value);

        // Trigger smoke effect
        setShowSmoke(true);

        // Reset smoke effect after it completes
        setTimeout(() => {
            setShowSmoke(false);
        }, 7500); // slightly longer than the smoke effect duration (7000ms)
    };

    return (
        <div className="mt-5 text-center relative">
            <SmokeEffect isVisible={showSmoke} />
            <h2 className="text-4xl gradient-title">Video Voice</h2>
            <p className="text-gray-400 text-sm mb-3">Select The Voice For Your Video</p>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {voiceOptions.map((voice, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div
                                className={`p-3 rounded-lg transition-all bg-slate-900 duration-300 cursor-pointer
                                flex items-center gap-2
                                ${selectedVoice === voice.name
                                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-lg hover:border-2 hover:border-white"
                                        : "bg-gray-100 hover:bg-gray-200 hover:border-2 hover:border-indigo-500"
                                    }`}
                                onClick={() => handleVoiceSelect(voice)}
                            >
                                <img src={voice.flag} alt="Flag" width="24" height="18" />
                                <h2 className={selectedVoice === voice.name ? "text-black" : "text-indigo-500"}>
                                    {voice.name}
                                </h2>
                            </div>
                        </FeatureMotionWrapper>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default Voice