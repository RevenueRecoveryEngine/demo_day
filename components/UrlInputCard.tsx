'use client';
// components/UrlInputCard.tsx — URL input with presets and Go/Reset controls.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, Play } from 'lucide-react';
import { PRESET_URLS } from '@/lib/presets';

interface UrlInputCardProps {
  onStart: (url: string) => void;
  onReset: () => void;
  isRunning: boolean;
  isComplete: boolean;
}

export function UrlInputCard({ onStart, onReset, isRunning, isComplete }: UrlInputCardProps) {
  const [url, setUrl] = useState('');

  const handleStart = () => {
    const target = url.trim() || PRESET_URLS[0].url;
    onStart(target);
  };

  const selectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
  };

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="space-y-2">
        <p className="text-xs text-white/30 uppercase tracking-widest">Preset URLs</p>
        {PRESET_URLS.map((preset) => (
          <motion.button
            key={preset.url}
            onClick={() => selectPreset(preset.url)}
            disabled={isRunning}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
              url === preset.url
                ? 'border-violet-500/50 bg-violet-500/10 text-white'
                : 'border-white/8 bg-white/3 text-white/50 hover:border-white/15 hover:text-white/80'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <div className="text-sm font-medium">{preset.label}</div>
            <div className="text-xs text-white/30 mt-0.5 truncate">{preset.description}</div>
          </motion.button>
        ))}
      </div>

      {/* Custom URL input */}
      <div className="space-y-2">
        <p className="text-xs text-white/30 uppercase tracking-widest">Or enter a URL</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isRunning && handleStart()}
            disabled={isRunning}
            placeholder="https://example.com/products/..."
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!isRunning && !isComplete ? (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-violet-900/40"
          >
            <Play className="w-4 h-4" />
            Run SCOUT
          </motion.button>
        ) : (
          <>
            {isRunning && (
              <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-violet-500/30 border-t-violet-500 rounded-full"
                />
                Running…
              </div>
            )}
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {isComplete ? 'Replay' : 'Reset'}
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
