import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle'

function Preview({ formData }) {

    const selectedVideoStyle = formData && options.find((item => item?.name == formData?.videoStyle))

    return formData?.videoStyle && (
        <div className='relative gradient-background2 p-3 rounded-xl'>
            <h2 className='mb-3 text-2xl gradient-title text-center'>Preview</h2>
            <Image
                className="aspect-video 
                h-[500px] w-[500px] 
                md:h-[400px]  md:w-[500px]
                 lg:w-[600px] lg:h-[400px] 
                 xl:w-[1000px] xl:h-[540px] 
                2xl:w-[1000px] 2xl:h-[705px] 
                 rounded-xl"
                src={selectedVideoStyle?.image} alt={selectedVideoStyle?.name} height={500} width={1000} />

            <h2 className={`${formData?.caption?.style} absolute bottom-7 text-center w-full`}>{formData?.caption?.name}</h2>


        </div>
    )
}

export default Preview