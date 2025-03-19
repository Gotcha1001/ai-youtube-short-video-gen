// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Bright white colors
// const smokeColors = [
//     "rgba(255, 255, 255, 0.85)",
//     "rgba(255, 255, 255, 0.8)",
//     "rgba(255, 255, 255, 0.75)",
//     "rgba(254, 254, 254, 0.9)",
//     "rgba(253, 253, 253, 0.95)",
// ];

// // Purple fade colors
// const purpleColors = [
//     "rgba(31, 4, 58, 0.85)",
//     "rgb(34, 4, 66)",
//     "rgba(12, 1, 22, 0.75)",
//     "rgba(110, 38, 187, 0.9)",
//     "rgba(27, 24, 191, 0.95)",
// ];

// function ContinuousSmokeEffect() {
//     const [particles, setParticles] = useState([]);
//     const [smallParticles, setSmallParticles] = useState([]);

//     // Create new particles at regular intervals
//     useEffect(() => {
//         // Generate initial particles
//         generateParticles();
//         generateSmallParticles();

//         // Set up intervals for continuous generation
//         const largeInterval = setInterval(() => {
//             generateParticles();
//         }, 2000); // Create new large particles every 2 seconds

//         const smallInterval = setInterval(() => {
//             generateSmallParticles();
//         }, 1500); // Create new small particles every 1.5 seconds

//         return () => {
//             clearInterval(largeInterval);
//             clearInterval(smallInterval);
//         };
//     }, []);

//     // Function to generate large particles
//     const generateParticles = () => {
//         const newParticles = Array(5).fill(0).map((_, i) => ({
//             id: `smoke-${Date.now()}-${i}`,
//             size: Math.random() * 120 + 60,
//             startX: Math.random() * 100,
//             startY: Math.random() * 100,
//             whiteColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//             purpleColor: purpleColors[Math.floor(Math.random() * purpleColors.length)],
//             duration: 3.5 + Math.random() * 2,
//             mid1X: (Math.random() - 0.5) * 100,
//             mid1Y: (Math.random() - 0.5) * 100 - 50,
//             mid2X: (Math.random() - 0.5) * 100 + ((Math.random() - 0.5) * 80),
//             mid2Y: (Math.random() - 0.5) * 100 - 50 + ((Math.random() - 0.5) * 80),
//             endX: (Math.random() - 0.5) * 100 + ((Math.random() - 0.5) * 80) + ((Math.random() - 0.5) * 60),
//             endY: (Math.random() - 0.5) * 100 - 50 + ((Math.random() - 0.5) * 80) + ((Math.random() - 0.5) * 60),
//             delay: Math.random() * 0.5,
//             expiry: Date.now() + (3.5 + Math.random() * 2) * 1000 + 500 // Duration + delay + buffer
//         }));

//         setParticles(current => [...current, ...newParticles]);

//         // Clean up expired particles
//         setParticles(current => current.filter(p => p.expiry > Date.now()));
//     };

//     // Function to generate small particles
//     const generateSmallParticles = () => {
//         const newParticles = Array(4).fill(0).map((_, i) => ({
//             id: `small-${Date.now()}-${i}`,
//             size: Math.random() * 50 + 20,
//             startX: Math.random() * 100,
//             startY: Math.random() * 100,
//             whiteColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//             purpleColor: purpleColors[Math.floor(Math.random() * purpleColors.length)],
//             duration: 2.5 + Math.random() * 1.5,
//             midX: (Math.random() - 0.5) * 60,
//             midY: (Math.random() - 0.5) * 60 - 30,
//             endX: (Math.random() - 0.5) * 60 + ((Math.random() - 0.5) * 40),
//             endY: (Math.random() - 0.5) * 60 - 30 + ((Math.random() - 0.5) * 40),
//             delay: Math.random() * 0.3,
//             expiry: Date.now() + (2.5 + Math.random() * 1.5) * 1000 + 500 // Duration + delay + buffer
//         }));

//         setSmallParticles(current => [...current, ...newParticles]);

//         // Clean up expired particles
//         setSmallParticles(current => current.filter(p => p.expiry > Date.now()));
//     };

