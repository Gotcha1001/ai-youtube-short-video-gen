// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// const rainbowColors = [
//   "#ff0000", // Red
//   "#ff7f00", // Orange
//   "#ffff00", // Yellow
//   "#00ff00", // Green
//   "#0000ff", // Blue
//   "#4b0082", // Indigo
//   "#9400d3", // Violet
// ];

// function SmokeEffect() {
//   return (
//     <div className="absolute inset-0 flex justify-between pointer-events-none overflow-hidden">
//       {["left", "middle", "right"].map((side, index) => (
//         <div key={side} className="relative w-1/3 h-full">
//           {[...Array(10)].map((_, i) => (
//             <motion.div
//               key={`${side}-${i}`}
//               className="absolute w-24 h-24 opacity-50 blur-3xl rounded-full"
//               initial={{
//                 x: side === "left" ? -50 : side === "right" ? 50 : 0,
//                 y: Math.random() * 80 + 20,
//                 scale: 0.8,
//                 opacity: 0.4,
//               }}
//               animate={{
//                 y: ["0%", "-30%", "-50%", "-80%", "-100%"],
//                 x: side === "left" ? ["-50%", "-60%", "-70%"] : side === "right" ? ["50%", "60%", "70%"] : ["0%", "5%", "-5%"],
//                 scale: [0.8, 1.2, 1.5, 1.8, 2.2], // Expanding slowly like ripples
//                 opacity: [0.4, 0.6, 0.8, 0.6, 0.2, 0], // Gradual fade out
//                 backgroundColor: rainbowColors, // Cycle through colors
//               }}
//               transition={{
//                 duration: Math.random() * 6 + 4, // Slow motion effect (4-10s)
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 ease: "easeInOut",
//                 backgroundColor: {
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: "linear",
//                 },
//               }}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SmokeEffect;


//



// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const rainbowColors = [
//   "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       const timer = setTimeout(() => setShowSmoke(false), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(20)].map((_, i) => {
//         const size = Math.random() * 50 + 50; // Size between 50px - 100px
//         const startX = Math.random() * window.innerWidth; // Random start X
//         const startY = Math.random() * window.innerHeight; // Random start Y
//         const moveX = (Math.random() - 0.5) * 200; // Move left/right randomly
//         const moveY = Math.random() * -200 - 100; // Move upwards (smoke effect)

//         return (
//           <motion.div
//             key={i}
//             className="absolute blur-3xl rounded-full"
//             style={{
//               width: size,
//               height: size,
//               left: startX,
//               top: startY,
//               backgroundColor: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
//               opacity: 0.5,
//             }}
//             initial={{
//               scale: Math.random() * 0.5 + 0.5,
//               rotate: Math.random() * 360,
//               opacity: 0.3,
//             }}
//             animate={{
//               x: [0, moveX],
//               y: [0, moveY],
//               scale: [0.5, 1.2, 1.5],
//               rotate: [0, Math.random() * 180],
//               opacity: [0.5, 0.8, 0.6, 0.4, 0.1, 0],
//             }}
//             transition={{
//               duration: Math.random() * 8 + 6, // Between 6s - 14s
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

// export default SmokeEffect;


// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// // More subtle and smoky color palette
// const smokeColors = [
//   "rgba(255, 255, 255, 0.4)",
//   "rgba(200, 200, 220, 0.5)",
//   "rgba(180, 180, 210, 0.4)",
//   "rgba(220, 220, 240, 0.3)",
//   "rgba(210, 210, 230, 0.5)",
// ];

// // Optional: Add rainbow colors back if you want those instead
// const rainbowColors = [
//   "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3",
// ];

// function SmokeEffect() {
//   // Remove the conditional rendering that might be causing issues
//   // Fixed number of particles to ensure we see something
//   const particleCount = 30;

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden">
//       {/* Main smoke layer */}
//       <div className="absolute w-full h-full">
//         {Array(particleCount).fill().map((_, i) => {
//           // Ensure particles start visible within the viewport
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const size = Math.floor(Math.random() * 30) + 24; // Larger particles

//           return (
//             <motion.div
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 filter: `blur(${size / 1.5}px)`,
//                 backgroundColor: smokeColors[i % smokeColors.length],
//                 // Position absolutely within the container
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//               }}
//               animate={{
//                 x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
//                 y: [0, -50, -150, -250],
//                 scale: [0.5, 1.5, 2.5, 3],
//                 opacity: [0.7, 0.5, 0.3, 0],
//                 rotate: [0, Math.random() * 90, Math.random() * 180],
//               }}
//               transition={{
//                 duration: 5 + Math.random() * 5, // 5-10 seconds
//                 repeat: Infinity,
//                 repeatDelay: Math.random(),
//                 ease: "easeOut",
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Additional spill-over layer */}
//       <div className="absolute w-full h-full scale-125">
//         {Array(15).fill().map((_, i) => {
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const size = Math.floor(Math.random() * 40) + 30;

