"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Extended color palette with various color themes
const colorThemes = {
    cosmic: [
        "rgba(75, 0, 130, 0.85)", // Indigo
        "rgba(138, 43, 226, 0.9)", // BlueViolet
        "rgba(72, 61, 139, 0.8)", // DarkSlateBlue
        "rgba(106, 90, 205, 0.85)", // SlateBlue
        "rgba(123, 104, 238, 0.9)", // MediumSlateBlue
    ],
    ocean: [
        "rgba(0, 119, 182, 0.85)", // Deep blue
        "rgba(0, 180, 216, 0.9)", // Bright blue
        "rgba(72, 202, 228, 0.8)", // Light blue
        "rgba(144, 224, 239, 0.85)", // Pale blue
        "rgba(0, 150, 199, 0.9)", // Medium blue
    ],
    forest: [
        "rgba(8, 55, 27, 0.85)", // Dark green
        "rgba(36, 127, 64, 0.9)", // Medium green
        "rgba(120, 198, 121, 0.8)", // Light green
        "rgba(60, 138, 8, 0.85)", // Pale green
        "rgba(7, 28, 16, 0.9)", // Bright green
    ],
    sunset: [
        "rgba(255, 59, 48, 0.85)", // Red
        "rgba(255, 149, 0, 0.9)", // Orange
        "rgba(255, 204, 0, 0.8)", // Yellow
        "rgba(255, 111, 97, 0.85)", // Salmon
        "rgba(255, 179, 64, 0.9)", // Light orange
    ],
    regal: [
        "rgba(128, 0, 128, 0.85)", // Purple
        "rgba(218, 165, 32, 0.9)", // Goldenrod
        "rgba(72, 61, 139, 0.8)", // DarkSlateBlue
        "rgba(139, 0, 139, 0.85)", // DarkMagenta
        "rgba(255, 215, 0, 0.9)", // Gold
    ]
};

// Shape definitions
const shapeDefinitions = {
    triangle: {
        points: "0,-40 -35,20 35,20",
        type: "polygon"
    },
    diamond: {
        points: "0,-40 -35,0 0,40 35,0",
        type: "polygon"
    },
    pentagon: {
        points: "0,-40 -38,-12 -24,32 24,32 38,-12",
        type: "polygon"
    },
    hexagon: {
        points: "0,-40 -35,-20 -35,20 0,40 35,20 35,-20",
        type: "polygon"
    },
    star: {
        points: "0,-40 -10,-12 -40,-12 -15,5 -25,35 0,15 25,35 15,5 40,-12 10,-12",
        type: "polygon"
    },
    circle: {
        cx: 0,
        cy: 0,
        r: 25,
        type: "circle"
    },
    crescent: {
        d: "M0,-30 A30,30 0 0,1 0,30 A20,20 0 0,0 0,-20 Z",
        type: "path"
    },
    flower: {
        d: "M0,0 C5,-20 15,-20 0,-40 C-15,-20 -5,-20 0,0 M0,0 C20,-5 20,-15 40,0 C20,15 20,5 0,0 M0,0 C5,20 15,20 0,40 C-15,20 -5,20 0,0 M0,0 C-20,5 -20,15 -40,0 C-20,-15 -20,-5 0,0",
        type: "path"
    }
};

const shapeTypes = Object.keys(shapeDefinitions);
const themeNames = Object.keys(colorThemes);