//     return (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//             <div className="absolute w-full h-full">
//                 <AnimatePresence>
//                     {particles.map((particle) => (
//                         <motion.div
//                             key={particle.id}
//                             className="absolute rounded-full"
//                             style={{
//                                 width: particle.size,
//                                 height: particle.size,
//                                 filter: `blur(${particle.size / 3}px) brightness(1.5)`,
//                                 left: `${particle.startX}%`,
//                                 top: `${particle.startY}%`,
//                                 mixBlendMode: "lighten",
//                                 pointerEvents: "none",
//                             }}
//                             initial={{
//                                 scale: 0.3,
//                                 opacity: 0,
//                                 backgroundColor: particle.whiteColor,
//                                 boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
//                                 x: 0,
//                                 y: 0,
//                             }}
//                             animate={{
//                                 scale: [0.3, 0.7, 1.1, 1.3],
//                                 opacity: [0, 0.8, 0.6, 0],
//                                 x: [0, particle.mid1X, particle.mid2X, particle.endX],
//                                 y: [0, particle.mid1Y, particle.mid2Y, particle.endY],
//                             }}
//                             transition={{
//                                 duration: particle.duration,
//                                 ease: "easeInOut",
//                                 times: [0, 0.3, 0.7, 1],
//                                 delay: particle.delay,
//                             }}
//                             exit={{ opacity: 0 }}
//                         >
//                             <motion.div
//                                 className="absolute inset-0 rounded-full"
//                                 initial={{
//                                     backgroundColor: particle.whiteColor,
//                                     boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
//                                 }}
//                                 animate={{
//                                     backgroundColor: particle.purpleColor,
//                                     boxShadow: "0 0 20px 5px rgba(160, 100, 220, 0.5)",
//                                 }}
//                                 transition={{
//                                     duration: 1,
//                                     delay: particle.delay,
//                                     ease: "easeInOut",
//                                 }}
//                             />
//                         </motion.div>
//                     ))}

//                     {smallParticles.map((particle) => (
//                         <motion.div
//                             key={particle.id}
//                             className="absolute rounded-full"
//                             style={{
//                                 width: particle.size,
//                                 height: particle.size,
//                                 filter: `blur(${particle.size / 4}px) brightness(1.6)`,
//                                 left: `${particle.startX}%`,
//                                 top: `${particle.startY}%`,
//                                 mixBlendMode: "lighten",
//                                 pointerEvents: "none",
//                             }}
//                             initial={{
//                                 scale: 0.2,
//                                 opacity: 0,
//                                 backgroundColor: particle.whiteColor,
//                                 boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.6)",
//                                 x: 0,
//                                 y: 0,
//                             }}
//                             animate={{
//                                 scale: [0.2, 0.5, 0.8, 1],
//                                 opacity: [0, 0.7, 0.5, 0],
//                                 x: [0, particle.midX, particle.endX],
//                                 y: [0, particle.midY, particle.endY],
//                             }}
//                             transition={{
//                                 duration: particle.duration,
//                                 ease: "easeInOut",
//                                 times: [0, 0.3, 0.7, 1],
//                                 delay: particle.delay,
//                             }}
//                             exit={{ opacity: 0 }}
//                         >
//                             <motion.div
//                                 className="absolute inset-0 rounded-full"
//                                 initial={{
//                                     backgroundColor: particle.whiteColor,
//                                     boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.6)",
//                                 }}
//                                 animate={{
//                                     backgroundColor: particle.purpleColor,
//                                     boxShadow: "0 0 15px 5px rgba(160, 100, 220, 0.6)",
//                                 }}
//                                 transition={{
//                                     duration: 0.9,
//                                     delay: particle.delay,
//                                     ease: "easeInOut",
//                                 }}
//                             />
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

// export default ContinuousSmokeEffect;



"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TriangleMandalas from "./TriangleMandalas";
import VaryingShapeMandalas from "./VaryingShapeMandalas";

// Bright white colors
const smokeColors = [
    "rgba(255, 255, 255, 0.85)",
    "rgba(255, 255, 255, 0.8)",
    "rgba(255, 255, 255, 0.75)",
    "rgba(254, 254, 254, 0.9)",
    "rgba(253, 253, 253, 0.95)",
];

// Purple fade colors
const purpleColors = [
    "rgba(31, 4, 58, 0.85)",
    "rgb(34, 4, 66)",
    "rgba(12, 1, 22, 0.75)",
    "rgba(110, 38, 187, 0.9)",
    "rgba(27, 24, 191, 0.95)",
];