//           return (
//             <motion.div
//               key={`spill-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 filter: `blur(${size}px)`,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//               }}
//               animate={{
//                 x: [0, Math.random() * 150 - 75, Math.random() * 300 - 150],
//                 y: [0, -100, -200, -300],
//                 scale: [0.3, 1, 2, 3.5],
//                 opacity: [0.5, 0.4, 0.2, 0],
//               }}
//               transition={{
//                 duration: 8 + Math.random() * 7, // 8-15 seconds
//                 repeat: Infinity,
//                 repeatDelay: Math.random(),
//                 ease: "easeOut",
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Combined color palette - keeping both rainbow and smoky options
// const rainbowColors = [
//   "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3",
// ];

// const smokeColors = [
//   "rgba(255, 255, 255, 0.4)",
//   "rgba(200, 200, 220, 0.5)",
//   "rgba(180, 180, 210, 0.4)",
//   "rgba(220, 220, 240, 0.3)",
//   "rgba(210, 210, 230, 0.5)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       // Stop smoke effect after 8 seconds
//       const timer = setTimeout(() => setShowSmoke(false), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* Main smoke particles - more of them for fuller effect */}
//       {[...Array(30)].map((_, i) => {
//         const size = Math.random() * 60 + 40; // Size between 40px - 100px
//         const startX = Math.random() * 100; // Percentage-based positioning
//         const startY = Math.random() * 100;
//         const moveX = (Math.random() - 0.5) * 300; // More movement range
//         const moveY = Math.random() * -300 - 100; // More upward movement

//         return (
//           <motion.div
//             key={i}
//             className="absolute blur-3xl rounded-full"
//             style={{
//               width: size,
//               height: size,
//               left: `${startX}%`,
//               top: `${startY}%`,
//               backgroundColor: i % 2 === 0
//                 ? rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
//                 : smokeColors[Math.floor(Math.random() * smokeColors.length)],
//               opacity: 0.5,
//             }}
//             initial={{
//               scale: Math.random() * 0.5 + 0.5,
//               rotate: Math.random() * 360,
//               opacity: 0.3,
//             }}
//             animate={{
//               x: [0, moveX / 2, moveX],
//               y: [0, moveY / 2, moveY],
//               scale: [0.5, 1.2, 1.8, 2.2],
//               rotate: [0, Math.random() * 90, Math.random() * 180],
//               opacity: [0.5, 0.7, 0.5, 0.3, 0.1, 0],
//             }}
//             transition={{
//               duration: Math.random() * 6 + 4, // Between 4s - 10s (faster to complete within 8s)
//               ease: "easeInOut",
//             }}
//           />
//         );
//       })}

//       {/* Spillover layer - larger, more diffuse particles */}
//       {[...Array(15)].map((_, i) => {
//         const size = Math.random() * 80 + 60; // Larger size between 60px - 140px
//         const startX = Math.random() * 100;
//         const startY = Math.random() * 100;
//         const moveX = (Math.random() - 0.5) * 400; // Wider movement
//         const moveY = Math.random() * -350 - 150; // Higher movement

//         return (
//           <motion.div
//             key={`spill-${i}`}
//             className="absolute blur-3xl rounded-full"
//             style={{
//               width: size,
//               height: size,
//               left: `${startX}%`,
//               top: `${startY}%`,
//               backgroundColor: i % 2 === 0
//                 ? rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
//                 : smokeColors[Math.floor(Math.random() * smokeColors.length)],
//               opacity: 0.3,
//             }}
//             initial={{
//               scale: Math.random() * 0.3 + 0.3,
//               rotate: Math.random() * 360,
//               opacity: 0.2,
//             }}
//             animate={{
//               x: [0, moveX / 3, moveX * 2/3, moveX],
//               y: [0, moveY / 3, moveY * 2/3, moveY],
//               scale: [0.3, 0.8, 1.5, 2.5],
//               rotate: [0, Math.random() * 120, Math.random() * 240],
//               opacity: [0.3, 0.5, 0.3, 0.1, 0],
//             }}
//             transition={{
//               duration: Math.random() * 7 + 3, // Between 3s - 10s (to complete within 8s)
//               ease: "easeInOut",
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

// export default SmokeEffect;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Mac-style smoke colors - whites and greys only
// const smokeColors = [
//   "rgba(255, 255, 255, 0.7)",
//   "rgba(245, 245, 245, 0.6)",
//   "rgba(230, 230, 230, 0.65)",
//   "rgba(210, 210, 210, 0.55)",
//   "rgba(200, 200, 200, 0.6)",
//   "rgba(180, 180, 180, 0.5)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       // Increase duration to 12 seconds for a longer effect
//       const timer = setTimeout(() => setShowSmoke(false), 12000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* Central puff - concentrated in the middle first, then disperses */}
//       <div className="absolute w-full h-full flex items-center justify-center">
//         {/* Core dense smoke - starts small and expands rapidly */}
//         {[...Array(25)].map((_, i) => { // Increased from 15 to 25 particles
//           const size = Math.random() * 50 + 30; // Larger initial size (was 30+20)
//           const finalSize = size * (Math.random() * 5 + 6); // Expand 6-11x (was 4-7x)

//           return (
//             <motion.div
//               key={`core-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 3}px)`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.1, 1, 3, 5, 7], // Increased scale values (was [0.1, 1, 2, 3, 4])
//                 opacity: [0, 0.9, 0.7, 0.4, 0],
//                 x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 600], // Doubled movement range
//                 y: [0, -40, -120, -240], // Doubled vertical movement
//               }}
//               transition={{
//                 duration: 2.5, // Increased from 1.8
//                 ease: [0.19, 1, 0.22, 1], // Custom ease for that "puff" effect
//                 delay: Math.random() * 0.3, // Slightly more staggered
//               }}
//             />
//           );
//         })}

