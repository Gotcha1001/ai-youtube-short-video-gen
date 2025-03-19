"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MotionWrapperDelay = ({
    children,
    initial,
    whileInView,
    viewport,
    transition,
    variants,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current; // Local variable to capture current ref

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Reset visibility when element leaves viewport
                    setIsVisible(false);
                }
            },
            {
                threshold: viewport?.amount || 0.1, // Use provided threshold or default to 10%
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup observer on component unmount
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [viewport]); // Include viewport in dependencies

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isVisible ? whileInView : initial}
            viewport={viewport}
            transition={transition}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapperDelay;