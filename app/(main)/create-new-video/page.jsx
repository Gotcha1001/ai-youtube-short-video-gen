"use client"
import React, { useEffect, useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle'
import Voice from './_components/Voice'
import Captions from './_components/Captions'
import { Button } from '@/components/ui/button'
import { Loader2Icon, WandSparkles } from 'lucide-react'
import Preview from './_components/Preview'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAuthContext } from '@/app/provider'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


function CreateNewVideo() {

  const [formData, setFormData] = useState()
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData)
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  useEffect(() => {
    console.log("Updated FORMDATA:", formData);
  }, [formData]);


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
    console.log("Updated Field:", fieldName, fieldValue);
  }

  const GenerateVideo = async () => {
    //check if all the stuff is there

    if (user?.credits <= 0) {
      toast('Please Add More Credits...')
    }

    if (!formData?.topic || !formData?.script || !formData?.videoStyle || !formData?.caption || !formData?.voice) {
      console.log("ERROR:", "Enter All Fields")
      return;
    }
    setLoading(true)

    // Save Video Data First
    const resp = await CreateInitialVideoRecord({
      title: formData.title,
      topic: formData.topic,
      script: formData.script,
      videoStyle: formData.videoStyle,
      caption: formData.caption,
      voice: formData.voice,
      uid: user?._id,
      createdBy: user?.email,
      credits: user?.credits
    })
    console.log("RESP🍄:", resp)

    const result = await axios.post('/api/generate-video-data', {
      ...formData,
      recordId: resp,
    })
    console.log("RESULT☘️☘️:", result)
    setLoading(false)

    // ✅ Redirect to the dashboard
    router.push("/dashboard");
  }

  return (
    <div>
      <h2 className='font-bold text-4xl gradient-title'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-7'>
        <div className='col-span-2 p-7 border rounded-xl gradient-background2 h-[80vh] overflow-auto'>
          {/* Topic and script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          {/* Voice */}
          <Voice onHandleInputChange={onHandleInputChange} />

          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange} />
          <Button
            disabled={loading}
            onClick={GenerateVideo}
            variant="sex2" className="w-full mt-5">{loading ? < Loader2Icon className='animate-spin' /> : <WandSparkles />}Generate Video</Button>
        </div>
        <div>
          <Preview formData={formData} />

        </div>
      </div>


    </div>
  )
}

export default CreateNewVideo