//         {/* Secondary dispersing smoke - follows core but spreads wider */}
//         {[...Array(40)].map((_, i) => { // Increased from 25 to 40 particles
//           const size = Math.random() * (i < 15 ? 60 : 90) + 40; // Larger sizes (was 40/60 + 30)
//           const angle = Math.random() * 360; // Disperse in all directions
//           const distance = Math.random() * 600 + 200; // Doubled distance (was 300+100)
//           const xMove = Math.cos(angle * (Math.PI/180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI/180)) * distance - 150; // More upward bias

//           return (
//             <motion.div
//               key={`disperse-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.2, 1.0, 1.8, 2.5], // Increased scale (was [0.2, 0.8, 1.2, 1.5])
//                 opacity: [0, 0.8, 0.5, 0.2, 0], // Slightly more opaque
//                 x: [0, xMove * 0.4, xMove], // Faster initial movement
//                 y: [0, yMove * 0.4, yMove],
//                 rotate: [0, Math.random() * 180 - 90], // More rotation (was 90-45)
//               }}
//               transition={{
//                 duration: 3.5 + Math.random() * 3, // Increased from 2.5 + random*2
//                 ease: "easeOut",
//                 delay: 0.1 + Math.random() * 0.4, // Slightly more staggered
//               }}
//             />
//           );
//         })}

//         {/* Thin wisps - the trailing tendrils of smoke */}
//         {[...Array(35)].map((_, i) => { // Increased from 20 to 35 particles
//           const size = Math.random() * 60 + 25; // Larger wisp elements (was 40+15)
//           const finalSize = size * (Math.random() * 3 + 4); // Expand 4-7x (was 3-5x)
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 800 + 300; // Doubled distance (was 400+150)
//           const xMove = Math.cos(angle * (Math.PI/180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI/180)) * distance - 200; // More upward bias

//           return (
//             <motion.div
//               key={`wisp-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * 3)], // Lighter colors for wisps
//                 filter: `blur(${size / 1.5}px)`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.1, 1.0, 2.0, 3.0], // Increased scale (was [0.1, 0.7, 1.5, 2.2])
//                 opacity: [0, 0.6, 0.4, 0.2, 0], // Slightly more opaque
//                 x: [0, xMove * 0.25, xMove * 0.6, xMove], // Adjusted movement pattern
//                 y: [0, yMove * 0.25, yMove * 0.6, yMove],
//                 rotate: [0, Math.random() * 360 - 180], // Full rotation possible (was 180-90)
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 4, // Increased from 3 + random*3
//                 ease: "easeOut",
//                 delay: 0.3 + Math.random() * 0.7, // More varied delay
//               }}
//             />
//           );
//         })}

//         {/* Add new extra-large explosive particles that go everywhere */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 100 + 70; // Very large particles
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 1000 + 400; // Very long distance
//           const xMove = Math.cos(angle * (Math.PI/180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI/180)) * distance;

//           return (
//             <motion.div
//               key={`explosive-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.1, 0.8, 1.5, 2.2, 3],
//                 opacity: [0, 0.7, 0.5, 0.3, 0],
//                 x: [0, xMove * 0.2, xMove * 0.6, xMove],
//                 y: [0, yMove * 0.2, yMove * 0.6, yMove],
//                 rotate: [0, Math.random() * 360 - 180],
//               }}
//               transition={{
//                 duration: 5 + Math.random() * 3,
//                 ease: [0.19, 1, 0.22, 1], // Custom bouncy ease
//                 delay: 0.2 + Math.random() * 0.3, // Start early for explosive feel
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Mac-style smoke colors - whites and greys only
// const smokeColors = [
//   "rgba(255, 255, 255, 0.7)",
//   "rgba(245, 245, 245, 0.6)",
//   "rgba(230, 230, 230, 0.65)",
//   "rgba(210, 210, 210, 0.55)",
//   "rgba(200, 200, 200, 0.6)",
//   "rgba(180, 180, 180, 0.5)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       // Increase duration to 12 seconds for a longer effect
//       const timer = setTimeout(() => setShowSmoke(false), 12000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   // Create multiple origin points throughout the container
//   const originPoints = [];
//   for (let i = 0; i < 5; i++) {
//     originPoints.push({
//       x: Math.random() * 80 - 40, // -40% to +40% from center
//       y: Math.random() * 80 - 40, // -40% to +40% from center
//     });
//   }

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* Initial concentrated burst - covers a wider area initially */}
//       <div className="absolute w-full h-full flex items-center justify-center">
//         {/* Initial large burst cloud - much larger initial radius */}
//         {[...Array(8)].map((_, i) => {
//           const size = Math.random() * 160 + 120; // Very large initial burst

