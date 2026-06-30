"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const ThoughtOfTheDay = () => {
  return (
    <section className="w-full bg-slate-50 py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#003366] text-white p-8 md:p-10 rounded-2xl text-center shadow-lg relative overflow-hidden">
          
          {/* Subtle decorative edge lines */}
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400"></div>

          <h3 className="text-sm md:text-base font-bold mb-4 tracking-widest uppercase flex justify-center items-center gap-3 text-amber-400">
            <FontAwesomeIcon icon={faLightbulb} className="text-amber-400" />
            Thought for the Day
          </h3>
          
          <p className="text-xl md:text-3xl font-serif font-medium italic text-gray-100 max-w-4xl mx-auto leading-relaxed">
            "Education is the key to unlocking the world, a passport to freedom."
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default ThoughtOfTheDay;