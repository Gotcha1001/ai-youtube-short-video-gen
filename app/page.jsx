"use client";
import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import SmokeEffect from "./_components/FramerMotion/SmokeEffect";
import FAQSection from "./_components/Faq";


function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Smoke Effect wrapping around Header */}
      <SmokeEffect />

      {/* Ensure Header is above smoke */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Hero Section */}
      <Hero />
      <FAQSection />
    </div>
  );
}

export default Home;