//           return (
//             <motion.div
//               key={`burst-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2.5}px)`,
//               }}
//               initial={{
//                 scale: 0.3,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.3, 1.2, 2, 1.5],
//                 opacity: [0, 0.9, 0.6, 0],
//                 x: [0, (Math.random() - 0.5) * 100],
//                 y: [0, (Math.random() - 0.5) * 100],
//               }}
//               transition={{
//                 duration: 1.8,
//                 ease: [0.19, 1, 0.22, 1],
//                 delay: Math.random() * 0.1, // Very little delay for initial burst
//               }}
//             />
//           );
//         })}

//         {/* Core dense smoke - starts with larger radius and expands rapidly */}
//         {[...Array(30)].map((_, i) => {
//           const size = Math.random() * 80 + 60; // Larger initial size
//           const originPoint = originPoints[Math.floor(Math.random() * originPoints.length)];

//           return (
//             <motion.div
//               key={`core-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 3}px)`,
//               }}
//               initial={{
//                 scale: 0.4, // Larger initial scale
//                 opacity: 0,
//                 x: originPoint.x, // Start from a random point in the container
//                 y: originPoint.y,
//               }}
//               animate={{
//                 scale: [0.4, 1.5, 3, 5, 7],
//                 opacity: [0, 0.7, 0.4, 0],
//                 x: [originPoint.x, originPoint.x + (Math.random() - 0.5) * 300, originPoint.x + (Math.random() - 0.5) * 700],
//                 y: [originPoint.y, originPoint.y - 60, originPoint.y - 240],
//               }}
//               transition={{
//                 duration: 2.8,
//                 ease: [0.19, 1, 0.22, 1],
//                 delay: 0.1 + Math.random() * 0.3,
//               }}
//             />
//           );
//         })}

//         {/* Secondary dispersing smoke - follows core but spreads wider */}
//         {[...Array(40)].map((_, i) => {
//           const size = Math.random() * (i < 15 ? 80 : 120) + 60; // Even larger sizes
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 800 + 300;
//           const originPoint = originPoints[Math.floor(Math.random() * originPoints.length)];
//           const xMove = Math.cos(angle * (Math.PI / 180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI / 180)) * distance - 150;

//           return (
//             <motion.div
//               key={`disperse-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//               }}
//               initial={{
//                 scale: 0.4, // Larger initial scale
//                 opacity: 0,
//                 x: originPoint.x,
//                 y: originPoint.y,
//               }}
//               animate={{
//                 scale: [0.4, 1.2, 2.0, 2.8],
//                 opacity: [0, 0.8, 0.5, 0.2, 0],
//                 x: [originPoint.x, originPoint.x + xMove * 0.4, originPoint.x + xMove],
//                 y: [originPoint.y, originPoint.y + yMove * 0.4, originPoint.y + yMove],
//                 rotate: [0, Math.random() * 180 - 90],
//               }}
//               transition={{
//                 duration: 3.5 + Math.random() * 3,
//                 ease: "easeOut",
//                 delay: 0.2 + Math.random() * 0.5,
//               }}
//             />
//           );
//         })}

//         {/* Thin wisps - the trailing tendrils of smoke */}
//         {[...Array(35)].map((_, i) => {
//           const size = Math.random() * 80 + 40;
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 1000 + 400;
//           const originPoint = originPoints[Math.floor(Math.random() * originPoints.length)];
//           const xMove = Math.cos(angle * (Math.PI / 180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI / 180)) * distance - 200;

//           return (
//             <motion.div
//               key={`wisp-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * 3)],
//                 filter: `blur(${size / 1.5}px)`,
//               }}
//               initial={{
//                 scale: 0.3,
//                 opacity: 0,
//                 x: originPoint.x,
//                 y: originPoint.y,
//               }}
//               animate={{
//                 scale: [0.3, 1.2, 2.2, 3.2],
//                 opacity: [0, 0.6, 0.4, 0.2, 0],
//                 x: [originPoint.x, originPoint.x + xMove * 0.25, originPoint.x + xMove * 0.6, originPoint.x + xMove],
//                 y: [originPoint.y, originPoint.y + yMove * 0.25, originPoint.y + yMove * 0.6, originPoint.y + yMove],
//                 rotate: [0, Math.random() * 360 - 180],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 4,
//                 ease: "easeOut",
//                 delay: 0.3 + Math.random() * 0.7,
//               }}
//             />
//           );
//         })}

//         {/* Extra-large explosive particles that go everywhere */}
//         {[...Array(18)].map((_, i) => {
//           const size = Math.random() * 140 + 100; // Very large particles
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 1200 + 500; // Even longer distance
//           const originPoint = originPoints[Math.floor(Math.random() * originPoints.length)];
//           const xMove = Math.cos(angle * (Math.PI / 180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI / 180)) * distance;