// Blue colors for mandalas
const blueColors = [
    "rgba(25, 25, 112, 0.85)", // Midnight blue
    "rgba(65, 105, 225, 0.9)", // Royal blue
    "rgba(0, 0, 255, 0.8)", // Blue
    "rgba(30, 144, 255, 0.85)", // Dodger blue
    "rgba(0, 191, 255, 0.8)", // Deep sky blue
];

function VortexMandalaSmokeEffect() {
    const [particles, setParticles] = useState([]);
    const [smallParticles, setSmallParticles] = useState([]);
    const [vortexShapes, setVortexShapes] = useState([]);
    const [mandalaShapes, setMandalaShapes] = useState([]);

    // Create new particles at regular intervals
    useEffect(() => {
        // Generate initial particles
        generateParticles();
        generateSmallParticles();
        generateVortexShapes();
        generateMandalaShapes();

        // Set up intervals for continuous generation
        const largeInterval = setInterval(() => {
            generateParticles();
        }, 2000); // Create new large particles every 2 seconds

        const smallInterval = setInterval(() => {
            generateSmallParticles();
        }, 1500); // Create new small particles every 1.5 seconds

        const vortexInterval = setInterval(() => {
            generateVortexShapes();
        }, 3000); // Create new vortex shapes every 3 seconds

        const mandalaInterval = setInterval(() => {
            generateMandalaShapes();
        }, 4000); // Create new mandala shapes every 4 seconds

        return () => {
            clearInterval(largeInterval);
            clearInterval(smallInterval);
            clearInterval(vortexInterval);
            clearInterval(mandalaInterval);
        };
    }, []);

    // Function to generate large particles
    const generateParticles = () => {
        const newParticles = Array(5).fill(0).map((_, i) => ({
            id: `smoke-${Date.now()}-${i}`,
            size: Math.random() * 120 + 60,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            whiteColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
            purpleColor: purpleColors[Math.floor(Math.random() * purpleColors.length)],
            duration: 3.5 + Math.random() * 2,
            mid1X: (Math.random() - 0.5) * 100,
            mid1Y: (Math.random() - 0.5) * 100 - 50,
            mid2X: (Math.random() - 0.5) * 100 + ((Math.random() - 0.5) * 80),
            mid2Y: (Math.random() - 0.5) * 100 - 50 + ((Math.random() - 0.5) * 80),
            endX: (Math.random() - 0.5) * 100 + ((Math.random() - 0.5) * 80) + ((Math.random() - 0.5) * 60),
            endY: (Math.random() - 0.5) * 100 - 50 + ((Math.random() - 0.5) * 80) + ((Math.random() - 0.5) * 60),
            delay: Math.random() * 0.5,
            expiry: Date.now() + (3.5 + Math.random() * 2) * 1000 + 500 // Duration + delay + buffer
        }));

        setParticles(current => [...current, ...newParticles]);

        // Clean up expired particles
        setParticles(current => current.filter(p => p.expiry > Date.now()));
    };

    // Function to generate small particles
    const generateSmallParticles = () => {
        const newParticles = Array(4).fill(0).map((_, i) => ({
            id: `small-${Date.now()}-${i}`,
            size: Math.random() * 50 + 20,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            whiteColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
            purpleColor: purpleColors[Math.floor(Math.random() * purpleColors.length)],
            duration: 2.5 + Math.random() * 1.5,
            midX: (Math.random() - 0.5) * 60,
            midY: (Math.random() - 0.5) * 60 - 30,
            endX: (Math.random() - 0.5) * 60 + ((Math.random() - 0.5) * 40),
            endY: (Math.random() - 0.5) * 60 - 30 + ((Math.random() - 0.5) * 40),
            delay: Math.random() * 0.3,
            expiry: Date.now() + (2.5 + Math.random() * 1.5) * 1000 + 500 // Duration + delay + buffer
        }));

        setSmallParticles(current => [...current, ...newParticles]);

        // Clean up expired particles
        setSmallParticles(current => current.filter(p => p.expiry > Date.now()));
    };

    // Function to generate vortex shapes
    const generateVortexShapes = () => {
        const newVortexes = Array(2).fill(0).map((_, i) => {
            const centerX = Math.random() * 80 + 10; // Keep away from extreme edges
            const centerY = Math.random() * 80 + 10;
            const size = Math.random() * 150 + 100;
            const duration = 6 + Math.random() * 3;
            const rotations = 2 + Math.random() * 3;
            const arms = Math.floor(Math.random() * 3) + 3; // 3-5 arms
            const color1 = purpleColors[Math.floor(Math.random() * purpleColors.length)];
            const color2 = blueColors[Math.floor(Math.random() * blueColors.length)];

            return {
                id: `vortex-${Date.now()}-${i}`,
                centerX,
                centerY,
                size,
                duration,
                rotations,
                arms,
                color1,
                color2,
                delay: Math.random() * 0.5,
                expiry: Date.now() + duration * 1000 + 500 // Duration + buffer
            };
        });

        setVortexShapes(current => [...current, ...newVortexes]);

        // Clean up expired vortexes
        setVortexShapes(current => current.filter(v => v.expiry > Date.now()));
    };

    // Function to generate mandala shapes
    const generateMandalaShapes = () => {
        const newMandalas = Array(1).fill(0).map((_, i) => {
            const centerX = Math.random() * 80 + 10; // Keep away from extreme edges
            const centerY = Math.random() * 80 + 10;
            const size = Math.random() * 120 + 80;
            const duration = 7 + Math.random() * 4;
            const elements = Math.floor(Math.random() * 4) + 6; // 6-9 elements
            const rings = Math.floor(Math.random() * 2) + 2; // 2-3 rings
            const color1 = purpleColors[Math.floor(Math.random() * purpleColors.length)];
            const color2 = blueColors[Math.floor(Math.random() * blueColors.length)];

            return {
                id: `mandala-${Date.now()}-${i}`,
                centerX,
                centerY,
                size,
                duration,
                elements,
                rings,
                color1,
                color2,
                delay: Math.random() * 0.8,
                expiry: Date.now() + duration * 1000 + 800 // Duration + buffer
            };
        });

        setMandalaShapes(current => [...current, ...newMandalas]);

        // Clean up expired mandalas
        setMandalaShapes(current => current.filter(m => m.expiry > Date.now()));
    };

    // Generate array of points for a vortex arm
    const generateVortexArm = (vortex, armIndex) => {
        const points = [];
        const angleOffset = (2 * Math.PI * armIndex) / vortex.arms;

        // Create spiral points
        for (let i = 0; i < 20; i++) {
            const radius = (i / 20) * (vortex.size / 2);
            const angle = angleOffset + (i / 20) * Math.PI * 2;

            points.push({
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle)
            });
        }

        return points;
    };

    // Generate points for mandala elements
    const generateMandalaElement = (mandala, elementIndex, ringIndex) => {
        const angleOffset = (2 * Math.PI * elementIndex) / mandala.elements;
        const radius = ((ringIndex + 1) / mandala.rings) * (mandala.size / 2);
        const size = (mandala.size / 2) / mandala.rings / 2;

        return {
            angle: angleOffset,
            radius,
            size
        };
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <TriangleMandalas />
            {/* <VaryingShapeMandalas /> */}

            <div className="absolute w-full h-full">
                <AnimatePresence>
                    {/* Regular smoke particles */}
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                filter: `blur(${particle.size / 3}px) brightness(1.5)`,
                                left: `${particle.startX}%`,
                                top: `${particle.startY}%`,
                                mixBlendMode: "lighten",
                                pointerEvents: "none",
                            }}
                            initial={{
                                scale: 0.3,
                                opacity: 0,
                                backgroundColor: particle.whiteColor,
                                boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                scale: [0.3, 0.7, 1.1, 1.3],
                                opacity: [0, 0.8, 0.6, 0],
                                x: [0, particle.mid1X, particle.mid2X, particle.endX],
                                y: [0, particle.mid1Y, particle.mid2Y, particle.endY],
                            }}
                            transition={{
                                duration: particle.duration,
                                ease: "easeInOut",
                                times: [0, 0.3, 0.7, 1],
                                delay: particle.delay,
                            }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                initial={{
                                    backgroundColor: particle.whiteColor,
                                    boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
                                }}
                                animate={{
                                    backgroundColor: particle.purpleColor,
                                    boxShadow: "0 0 20px 5px rgba(160, 100, 220, 0.5)",
                                }}
                                transition={{
                                    duration: 1,
                                    delay: particle.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    ))}


                    {/* Small particles */}
                    {smallParticles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                filter: `blur(${particle.size / 4}px) brightness(1.2)`,
                                left: `${particle.startX}%`,
                                top: `${particle.startY}%`,
                                mixBlendMode: "lighten",
                            }}
                            initial={{
                                scale: 0.3,
                                opacity: 0,
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                scale: [0.3, 0.7, 1],
                                opacity: [0, 0.8, 0],
                                x: [0, particle.midX, particle.endX],
                                y: [0, particle.midY, particle.endY],
                            }}
                            transition={{
                                duration: particle.duration,
                                ease: "easeInOut",
                                times: [0, 0.5, 1],
                                delay: particle.delay,
                            }}
                            exit={{ opacity: 0 }}
                        />
                    ))}

                    {/* Vortex Shapes */}
                    {vortexShapes.map((vortex) => (
                        <motion.div
                            key={vortex.id}
                            className="absolute"
                            style={{
                                left: `${vortex.centerX}%`,
                                top: `${vortex.centerY}%`,
                                width: vortex.size,
                                height: vortex.size,
                                borderRadius: "50%",
                                border: `2px solid ${vortex.color1}`,
                                transformOrigin: "center",
                                pointerEvents: "none",
                            }}
                            initial={{
                                rotate: 0,
                                opacity: 0,
                            }}
                            animate={{
                                rotate: 360 * vortex.rotations,
                                opacity: 1,
                            }}
                            transition={{
                                duration: vortex.duration,
                                ease: "easeInOut",
                                delay: vortex.delay,
                                loop: Infinity,
                                repeatDelay: vortex.duration,
                            }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Render vortex arms */}
                            {Array.from({ length: vortex.arms }).map((_, armIndex) => {
                                const points = generateVortexArm(vortex, armIndex);
                                return (
                                    <motion.div
                                        key={`arm-${armIndex}`}
                                        className="absolute"
                                        style={{
                                            left: `50%`,
                                            top: `50%`,
                                            width: "1px",
                                            height: "1px",
                                            background: vortex.color2,
                                            transformOrigin: "center",
                                            transform: `rotate(${(armIndex * 360) / vortex.arms}deg)`,
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: vortex.duration,
                                            ease: "easeInOut",
                                        }}
                                    />
                                );
                            })}
                        </motion.div>
                    ))}

                    {/* Mandala Shapes */}
                    {mandalaShapes.map((mandala) => (
                        <motion.div
                            key={mandala.id}
                            className="absolute"
                            style={{
                                left: `${mandala.centerX}%`,
                                top: `${mandala.centerY}%`,
                                width: mandala.size,
                                height: mandala.size,
                                borderRadius: "50%",
                                border: `2px solid ${mandala.color1}`,
                                pointerEvents: "none",
                            }}
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{
                                duration: mandala.duration,
                                ease: "easeInOut",
                                delay: mandala.delay,
                            }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Render mandala rings and elements */}
                            {Array.from({ length: mandala.rings }).map((_, ringIndex) => (
                                <motion.div
                                    key={`ring-${ringIndex}`}
                                    className="absolute"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        width: mandala.size / mandala.rings,
                                        height: mandala.size / mandala.rings,
                                        borderRadius: "50%",
                                        border: `2px solid ${mandala.color2}`,
                                        transform: `translate(-50%, -50%)`,
                                    }}
                                    initial={{
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: mandala.duration,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}

                            {/* Render mandala elements */}
                            {Array.from({ length: mandala.elements }).map((_, elementIndex) => {
                                return (
                                    <motion.div
                                        key={`element-${elementIndex}`}
                                        className="absolute"
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            width: mandala.size / mandala.rings,
                                            height: mandala.size / mandala.rings,
                                            borderRadius: "50%",
                                            border: `2px solid ${mandala.color1}`,
                                            transform: `translate(-50%, -50%)`,
                                        }}
                                        initial={{
                                            scale: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration: mandala.duration,
                                            ease: "easeInOut",
                                        }}
                                    />
                                );
                            })}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default VortexMandalaSmokeEffect;
