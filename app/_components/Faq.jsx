"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MotionWrapperDelay from './FramerMotion/MotionWrapperDelay';


const faqs = [
    {
        question: "How does the AI YouTube Short Video Generator work?",
        answer: "Our AI analyzes your input and automatically generates scripts, selects fitting images, and creates voiceovers that match your content style. Simply provide a topic or idea, and our AI handles the rest, allowing you to edit and customize before publishing."
    },
    {
        question: "What kind of videos can I create?",
        answer: "You can create a wide variety of short-form videos perfect for YouTube Shorts, including educational content, entertainment clips, product showcases, storytelling videos, and more. The AI adapts to various niches and content styles."
    },
    {
        question: "How long does it take to generate a video?",
        answer: "Most videos are generated within seconds! The AI quickly processes your input to create scripts, source images, and generate voiceovers. You can then make edits and adjustments before finalizing your video."
    },
    {
        question: "Do I need technical skills to use this platform?",
        answer: "Not at all! Our platform is designed to be user-friendly and intuitive. No video editing experience or technical skills are required. The AI handles the complex parts, while you maintain creative control."
    },
    {
        question: "Can I edit the generated content?",
        answer: "Absolutely! While the AI generates the initial content, you have full control to edit scripts, change images, adjust voiceovers, and customize every aspect of your video before publishing."
    }
];

function FAQSection() {
    return (
        <section className="py-20 px-5 gradient-background2">
            <div className="container mx-auto">
                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, y: -50 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <h3 className="text-3xl font-bold mb-12 text-center">
                        Frequently Asked Questions
                    </h3>
                </MotionWrapperDelay>

                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <MotionWrapperDelay
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <AccordionItem className="mb-4 border rounded-lg overflow-hidden" value={`item-${index}`}>
                                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 py-3">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </MotionWrapperDelay>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

export default FAQSection;