//           return (
//             <motion.div
//               key={`explosive-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//               }}
//               initial={{
//                 scale: 0.5,
//                 opacity: 0,
//                 x: originPoint.x,
//                 y: originPoint.y,
//               }}
//               animate={{
//                 scale: [0.5, 1.0, 1.8, 2.5, 3.2],
//                 opacity: [0, 0.7, 0.5, 0.3, 0],
//                 x: [originPoint.x, originPoint.x + xMove * 0.2, originPoint.x + xMove * 0.6, originPoint.x + xMove],
//                 y: [originPoint.y, originPoint.y + yMove * 0.2, originPoint.y + yMove * 0.6, originPoint.y + yMove],
//                 rotate: [0, Math.random() * 360 - 180],
//               }}
//               transition={{
//                 duration: 5 + Math.random() * 3,
//                 ease: [0.19, 1, 0.22, 1],
//                 delay: 0.15 + Math.random() * 0.3,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Soft smoke colors with reduced opacity
// const smokeColors = [
//   "rgba(255, 255, 255, 0.4)",
//   "rgba(245, 245, 245, 0.35)",
//   "rgba(230, 230, 230, 0.3)",
//   "rgba(210, 210, 210, 0.25)",
//   "rgba(200, 200, 200, 0.3)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       const timer = setTimeout(() => setShowSmoke(false), 6000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <div className="absolute w-full h-full flex items-center justify-center">
//         {/* Soft initial puffs */}
//         {[...Array(6)].map((_, i) => {
//           const size = Math.random() * 100 + 60;
//           return (
//             <motion.div
//               key={`puff-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 3}px)`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//                 x: (Math.random() - 0.5) * 40,
//                 y: (Math.random() - 0.5) * 40,
//               }}
//               animate={{
//                 scale: [0.1, 0.8, 1.2],
//                 opacity: [0, 0.4, 0],
//                 y: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60 - 40],
//               }}
//               transition={{
//                 duration: 2.5,
//                 ease: "easeOut",
//                 delay: Math.random() * 0.3,
//               }}
//             />
//           );
//         })}

//         {/* Main smoke body */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 120 + 80;
//           return (
//             <motion.div
//               key={`main-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2.5}px)`,
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//                 x: (Math.random() - 0.5) * 60,
//                 y: (Math.random() - 0.5) * 60,
//               }}
//               animate={{
//                 scale: [0.2, 1, 1.8],
//                 opacity: [0, 0.3, 0],
//                 x: [
//                   (Math.random() - 0.5) * 60,
//                   (Math.random() - 0.5) * 150,
//                 ],
//                 y: [
//                   (Math.random() - 0.5) * 60,
//                   (Math.random() - 0.5) * 60 - 140,
//                 ],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 ease: "easeOut",
//                 delay: 0.5 + Math.random() * 0.5,
//               }}
//             />
//           );
//         })}

//         {/* Rising tendrils */}
//         {[...Array(12)].map((_, i) => {
//           const size = Math.random() * 70 + 40;
//           const xOffset = (Math.random() - 0.5) * 100;
//           return (
//             <motion.div
//               key={`tendril-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//                 x: xOffset,
//                 y: 20,
//               }}
//               animate={{
//                 scale: [0.1, 0.6, 1.2],
//                 opacity: [0, 0.25, 0],
//                 x: [xOffset, xOffset + (Math.random() - 0.5) * 100],
//                 y: [20, -100, -220],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 2,
//                 ease: "easeOut",
//                 delay: 1 + Math.random() * 0.8,
//               }}
//             />
//           );
//         })}

//         {/* Distant wisps */}
//         {[...Array(8)].map((_, i) => {
//           const size = Math.random() * 90 + 60;
//           const angle = Math.random() * 360;
//           const distance = Math.random() * 200 + 100;
//           const xMove = Math.cos(angle * (Math.PI / 180)) * distance;
//           const yMove = Math.sin(angle * (Math.PI / 180)) * distance - 100;

//           return (
//             <motion.div
//               key={`wisp-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 1.8}px)`,
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//                 x: 0,
//                 y: 0,
//               }}
//               animate={{
//                 scale: [0.2, 0.8, 1.4],
//                 opacity: [0, 0.2, 0],
//                 x: [0, xMove * 0.4, xMove],
//                 y: [0, yMove * 0.4, yMove],
//                 rotate: [0, Math.random() * 90 - 45],
//               }}
//               transition={{
//                 duration: 4.5,
//                 ease: "easeOut",
//                 delay: 1.5 + Math.random() * 1,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;






//GENTLE NATURAL SMOKE.....

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Soft smoke colors with reduced opacity
// const smokeColors = [
//   "rgba(255, 255, 255, 0.65)",
//   "rgba(252, 252, 252, 0.6)",
//   "rgba(250, 250, 250, 0.55)",
//   "rgba(248, 248, 248, 0.5)",
//   "rgba(245, 245, 245, 0.55)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       const timer = setTimeout(() => setShowSmoke(false), 6000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <div className="absolute w-full h-full">
//         {/* Distributed smoke particles across the entire container */}
//         {[...Array(30)].map((_, i) => {
//           const size = Math.random() * 120 + 60;
//           // Random positions across the entire container
//           const startX = Math.random() * 100; // 0-100% of container width
//           const startY = Math.random() * 100; // 0-100% of container height

//           return (
//             <motion.div
//               key={`smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2.5}px)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.2, 1, 1.5],
//                 opacity: [0, 0.3, 0],
//                 x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 100],
//                 y: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 100 - 50],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 ease: "easeOut",
//                 delay: Math.random() * 1.5,
//               }}
//             />
//           );
//         })}

//         {/* Additional slow-moving background smoke */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 150 + 100;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;

