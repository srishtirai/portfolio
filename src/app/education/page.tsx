"use client";

import { useState } from "react";
import Avatar from "../components/Avatar";

export default function Education() {
  const [activeTab, setActiveTab] = useState("northeastern"); // Tracks the active tab

  return (
    <section id="education" className="sm:min-h-[90vh] p-4 sm:p-8 mt-10 sm:mt-20 py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center mb-2">
        <h1 className="text-header font-bold sm:mr-4">Education</h1>
        <Avatar bubbleMessage="Degrees and debugging — both require patience!" sectionName="education" />
      </div>

      {/* Tabs */}
      <div className="tabs flex space-x-4 mb-0">
        <button
          className={`tab-button relative px-4 py-2 ${activeTab === "northeastern" ? "active border-x border-t border-accent rounded-t-lg" : "border-b border-transparent"}`}
          onClick={() => setActiveTab("northeastern")}
        >
          Northeastern University
        </button>
        <button
          className={`tab-button relative px-4 py-2 ${activeTab === "rnsit" ? "active border-x border-t border-accent rounded-t-lg" : "border-b border-transparent"}`}
          onClick={() => setActiveTab("rnsit")}
        >
          RNS Institute of Technology
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content border border-accent rounded-b-[10px] p-6 shadow-md">
        {activeTab === "northeastern" && (
          <div>
            <h2 className="text-xl font-bold text-accent">Northeastern University</h2>
            <p>Master of Science in Software Engineering Systems</p>
            <p>Boston, MA | Sep 2023 - Expected Jun 2025</p>
            <p>
              <strong>Leadership & Mentorship:</strong> Teaching Assistant (Spring 2025), Mentor for OASIS (Spring 2025)
            </p>
          </div>
        )}
        {activeTab === "rnsit" && (
          <div>
            <h2 className="text-xl font-bold text-accent">RNS Institute of Technology</h2>
            <p>Bachelor of Engineering in Computer Science & Engineering</p>
            <p>Bangalore, India | Jul 2016 - Aug 2020</p>
          </div>
        )}
      </div>
    </section>
  );
}
