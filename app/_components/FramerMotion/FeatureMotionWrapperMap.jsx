"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FeatureMotionWrapper({ children, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const seedRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const getRandomDirection = (index, min, max) => {
        const seed = seedRandom(index + 42);
        return Math.floor(seed * (max - min + 1)) + min;
    };

    useEffect(() => {
        const currentRef = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{
                x: getRandomDirection(index, -100, 100), // Less distance for snappier effect
                y: getRandomDirection(index, -100, 100),
                opacity: 0,
            }}
            animate={
                isVisible
                    ? { x: 0, y: 0, opacity: 1 }
                    : {
                        x: getRandomDirection(index, -100, 100),
                        y: getRandomDirection(index, -100, 100),
                        opacity: 0,
                    }
            }
            transition={{
                duration: 0.2 + index * 0.1, // Much faster animation
                delay: 0.1 + index * 0.03, // Shorter delay
            }}
        >
            {children}
        </motion.div>
    );
}