//           return (
//             <motion.div
//               key={`bg-smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2}px)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//               }}
//               initial={{
//                 scale: 0.3,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.3, 0.8, 1.2],
//                 opacity: [0, 0.2, 0],
//                 rotate: [0, Math.random() * 45 - 22.5],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 3,
//                 ease: "easeInOut",
//                 delay: 0.5 + Math.random() * 2,
//               }}
//             />
//           );
//         })}

//         {/* Small detailed smoke particles */}
//         {[...Array(20)].map((_, i) => {
//           const size = Math.random() * 60 + 30;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;

//           return (
//             <motion.div
//               key={`detail-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 3}px)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.1, 0.6, 1],
//                 opacity: [0, 0.35, 0],
//                 x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60],
//                 y: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60 - 40],
//               }}
//               transition={{
//                 duration: 2.5 + Math.random() * 1.5,
//                 ease: "easeOut",
//                 delay: Math.random() * 1,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;


//HECTIC SMOKE NICE



// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Bright, shining white colors
// const smokeColors = [
//   "rgba(255, 255, 255, 0.85)",
//   "rgba(255, 255, 255, 0.8)",
//   "rgba(255, 255, 255, 0.75)",
//   "rgba(254, 254, 254, 0.9)",
//   "rgba(253, 253, 253, 0.95)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       const timer = setTimeout(() => setShowSmoke(false), 6000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//       <div className="absolute w-full h-full">
//         {/* Distributed smoke particles across the entire container */}
//         {[...Array(30)].map((_, i) => {
//           const size = Math.random() * 120 + 60;
//           // Random positions across the entire container
//           const startX = Math.random() * 100; // 0-100% of container width
//           const startY = Math.random() * 100; // 0-100% of container height

//           return (
//             <motion.div
//               key={`smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 3}px) brightness(1.5)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.5)',
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.2, 1, 1.5],
//                 opacity: [0, 0.65, 0], // Increased brightness
//                 x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 100],
//                 y: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 100 - 50],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 ease: "easeOut",
//                 delay: Math.random() * 1.5,
//               }}
//             />
//           );
//         })}

//         {/* Additional slow-moving background smoke */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 150 + 100;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;

//           return (
//             <motion.div
//               key={`bg-smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 2.5}px) brightness(1.4)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 boxShadow: '0 0 25px 8px rgba(255, 255, 255, 0.45)',
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.3,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.3, 0.8, 1.2],
//                 opacity: [0, 0.55, 0], // Increased brightness
//                 rotate: [0, Math.random() * 45 - 22.5],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 3,
//                 ease: "easeInOut",
//                 delay: 0.5 + Math.random() * 2,
//               }}
//             />
//           );
//         })}

//         {/* Small detailed smoke particles */}
//         {[...Array(20)].map((_, i) => {
//           const size = Math.random() * 60 + 30;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;

//           return (
//             <motion.div
//               key={`detail-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 backgroundColor: smokeColors[Math.floor(Math.random() * smokeColors.length)],
//                 filter: `blur(${size / 4}px) brightness(1.6)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.6)',
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: [0.1, 0.6, 1],
//                 opacity: [0, 0.7, 0], // Increased brightness
//                 x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60],
//                 y: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60 - 40],
//               }}
//               transition={{
//                 duration: 2.5 + Math.random() * 1.5,
//                 ease: "easeOut",
//                 delay: Math.random() * 1,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;






//purple fade out AND LESS SLOW MOTION

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // Bright, shining white colors
// const smokeColors = [
//   "rgba(255, 255, 255, 0.85)",
//   "rgba(255, 255, 255, 0.8)",
//   "rgba(255, 255, 255, 0.75)",
//   "rgba(254, 254, 254, 0.9)",
//   "rgba(253, 253, 253, 0.95)",
// ];

// // Purple fade colors
// const purpleColors = [
//   "rgba(31, 4, 58, 0.85)",
//   "rgb(34, 4, 66)",
//   "rgba(12, 1, 22, 0.75)",
//   "rgba(110, 38, 187, 0.9)",
//   "rgba(27, 24, 191, 0.95)",
// ];

// function SmokeEffect({ isVisible }) {
//   const [showSmoke, setShowSmoke] = useState(isVisible);

//   useEffect(() => {
//     if (isVisible) {
//       setShowSmoke(true);
//       const timer = setTimeout(() => setShowSmoke(false), 5000); // Reduced to 5 seconds for faster effect
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   if (!showSmoke) return null;

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//       <div className="absolute w-full h-full">
//         {/* Main smoke particles */}
//         {[...Array(25)].map((_, i) => {
//           const size = Math.random() * 120 + 60;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const whiteColor = smokeColors[Math.floor(Math.random() * smokeColors.length)];
//           const purpleColor = purpleColors[Math.floor(Math.random() * purpleColors.length)];
//           const duration = 2.2 + Math.random() * 0.8; // Much faster
//           const purpleTiming = 0.5 + Math.random() * 0.3; // Fixed timing rather than percentage

//           // Generate path with quick, dynamic movement
//           const endX = (Math.random() - 0.5) * 200;
//           const endY = (Math.random() - 0.5) * 180 - 80;