const VaryingShapeMandalas = () => {
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

    // Function to generate mandala shapes with varying elements
    const generateMandalaShapes = () => {
        const newMandalas = Array(1).fill(0).map((_, i) => {
            const centerX = Math.random() * 80 + 10; // Keep away from extreme edges
            const centerY = Math.random() * 80 + 10;
            const size = Math.random() * 120 + 80;
            const duration = 7 + Math.random() * 4;
            const elements = Math.floor(Math.random() * 5) + 5; // 5-9 elements
            const rings = Math.floor(Math.random() * 2) + 2; // 2-3 rings

            // Select a random theme
            const themeName = themeNames[Math.floor(Math.random() * themeNames.length)];
            const selectedTheme = colorThemes[themeName];

            // Select 1-2 shapes for this mandala
            const primaryShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const secondaryShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

            // Decide on shape pattern (single or alternating)
            const shapePattern = Math.random() > 0.5 ? "single" : "alternating";

            const rotationSpeed = Math.random() > 0.5 ? 1 : -1; // Clockwise or counter-clockwise

            return {
                id: `varied-mandala-${Date.now()}-${i}`,
                centerX,
                centerY,
                size,
                duration,
                elements,
                rings,
                colors: selectedTheme,
                themeName,
                primaryShape,
                secondaryShape,
                shapePattern,
                rotationSpeed,
                delay: Math.random() * 0.8,
                expiry: Date.now() + duration * 1000 + 800, // Duration + buffer
                hasGlow: Math.random() > 0.5,
                hasRotatingElements: Math.random() > 0.3,
                hasInnerElement: Math.random() > 0.3
            };
        });

        setMandalaShapes(current => [...current, ...newMandalas]);

        // Clean up expired mandalas
        setMandalaShapes(current => current.filter(m => m.expiry > Date.now()));
    };

    // Helper function to render the appropriate SVG shape
    const renderShape = (shapeType, color, strokeColor, additionalProps = {}) => {
        const shape = shapeDefinitions[shapeType];

        if (!shape) {
            return null;
        }

        if (shape.type === "polygon") {
            return (
                <motion.polygon
                    points={shape.points}
                    fill={color}
                    stroke={strokeColor}
                    strokeWidth="1"
                    {...additionalProps}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            );
        } else if (shape.type === "circle") {
            return (
                <motion.circle
                    cx={shape.cx}
                    cy={shape.cy}
                    r={shape.r}
                    fill={color}
                    stroke={strokeColor}
                    strokeWidth="1"
                    {...additionalProps}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            );
        } else if (shape.type === "path") {
            return (
                <motion.path
                    d={shape.d}
                    fill={color}
                    stroke={strokeColor}
                    strokeWidth="1"
                    {...additionalProps}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            );
        }

        return null;
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
                        {/* Optional inner element */}
                        {mandala.hasInnerElement && (
                            <motion.div
                                className="absolute"
                                style={{
                                    left: 0,
                                    top: 0,
                                    width: 0,
                                    height: 0,
                                    transformOrigin: "center",
                                }}
                                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                                animate={{
                                    scale: 0.5,
                                    rotate: 360 * mandala.rotationSpeed * -1,
                                    opacity: 0.8
                                }}
                                transition={{
                                    duration: mandala.duration * 0.8,
                                    ease: "easeInOut",
                                    delay: mandala.delay
                                }}
                            >
                                <svg
                                    width={mandala.size * 0.5}
                                    height={mandala.size * 0.5}
                                    viewBox="-50 -50 100 100"
                                    style={{
                                        position: "absolute",
                                        left: -mandala.size * 0.25,
                                        top: -mandala.size * 0.25,
                                    }}
                                >
                                    {renderShape(
                                        mandala.secondaryShape,
                                        mandala.colors[4],
                                        mandala.colors[2],
                                        { className: mandala.hasGlow ? "filter drop-shadow" : "" }
                                    )}
                                </svg>
                            </motion.div>
                        )}

                        {/* Render shape rings */}
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
                                    {/* Render shapes in the ring */}
                                    {Array.from({ length: mandala.elements }).map((_, elementIndex) => {
                                        const angle = (Math.PI * 2 * elementIndex) / mandala.elements;
                                        const shapeSize = ringSize / 2;
                                        const distance = ringSize / 2;
                                        const x = distance * Math.cos(angle);
                                        const y = distance * Math.sin(angle);

                                        // Determine which shape to use based on pattern
                                        const currentShape = mandala.shapePattern === "single"
                                            ? mandala.primaryShape
                                            : elementIndex % 2 === 0 ? mandala.primaryShape : mandala.secondaryShape;

                                        // Alternate colors
                                        const colorIndex = (elementIndex % mandala.colors.length);
                                        const strokeIndex = ((elementIndex + 1) % mandala.colors.length);

                                        return (
                                            <motion.div
                                                key={`shape-${ringIndex}-${elementIndex}`}
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
                                                    opacity: 0,
                                                    rotate: 0
                                                }}
                                                animate={{
                                                    x: x,
                                                    y: y,
                                                    scale: 1,
                                                    opacity: 1,
                                                    rotate: mandala.hasRotatingElements ? elementIndex % 2 === 0 ? 360 : -360 : 0
                                                }}
                                                transition={{
                                                    duration: mandala.hasRotatingElements ? mandala.duration * 0.8 : 1.5,
                                                    delay: ringDelay + (elementIndex / mandala.elements) * 0.3,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <motion.svg
                                                    width={shapeSize}
                                                    height={shapeSize}
                                                    viewBox="-50 -50 100 100"
                                                    style={{
                                                        position: "absolute",
                                                        left: -shapeSize / 2,
                                                        top: -shapeSize / 2,
                                                        transform: `rotate(${angle + Math.PI / 2}rad)`,
                                                    }}
                                                >
                                                    {renderShape(
                                                        currentShape,
                                                        mandala.colors[colorIndex],
                                                        mandala.colors[strokeIndex],
                                                        { className: mandala.hasGlow ? "filter drop-shadow" : "" }
                                                    )}
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

export default VaryingShapeMandalas;