"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, SparkleIcon } from 'lucide-react'
import axios from 'axios'
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect'
import { toast } from 'sonner'
import { useAuthContext } from '@/app/provider'

const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventure",
    "Science Experiments",
    "Motivational Stories"
]

function Topic({ onHandleInputChange }) {
    const [selectedTopic, setSelectedTopic] = useState()
    const [scripts, setScripts] = useState()
    const [loading, setLoading] = useState(false)
    const [selectScriptIndex, setSelectedScriptIndex] = useState()
    const [smokeKey, setSmokeKey] = useState(0) // Key to re-trigger SmokeEffect


    const { user } = useAuthContext()

    const GenerateScript = async () => {


        if (user?.credits <= 0) {
            toast('Please Add More Credits...')
        }

        setLoading(true)
        setSelectedScriptIndex(null)
        try {
            const result = await axios.post('/api/generate-script', {
                topic: selectedTopic
            })
            console.log(result.data)
            setScripts(result.data?.scripts)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }



    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic)
        onHandleInputChange('topic', topic)
        setSmokeKey(prevKey => prevKey + 1) // Change key to re-trigger smoke effect
    }

    return (
        <div className="relative ">
            {/* Re-trigger SmokeEffect when smokeKey changes */}
            <SmokeEffect key={smokeKey} isVisible={true} />

            <h2 className=' text-white mb-4 text-5xl gradient-title text-center'>Project Title</h2>
            <Input
                onChange={(event) => onHandleInputChange('title', event?.target.value)}
                placeholder="Enter Project Title"
            />

            <div className='mt-5 border rounded-xl p-4'>
                <h2 className='text-white text-4xl gradient-title text-center'>Video Topic</h2>
                <p className='text-sm text-gray-300 text-center mt-2'>Select Topic For Your Video</p>

                <Tabs defaultValue="suggestion" className="w-full mt-4">
                    <TabsList>
                        <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="suggestion">
                        <div className=''>
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleTopicSelection(suggestion)}
                                    variant="secondary"
                                    className={`m-1 ${suggestion === selectedTopic ? "bg-primary" : ""}`}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="your_topic">
                        <div>
                            <h2 className="text-white">Enter Your Own Topic</h2>
                            <Textarea
                                placeholder="Enter Your Topic"
                                onChange={(event) => handleTopicSelection(event.target.value)}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length > 0 &&
                    <div>
                        <h2 className='text-white mt-3 text-center'>Select The Preferred Script</h2>
                        <div className='grid grid-cols-2 gap-5'>
                            {scripts?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-3 border rounded-xl mt-4 bg-black cursor-pointer
                                        ${selectScriptIndex == index && 'border-white bg-gradient-to-r from-indigo-500 via-teal-500 to-black'}`}
                                    onClick={() => {
                                        setSelectedScriptIndex(index)
                                        onHandleInputChange('script', item?.content)
                                    }}
                                >
                                    <h2 className='line-clamp-4 text-sm text-gray-300'>{item.content}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>

            <div className="flex justify-center mt-5">
                {!scripts && (
                    <Button
                        disabled={loading}
                        onClick={GenerateScript}
                        className="size-sm"
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <SparkleIcon />} Generate Script
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Topic