//           return (
//             <motion.div
//               key={`smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 filter: `blur(${size / 3}px) brightness(1.5)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.2,
//                 opacity: 0,
//                 backgroundColor: whiteColor,
//                 boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.5)',
//                 x: 0,
//                 y: 0
//               }}
//               animate={{
//                 scale: [0.2, 0.6, 1.2],
//                 opacity: [0, 0.7, 0],
//                 x: [0, endX * 0.4, endX],
//                 y: [0, endY * 0.3, endY],
//               }}
//               transition={{
//                 duration: duration,
//                 times: [0, 0.4, 1], // Quick ramp up, slower fade out
//                 ease: ["circOut", "circOut", "circOut"], // Quick acceleration
//                 delay: Math.random() * 0.4, // Minimal delays
//               }}
//             >
//               <motion.div
//                 className="absolute inset-0 rounded-full"
//                 initial={{ backgroundColor: whiteColor, boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.5)' }}
//                 animate={{
//                   backgroundColor: purpleColor,
//                   boxShadow: '0 0 20px 5px rgba(160, 100, 220, 0.5)'
//                 }}
//                 transition={{
//                   duration: 0.6, // Faster color transition
//                   delay: purpleTiming,
//                   ease: "easeIn", // Quick color change
//                 }}
//               />
//             </motion.div>
//           );
//         })}

//         {/* Background smoke particles */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 150 + 100;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const whiteColor = smokeColors[Math.floor(Math.random() * smokeColors.length)];
//           const purpleColor = purpleColors[Math.floor(Math.random() * purpleColors.length)];
//           const duration = 2.5 + Math.random() * 1; // Faster background
//           const purpleTiming = 0.4 + Math.random() * 0.2; // Quicker color change

//           return (
//             <motion.div
//               key={`bg-smoke-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 filter: `blur(${size / 2.5}px) brightness(1.4)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.3,
//                 opacity: 0,
//                 backgroundColor: whiteColor,
//                 boxShadow: '0 0 25px 8px rgba(255, 255, 255, 0.45)',
//                 rotate: 0
//               }}
//               animate={{
//                 scale: [0.3, 0.7, 1.1],
//                 opacity: [0, 0.6, 0],
//                 rotate: [0, Math.random() > 0.5 ? 20 : -20],
//               }}
//               transition={{
//                 duration: duration,
//                 times: [0, 0.5, 1],
//                 ease: "circOut", // Fast acceleration
//                 delay: Math.random() * 0.6,
//               }}
//             >
//               <motion.div
//                 className="absolute inset-0 rounded-full"
//                 initial={{ backgroundColor: whiteColor, boxShadow: '0 0 25px 8px rgba(255, 255, 255, 0.45)' }}
//                 animate={{
//                   backgroundColor: purpleColor,
//                   boxShadow: '0 0 25px 8px rgba(160, 100, 220, 0.45)'
//                 }}
//                 transition={{
//                   duration: 0.7, // Faster color transition
//                   delay: purpleTiming,
//                   ease: "easeIn", // Quick color transition
//                 }}
//               />
//             </motion.div>
//           );
//         })}

//         {/* Small detailed particles - fast and dynamic */}
//         {[...Array(30)].map((_, i) => {
//           const size = Math.random() * 60 + 20;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const whiteColor = smokeColors[Math.floor(Math.random() * smokeColors.length)];
//           const purpleColor = purpleColors[Math.floor(Math.random() * purpleColors.length)];
//           const duration = 1.8 + Math.random() * 0.7; // Very fast small particles
//           const purpleTiming = 0.2 + Math.random() * 0.2; // Almost immediate color transition

//           // Quick, direct path
//           const endX = (Math.random() - 0.5) * 140;
//           const endY = (Math.random() - 0.5) * 140 - 60;

//           return (
//             <motion.div
//               key={`detail-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 filter: `blur(${size / 4}px) brightness(1.6)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0.1,
//                 opacity: 0,
//                 backgroundColor: whiteColor,
//                 boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.6)',
//                 x: 0,
//                 y: 0
//               }}
//               animate={{
//                 scale: [0.1, 0.5, 0.9],
//                 opacity: [0, 0.8, 0],
//                 x: [0, endX * 0.6, endX],
//                 y: [0, endY * 0.5, endY],
//               }}
//               transition={{
//                 duration: duration,
//                 times: [0, 0.3, 1], // Very quick start, slower end
//                 ease: ["circOut", "circOut", "easeOut"], // Strong initial acceleration
//                 delay: Math.random() * 0.3,
//               }}
//             >
//               <motion.div
//                 className="absolute inset-0 rounded-full"
//                 initial={{ backgroundColor: whiteColor, boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.6)' }}
//                 animate={{
//                   backgroundColor: purpleColor,
//                   boxShadow: '0 0 15px 5px rgba(160, 100, 220, 0.6)'
//                 }}
//                 transition={{
//                   duration: 0.5, // Very fast color change
//                   delay: purpleTiming,
//                   ease: "easeIn",
//                 }}
//               />
//             </motion.div>
//           );
//         })}

//         {/* Quick burst particles for immediate effect */}
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 40 + 15;
//           const startX = Math.random() * 100;
//           const startY = Math.random() * 100;
//           const whiteColor = smokeColors[Math.floor(Math.random() * smokeColors.length)];
//           const purpleColor = purpleColors[Math.floor(Math.random() * purpleColors.length)];
//           const duration = 1.2 + Math.random() * 0.5; // Ultra fast burst
//           const purpleTiming = 0.1 + Math.random() * 0.1; // Almost immediate color

