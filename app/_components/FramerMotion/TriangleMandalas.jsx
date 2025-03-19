"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const TriangleMandalas = () => {
    const [mandalaShapes, setMandalaShapes] = useState([]);

    useEffect(() => {
        // Generate initial mandala shapes
        generateMandalaShapes();

        // Set up interval for continuous generation
        const mandalaInterval = setInterval(() => {
            generateMandalaShapes();
        }, 4000); // Create new mandala shapes every 4 seconds

        // Clean up on unmount
        return () => clearInterval(mandalaInterval);
    }, []);

    // Function to generate mandala shapes with triangles
    const generateMandalaShapes = () => {
        const newMandalas = Array(1).fill(0).map((_, i) => {
            const centerX = Math.random() * 80 + 10; // Keep away from extreme edges
            const centerY = Math.random() * 80 + 10;
            const size = Math.random() * 120 + 80;
            const duration = 7 + Math.random() * 4;
            const elements = Math.floor(Math.random() * 4) + 6; // 6-9 elements
            const rings = Math.floor(Math.random() * 2) + 3; // 3-4 rings
            const color1 = purpleColors[Math.floor(Math.random() * purpleColors.length)];
            const color2 = blueColors[Math.floor(Math.random() * blueColors.length)];
            const rotationSpeed = Math.random() > 0.5 ? 1 : -1; // Clockwise or counter-clockwise

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
                rotationSpeed,
                delay: Math.random() * 0.8,
                expiry: Date.now() + duration * 1000 + 800 // Duration + buffer
            };
        });

        setMandalaShapes(current => [...current, ...newMandalas]);

        // Clean up expired mandalas
        setMandalaShapes(current => current.filter(m => m.expiry > Date.now()));
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <AnimatePresence>
                {mandalaShapes.map((mandala) => (
                    <motion.div
                        key={mandala.id}
                        className="absolute"
                        style={{
                            left: `${mandala.centerX}%`,
                            top: `${mandala.centerY}%`,
                            width: 0,
                            height: 0,
                            transformOrigin: "center",
                            pointerEvents: "none",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Render triangle rings */}
                        {Array.from({ length: mandala.rings }).map((_, ringIndex) => {
                            // Calculate ring size from small to large (inside to outside)
                            const ringSize = (mandala.size / mandala.rings) * (ringIndex + 1);
                            const ringDelay = mandala.delay + (ringIndex / mandala.rings) * 0.8; // Stagger delay from center outward

                            return (
                                <motion.div
                                    key={`ring-${ringIndex}`}
                                    className="absolute"
                                    style={{
                                        left: 0,
                                        top: 0,
                                        width: 0,
                                        height: 0,
                                        transformOrigin: "center",
                                    }}
                                    initial={{
                                        scale: 0,
                                        rotate: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 360 * mandala.rotationSpeed,
                                        opacity: [0, 0.8, 0.6]
                                    }}
                                    transition={{
                                        duration: mandala.duration,
                                        ease: "easeInOut",
                                        delay: ringDelay,
                                        times: [0, 0.3, 1]
                                    }}
                                >
                                    {/* Render triangles in the ring */}
                                    {Array.from({ length: mandala.elements }).map((_, elementIndex) => {
                                        const angle = (Math.PI * 2 * elementIndex) / mandala.elements;
                                        const triangleSize = ringSize / 2;
                                        const distance = ringSize / 2;
                                        const x = distance * Math.cos(angle);
                                        const y = distance * Math.sin(angle);
                                        const triangleColor = elementIndex % 2 === 0 ? mandala.color1 : mandala.color2;

                                        return (
                                            <motion.div
                                                key={`triangle-${ringIndex}-${elementIndex}`}
                                                className="absolute"
                                                style={{
                                                    left: 0,
                                                    top: 0,
                                                    width: 0,
                                                    height: 0,
                                                    transformOrigin: "center",
                                                }}
                                                initial={{
                                                    x: 0,
                                                    y: 0,
                                                    scale: 0,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    x: x,
                                                    y: y,
                                                    scale: 1,
                                                    opacity: 1
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: ringDelay + (elementIndex / mandala.elements) * 0.3,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <motion.svg
                                                    width={triangleSize}
                                                    height={triangleSize}
                                                    viewBox="-50 -50 100 100"
                                                    style={{
                                                        position: "absolute",
                                                        left: -triangleSize / 2,
                                                        top: -triangleSize / 2,
                                                        transform: `rotate(${angle + Math.PI / 2}rad)`,
                                                    }}
                                                >
                                                    <motion.polygon
                                                        points="0,-40 -35,20 35,20"
                                                        fill={triangleColor}
                                                        stroke={triangleColor === mandala.color1 ? mandala.color2 : mandala.color1}
                                                        strokeWidth="1"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </motion.svg>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TriangleMandalas;








// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Extended color palette with rainbow spectrum
// const rainbowColors = [
//     // Red spectrum
//     "rgba(255, 0, 0, 0.85)",
//     "rgba(255, 69, 0, 0.85)",
//     "rgba(255, 99, 71, 0.85)",
//     // Orange spectrum
//     "rgba(255, 165, 0, 0.85)",
//     "rgba(255, 140, 0, 0.85)",
//     "rgba(255, 127, 80, 0.85)",
//     // Yellow spectrum
//     "rgba(255, 255, 0, 0.85)",
//     "rgba(255, 215, 0, 0.85)",
//     "rgba(240, 230, 140, 0.85)",
//     // Green spectrum
//     "rgba(0, 255, 0, 0.85)",
//     "rgba(50, 205, 50, 0.85)",
//     "rgba(0, 128, 0, 0.85)",
//     // Blue spectrum
//     "rgba(0, 0, 255, 0.85)",
//     "rgba(30, 144, 255, 0.85)",
//     "rgba(65, 105, 225, 0.85)",
//     // Purple spectrum
//     "rgba(128, 0, 128, 0.85)",
//     "rgba(148, 0, 211, 0.85)",
//     "rgba(138, 43, 226, 0.85)",
//     // Pink spectrum
//     "rgba(255, 20, 147, 0.85)",
//     "rgba(219, 112, 147, 0.85)",
//     "rgba(255, 105, 180, 0.85)"
// ];

// // Detailed shape definitions with complex geometries
// const complexShapeDefinitions = {
//     // Basic shapes but with variations
//     triangle: {
//         type: "polygon",
//         points: "0,-40 -35,20 35,20",
//         viewBox: "-50 -50 100 100"
//     },
//     circle: {
//         type: "circle",
//         cx: 0,
//         cy: 0,
//         r: 25,
//         viewBox: "-50 -50 100 100"
//     },
//     // More complex geometric shapes
//     octagon: {
//         type: "polygon",
//         points: "20,-47 47,-20 47,20 20,47 -20,47 -47,20 -47,-20 -20,-47",
//         viewBox: "-50 -50 100 100"
//     },
//     star5: {
//         type: "polygon",
//         points: "0,-50 10,-15 47,-15 18,5 28,40 0,20 -28,40 -18,5 -47,-15 -10,-15",
//         viewBox: "-50 -50 100 100"
//     },
//     star8: {
//         type: "polygon",
//         points: "0,-50 15,-25 40,-40 25,-15 50,0 25,15 40,40 15,25 0,50 -15,25 -40,40 -25,15 -50,0 -25,-15 -40,-40 -15,-25",
//         viewBox: "-50 -50 100 100"
//     },
//     // Floral and organic shapes
//     flowerPetal: {
//         type: "path",
//         d: "M0,0 C10,-30 40,-30 0,-60 C-40,-30 -10,-30 0,0",
//         viewBox: "-60 -60 120 120"
//     },
//     swirl: {
//         type: "path",
//         d: "M0,0 C10,-10 20,-10 30,-20 C40,-30 30,-40 20,-30 C10,-20 0,-20 0,-10 Z",
//         viewBox: "-50 -50 100 100"
//     },
//     lotus: {
//         type: "path",
//         d: "M0,0 C5,-10 15,-15 10,-30 C5,-40 -5,-40 -10,-30 C-15,-15 -5,-10 0,0 Z",
//         viewBox: "-40 -40 80 80"
//     },
//     // Combination shapes
//     moonStar: {
//         type: "path",
//         d: "M15,0 A15,15 0 1,0 -15,0 A10,10 0 1,1 -10,0 L0,-20 L10,0 Z",
//         viewBox: "-30 -30 60 60"
//     },
//     chakra: {
//         type: "path",
//         d: "M0,-25 L7,-7 L25,0 L7,7 L0,25 L-7,7 L-25,0 L-7,-7 Z M0,-15 A15,15 0 0,0 -15,0 A15,15 0 0,0 0,15 A15,15 0 0,0 15,0 A15,15 0 0,0 0,-15 Z",
//         viewBox: "-30 -30 60 60"
//     },
//     // Decorative elements
//     triquetra: {
//         type: "path",
//         d: "M0,-20 A20,20 0 0,1 17.32,10 A20,20 0 0,1 -17.32,10 A20,20 0 0,1 0,-20 Z M0,-10 A10,10 0 0,0 8.66,5 A10,10 0 0,0 -8.66,5 A10,10 0 0,0 0,-10 Z",
//         viewBox: "-25 -25 50 50"
//     },
//     mandorla: {
//         type: "path",
//         d: "M0,-30 C16.6,-30 30,-16.6 30,0 C30,16.6 16.6,30 0,30 C-16.6,30 -30,16.6 -30,0 C-30,-16.6 -16.6,-30 0,-30 Z M0,-15 C-8.3,-15 -15,-8.3 -15,0 C-15,8.3 -8.3,15 0,15 C8.3,15 15,8.3 15,0 C15,-8.3 8.3,-15 0,-15 Z",
//         viewBox: "-35 -35 70 70"
//     },
// };

// const shapeTypes = Object.keys(complexShapeDefinitions);

// const DetailedRainbowMandalas = () => {
//     const [mandalaShapes, setMandalaShapes] = useState([]);

//     useEffect(() => {
//         // Generate initial mandala shapes
//         generateMandalaShapes();

//         // Set up interval for continuous generation
//         const mandalaInterval = setInterval(() => {
//             generateMandalaShapes();
//         }, 4000); // Create new mandala shapes every 4 seconds

//         // Clean up on unmount
//         return () => clearInterval(mandalaInterval);
//     }, []);

//     // Function to generate mandala shapes with varying elements
//     const generateMandalaShapes = () => {
//         const newMandalas = Array(1).fill(0).map((_, i) => {
//             const centerX = Math.random() * 80 + 10; // Keep away from extreme edges
//             const centerY = Math.random() * 80 + 10;
//             const size = Math.random() * 120 + 80;
//             const duration = 7 + Math.random() * 4;
//             const elements = Math.floor(Math.random() * 6) + 6; // 6-11 elements
//             const rings = Math.floor(Math.random() * 3) + 3; // 3-5 rings

//             // Create a color palette for this specific mandala
//             // This ensures colors within a single mandala are harmonious
//             const colorPalette = [];
//             // Select a starting point in the rainbow color array
//             const startingColorIdx = Math.floor(Math.random() * rainbowColors.length);
//             // Select 3-5 adjacent colors from the rainbow
//             const colorRange = Math.floor(Math.random() * 3) + 3;
//             for (let c = 0; c < colorRange; c++) {
//                 const idx = (startingColorIdx + c) % rainbowColors.length;
//                 colorPalette.push(rainbowColors[idx]);
//             }

//             const rotationSpeed = Math.random() > 0.5 ? 1 : -1; // Clockwise or counter-clockwise

//             // More variety in shape combinations
//             const primaryShapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
//             const secondaryShapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

//             // Increase the chances of mixed shapes
//             const mixedShapeMode = Math.floor(Math.random() * 3); // 0: single shape, 1: alternate by ring, 2: mixed in each ring

//             return {
//                 id: `mandala-${Date.now()}-${i}`,
//                 centerX,
//                 centerY,
//                 size,
//                 duration,
//                 elements,
//                 rings,
//                 colorPalette,
//                 rotationSpeed,
//                 primaryShapeType,
//                 secondaryShapeType,
//                 mixedShapeMode,
//                 delay: Math.random() * 0.8,
//                 expiry: Date.now() + duration * 1000 + 800, // Duration + buffer
//                 // Additional decorative features
//                 hasInnerCircle: Math.random() > 0.5,
//                 hasOuterRing: Math.random() > 0.3,
//                 hasDetailedCenter: Math.random() > 0.6
//             };
//         });

//         setMandalaShapes(current => [...current, ...newMandalas]);

//         // Clean up expired mandalas
//         setMandalaShapes(current => current.filter(m => m.expiry > Date.now()));
//     };

//     // Helper function to render the appropriate SVG shape
//     const renderShape = (shapeType, color, strokeColor, additionalClasses = "") => {
//         const shape = complexShapeDefinitions[shapeType];

//         if (!shape) {
//             return null;
//         }

//         if (shape.type === "polygon") {
//             return (
//                 <motion.polygon
//                     points={shape.points}
//                     fill={color}
//                     stroke={strokeColor}
//                     strokeWidth="1"
//                     className={additionalClasses}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 />
//             );
//         } else if (shape.type === "circle") {
//             return (
//                 <motion.circle
//                     cx={shape.cx}
//                     cy={shape.cy}
//                     r={shape.r}
//                     fill={color}
//                     stroke={strokeColor}
//                     strokeWidth="1"
//                     className={additionalClasses}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 />
//             );
//         } else if (shape.type === "rect") {
//             return (
//                 <motion.rect
//                     x={shape.x}
//                     y={shape.y}
//                     width={shape.width}
//                     height={shape.height}
//                     fill={color}
//                     stroke={strokeColor}
//                     strokeWidth="1"
//                     className={additionalClasses}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 />
//             );
//         } else if (shape.type === "path") {
//             return (
//                 <motion.path
//                     d={shape.d}
//                     fill={color}
//                     stroke={strokeColor}
//                     strokeWidth="1"
//                     className={additionalClasses}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 />
//             );
//         }

//         return null;
//     };

//     // Helper function to create a layered compound shape
//     const renderCompoundShape = (primaryShape, secondaryShape, primaryColor, secondaryColor, additionalProps = {}) => {
//         const primaryDef = complexShapeDefinitions[primaryShape];
//         const secondaryDef = complexShapeDefinitions[secondaryShape];

//         if (!primaryDef || !secondaryDef) {
//             return null;
//         }

//         return (
//             <>
//                 {renderShape(primaryShape, primaryColor, secondaryColor, "drop-shadow-sm")}
//                 <motion.g
//                     transform="scale(0.6)"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 0.9 }}
//                     transition={{ duration: 0.7, delay: 0.2 }}
//                 >
//                     {renderShape(secondaryShape, secondaryColor, primaryColor, "filter drop-shadow-sm")}
//                 </motion.g>
//             </>
//         );
//     };
//     return (
//         <div className="relative w-full h-full overflow-hidden">
//             <AnimatePresence>
//                 {mandalaShapes.map((mandala) => (
//                     <motion.div
//                         key={mandala.id}
//                         className="absolute"
//                         style={{
//                             left: `${mandala.centerX}%`,
//                             top: `${mandala.centerY}%`,
//                             width: `${mandala.size}px`,
//                             height: `${mandala.size}px`,
//                         }}
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1, rotate: mandala.rotationSpeed * 360 }}
//                         exit={{ opacity: 0, scale: 0 }}
//                         transition={{ duration: mandala.duration, ease: "easeInOut" }}
//                     >
//                         <svg viewBox="-50 -50 100 100" className="w-full h-full">
//                             {Array.from({ length: mandala.rings }).map((_, ringIndex) => (
//                                 <motion.g
//                                     key={`ring-${ringIndex}`}
//                                     animate={{ rotate: mandala.rotationSpeed * 30 * ringIndex }}
//                                     transition={{ duration: mandala.duration / 2, repeat: Infinity, ease: "linear" }}
//                                 >
//                                     {Array.from({ length: mandala.elements }).map((_, elementIndex) => {
//                                         const angle = (360 / mandala.elements) * elementIndex;
//                                         const shapeType =
//                                             mandala.mixedShapeMode === 0
//                                                 ? mandala.primaryShapeType
//                                                 : mandala.mixedShapeMode === 1
//                                                     ? elementIndex % 2 === 0
//                                                         ? mandala.primaryShapeType
//                                                         : mandala.secondaryShapeType
//                                                     : shapeTypes[elementIndex % shapeTypes.length];

//                                         return (
//                                             <motion.g
//                                                 key={`element-${elementIndex}`}
//                                                 transform={`rotate(${angle}) translate(30, 0)`}
//                                             >
//                                                 {renderShape(
//                                                     shapeType,
//                                                     mandala.colorPalette[elementIndex % mandala.colorPalette.length],
//                                                     "#000",
//                                                     "shadow-md"
//                                                 )}
//                                             </motion.g>
//                                         );
//                                     })}
//                                 </motion.g>
//                             ))}

//                             {mandala.hasInnerCircle && (
//                                 <motion.circle
//                                     cx="0"
//                                     cy="0"
//                                     r="10"
//                                     fill={mandala.colorPalette[0]}
//                                     stroke="#000"
//                                     strokeWidth="1"
//                                     initial={{ scale: 0.5, opacity: 0 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ duration: 0.7 }}
//                                 />
//                             )}

//                             {mandala.hasOuterRing && (
//                                 <motion.circle
//                                     cx="0"
//                                     cy="0"
//                                     r="45"
//                                     fill="none"
//                                     stroke={mandala.colorPalette[1]}
//                                     strokeWidth="2"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 1.2 }}
//                                 />
//                             )}

//                             {mandala.hasDetailedCenter &&
//                                 renderCompoundShape(
//                                     mandala.primaryShapeType,
//                                     mandala.secondaryShapeType,
//                                     mandala.colorPalette[0],
//                                     mandala.colorPalette[1]
//                                 )}
//                         </svg>
//                     </motion.div>
//                 ))}
//             </AnimatePresence>
//         </div>
//     );

// }
// export default DetailedRainbowMandalas