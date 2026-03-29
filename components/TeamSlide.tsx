"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Target, PenTool, Layout } from "lucide-react";

const TEAM_MEMBERS = {
  product: [
    { name: "Sahal Alarabi", role: "Product Manager / Operations" },
    { name: "Derek Homer", role: "Product Manager / Mentor" },
    { name: "Jason Gingras", role: "Product Manager / Mentor" },
    { name: "Cedric WEMIN", role: "Product Manager" },
    { name: "Stuti Garg", role: "Product Manager" },
    { name: "Sam Kisumbi", role: "Product Manager" },
  ],
  engineering: [
    { name: "Jibin Kunjumon" },
    { name: "Lifei Liu" },
    { name: "Hamza Chraim" },
    { name: "Youssef Mohammed Abdelal" },
  ],
  // You can safely delete this design array or empty it later without breaking the UI
  design: [{ name: "Hongjing Zhu", role: "Product Designer" }],
};

export function TeamSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Dynamically build the columns based on available data
  const columns = [
    {
      key: "product",
      title: "Product",
      icon: Target,
      members: TEAM_MEMBERS.product,
      theme: {
        text: "text-blue-400",
        bg: "bg-blue-500/20",
        subtext: "text-blue-300/70",
        MemberIcon: Shield,
      },
    },
    {
      key: "engineering",
      title: "Engineering",
      icon: Terminal,
      members: TEAM_MEMBERS.engineering,
      theme: {
        text: "text-violet-400",
        bg: "bg-violet-500/20",
        subtext: "text-violet-300/70",
        MemberIcon: Cpu,
      },
    },
  ];

  // Safely add the design column only if it exists and has members
  if (TEAM_MEMBERS.design && TEAM_MEMBERS.design.length > 0) {
    columns.push({
      key: "design",
      title: "UX & Design",
      icon: PenTool,
      members: TEAM_MEMBERS.design,
      theme: {
        text: "text-pink-400",
        bg: "bg-pink-500/20",
        subtext: "text-pink-300/70",
        MemberIcon: Layout,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#030712] text-white p-12 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-16 text-center pt-10"
      >
        The <span className="text-violet-500">Task Force</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl"
      >
        {columns.map((col) => {
          const SectionIcon = col.icon;
          const MemberIcon = col.theme.MemberIcon;

          return (
            <div key={col.key} className="flex-1 space-y-6">
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <SectionIcon className={`w-6 h-6 ${col.theme.text}`} />
                <h3
                  className={`text-2xl font-mono uppercase tracking-widest ${col.theme.text}`}
                >
                  {col.title}
                </h3>
              </div>

              {/* Members List */}
              {col.members.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${col.theme.bg} flex items-center justify-center shrink-0`}
                  >
                    <MemberIcon className={`w-6 h-6 ${col.theme.text}`} />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-white">
                      {member.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