//           // Quick explosive paths
//           const endX = (Math.random() - 0.5) * 180;
//           const endY = (Math.random() - 0.5) * 180 - 40;

//           return (
//             <motion.div
//               key={`burst-${i}`}
//               className="absolute rounded-full"
//               style={{
//                 width: size,
//                 height: size,
//                 filter: `blur(${size / 5}px) brightness(1.8)`,
//                 left: `${startX}%`,
//                 top: `${startY}%`,
//                 mixBlendMode: 'lighten',
//                 pointerEvents: 'none'
//               }}
//               initial={{
//                 scale: 0,
//                 opacity: 0,
//                 backgroundColor: whiteColor,
//                 boxShadow: '0 0 12px 4px rgba(255, 255, 255, 0.7)',
//                 x: 0,
//                 y: 0
//               }}
//               animate={{
//                 scale: [0, 0.8, 1],
//                 opacity: [0, 0.9, 0],
//                 x: [0, endX],
//                 y: [0, endY],
//               }}
//               transition={{
//                 duration: duration,
//                 times: [0, 0.2, 1], // Extremely fast start
//                 ease: "circOut", // Strong acceleration
//                 delay: Math.random() * 0.2, // Minimal delays
//               }}
//             >
//               <motion.div
//                 className="absolute inset-0 rounded-full"
//                 initial={{ backgroundColor: whiteColor, boxShadow: '0 0 12px 4px rgba(255, 255, 255, 0.7)' }}
//                 animate={{
//                   backgroundColor: purpleColor,
//                   boxShadow: '0 0 12px 4px rgba(160, 100, 220, 0.7)'
//                 }}
//                 transition={{
//                   duration: 0.3, // Ultra fast color change
//                   delay: purpleTiming,
//                   ease: "easeIn",
//                 }}
//               />
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SmokeEffect;


//BEST ONE YET

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

function SmokeEffect({ isVisible }) {
  const [showSmoke, setShowSmoke] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShowSmoke(true);
      const timer = setTimeout(() => setShowSmoke(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!showSmoke) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute w-full h-full ">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 120 + 60;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const whiteColor =
            smokeColors[Math.floor(Math.random() * smokeColors.length)];
          const purpleColor =
            purpleColors[Math.floor(Math.random() * purpleColors.length)];
          const duration = 3.5 + Math.random() * 2;

          const mid1X = (Math.random() - 0.5) * 100;
          const mid1Y = (Math.random() - 0.5) * 100 - 50;
          const mid2X = mid1X + (Math.random() - 0.5) * 80;
          const mid2Y = mid1Y + (Math.random() - 0.5) * 80 - 50;
          const endX = mid2X + (Math.random() - 0.5) * 60;
          const endY = mid2Y + (Math.random() - 0.5) * 60 - 50;

          return (
            <motion.div
              key={`smoke-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                filter: `blur(${size / 3}px) brightness(1.5)`,
                left: `${startX}%`,
                top: `${startY}%`,
                mixBlendMode: "lighten",
                pointerEvents: "none",
              }}
              initial={{
                scale: 0.3,
                opacity: 0,
                backgroundColor: whiteColor,
                boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0.3, 0.7, 1.1, 1.3],
                opacity: [0, 0.8, 0.6, 0],
                x: [0, mid1X, mid2X, endX],
                y: [0, mid1Y, mid2Y, endY],
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1],
                delay: Math.random() * 0.5,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{
                  backgroundColor: whiteColor,
                  boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
                }}
                animate={{
                  backgroundColor: purpleColor,
                  boxShadow: "0 0 20px 5px rgba(160, 100, 220, 0.5)",
                }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          );
        })}

        {/* Smaller detailed particles for subtle depth */}
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 50 + 20;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const whiteColor =
            smokeColors[Math.floor(Math.random() * smokeColors.length)];
          const purpleColor =
            purpleColors[Math.floor(Math.random() * purpleColors.length)];
          const duration = 2.5 + Math.random() * 1.5;

          const midX = (Math.random() - 0.5) * 60;
          const midY = (Math.random() - 0.5) * 60 - 30;
          const endX = midX + (Math.random() - 0.5) * 40;
          const endY = midY + (Math.random() - 0.5) * 40 - 30;

          return (
            <motion.div
              key={`small-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                filter: `blur(${size / 4}px) brightness(1.6)`,
                left: `${startX}%`,
                top: `${startY}%`,
                mixBlendMode: "lighten",
                pointerEvents: "none",
              }}
              initial={{
                scale: 0.2,
                opacity: 0,
                backgroundColor: whiteColor,
                boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.6)",
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0.2, 0.5, 0.8, 1],
                opacity: [0, 0.7, 0.5, 0],
                x: [0, midX, endX],
                y: [0, midY, endY],
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1],
                delay: Math.random() * 0.3,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{
                  backgroundColor: whiteColor,
                  boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.6)",
                }}
                animate={{
                  backgroundColor: purpleColor,
                  boxShadow: "0 0 15px 5px rgba(160, 100, 220, 0.6)",
                }}
                transition={{
                  duration: 0.9,
                  delay: Math.random() * 0.3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SmokeEffect;
