"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Target } from "lucide-react";

const TEAM_MEMBERS = {
  pm: [{ name: "Sahal Alarabi" }, { name: "Derek Homer" }],
  engineering: [
    { name: "Jibin Kunjumon" },
    { name: "Lifei Liu" },
    { name: "Hamza Chraim" },
    { name: "Youssef Mohammed Abdelal" },
  ],
  mentor: [{ name: "Jason Gingras" }],
};

export function TeamSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Dynamically build the columns based on available data
  const columns = [
    {
      key: "pm",
      title: "Product",
      icon: Target,
      members: TEAM_MEMBERS.pm,
      theme: {
        text: "text-blue-400",
        bg: "bg-blue-500/20",
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
        MemberIcon: Cpu,
      },
    },
  ];

  // Add mentor column if it exists and has members
  if (TEAM_MEMBERS.mentor && TEAM_MEMBERS.mentor.length > 0) {
    columns.push({
      key: "mentor",
      title: "Mentor",
      icon: Shield,
      members: TEAM_MEMBERS.mentor,
      theme: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/20",
        MemberIcon: Shield,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#030712] text-white p-12 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
