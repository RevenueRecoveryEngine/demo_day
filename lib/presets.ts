// lib/presets.ts — Three preset product URLs with deterministic simulated SCOUT outcomes.
// To add more presets, duplicate a preset object and adjust the ScoutRun fields.
// To connect a real backend, replace buildScoutRun() in scout-simulation.ts with a fetch() call.

import { ScoutRun } from './types';
import { generateScrapeId } from './utils';

export interface PresetUrl {
  label: string;
  url: string;
  scenario: 'shopify-success' | 'headless-escalation' | 'unknown-domain';
  description: string;
}

export const PRESET_URLS: PresetUrl[] = [
  {
    label: 'Shopify — Brake Kit',
    url: 'https://www.example-shop.com/products/performance-brake-kit',
    scenario: 'shopify-success',
    description: 'Known Shopify store · Tier 1 direct success',
  },
  {
    label: 'Next.js Store — LED Bulb',
    url: 'https://shop.example-store.com/products/led-headlight-bulb',
    scenario: 'headless-escalation',
    description: 'Provider detected · Headless escalation required',
  },
  {
    label: 'Unknown Site — Item #12345',
    url: 'https://www.unknownsite-demo.com/item/12345',
    scenario: 'unknown-domain',
    description: 'Unknown domain · Generic fallback + DATA_DROUGHT',
  },
];

function makeShopifyRun(url: string): ScoutRun {
  return {
    inputUrl: url,
    detectedDomain: 'example-shop.com',
    strategy: 'shopify-native',
    paginationType: 'cursor',
    antiBotTier: 'low',
    isKnownDomain: true,
    extractionSteps: [
      { id: 'direct', label: 'Direct Fetch', tier: 1, status: 'success', note: 'HTML retrieved (200)' },
      { id: 'provider', label: 'Provider Detection', tier: 1, status: 'success', note: 'Shopify detected' },
      { id: 'html', label: 'HTML Extraction', tier: 1, status: 'success', note: 'Reviews found via Shopify path' },
      { id: 'headless', label: 'Headless (ZenRows)', tier: 2, status: 'skipped', isEscalation: true },
      { id: 'apify', label: 'Apify Fallback', tier: 3, status: 'skipped', isEscalation: true },
    ],
    cascadeSteps: [
      { id: 'shopify-json', label: 'Shopify JSON', description: '/products/[handle].json', status: 'success', note: 'Listing text + variants extracted' },
      { id: 'headless-state', label: 'Headless State', description: '__NEXT_DATA__ / __REMIX_CONTEXT__', status: 'skipped' },
      { id: 'dom-jsonld', label: 'DOM / JSON-LD', description: 'Structured data fallback', status: 'skipped' },
    ],
    filterStats: {
      rawCount: 247,
      afterDedup: 231,
      afterWeakRemoval: 58,
      finalCount: 30,
      warningFlags: [],
    },
    outputSummary: {
      scrapeId: generateScrapeId(),
      strategy: 'shopify-native',
      listingTextSource: 'shopify-json',
      reviewCount: 30,
      topSignals: [
        { text: 'Stops on a dime, massive upgrade from OEM', rating: 5, signalScore: 0.97 },
        { text: 'Installed in 45 min, great fitment', rating: 5, signalScore: 0.94 },
        { text: 'Slightly squeaky at first, bedded in after 200 miles', rating: 4, signalScore: 0.89 },
      ],
      status: 'ready',
      warnings: [],
    },
  };
}

function makeHeadlessRun(url: string): ScoutRun {
  return {
    inputUrl: url,
    detectedDomain: 'example-store.com',
    strategy: 'next-js-headless',
    paginationType: 'offset',
    antiBotTier: 'medium',
    isKnownDomain: true,
    extractionSteps: [
      { id: 'direct', label: 'Direct Fetch', tier: 1, status: 'failed', note: 'Bot detected — 403 Forbidden' },
      { id: 'provider', label: 'Provider Detection', tier: 1, status: 'success', note: 'Judge.me detected' },
      { id: 'html', label: 'HTML Extraction', tier: 1, status: 'failed', note: 'Blocked by Cloudflare' },
      { id: 'headless', label: 'Headless (ZenRows)', tier: 2, status: 'success', note: 'Rendered JS page extracted', isEscalation: true },
      { id: 'apify', label: 'Apify Fallback', tier: 3, status: 'skipped', isEscalation: true },
    ],
    cascadeSteps: [
      { id: 'shopify-json', label: 'Shopify JSON', description: '/products/[handle].json', status: 'failed', note: 'Not a Shopify store' },
      { id: 'headless-state', label: 'Headless State', description: '__NEXT_DATA__ / __REMIX_CONTEXT__', status: 'success', note: 'Product data extracted from __NEXT_DATA__' },
      { id: 'dom-jsonld', label: 'DOM / JSON-LD', description: 'Structured data fallback', status: 'skipped' },
    ],
    filterStats: {
      rawCount: 89,
      afterDedup: 84,
      afterWeakRemoval: 37,
      finalCount: 30,
      warningFlags: [],
    },
    outputSummary: {
      scrapeId: generateScrapeId(),
      strategy: 'next-js-headless',
      listingTextSource: 'headless-state',
      reviewCount: 30,
      topSignals: [
        { text: 'Plug and play, no issues with my 2021 F-150', rating: 5, signalScore: 0.95 },
        { text: 'Brighter than stock, easy install', rating: 5, signalScore: 0.92 },
        { text: 'Decent quality but ran slightly warm', rating: 3, signalScore: 0.81 },
      ],
      status: 'ready',
      warnings: [],
    },
  };
}

function makeUnknownDomainRun(url: string): ScoutRun {
  return {
    inputUrl: url,
    detectedDomain: 'unknownsite-demo.com',
    strategy: 'generic-fallback',
    paginationType: 'page',
    antiBotTier: 'unknown',
    isKnownDomain: false,
    extractionSteps: [
      { id: 'direct', label: 'Direct Fetch', tier: 1, status: 'success', note: 'HTML retrieved (200)' },
      { id: 'provider', label: 'Provider Detection', tier: 1, status: 'failed', note: 'No known provider detected' },
      { id: 'html', label: 'HTML Extraction', tier: 1, status: 'failed', note: 'No structured reviews found' },
      { id: 'headless', label: 'Headless (ZenRows)', tier: 2, status: 'success', note: '12 reviews extracted from rendered DOM', isEscalation: true },
      { id: 'apify', label: 'Apify Fallback', tier: 3, status: 'skipped', isEscalation: true },
    ],
    cascadeSteps: [
      { id: 'shopify-json', label: 'Shopify JSON', description: '/products/[handle].json', status: 'failed', note: '404 Not Found' },
      { id: 'headless-state', label: 'Headless State', description: '__NEXT_DATA__ / __REMIX_CONTEXT__', status: 'failed', note: 'No Next.js or Remix state found' },
      { id: 'dom-jsonld', label: 'DOM / JSON-LD', description: 'Structured data fallback', status: 'success', note: 'Partial product data from JSON-LD' },
    ],
    filterStats: {
      rawCount: 12,
      afterDedup: 11,
      afterWeakRemoval: 6,
      finalCount: 6,
      warningFlags: ['DATA_DROUGHT'],
    },
    outputSummary: {
      scrapeId: generateScrapeId(),
      strategy: 'generic-fallback',
      listingTextSource: 'dom-json-ld',
      reviewCount: 6,
      topSignals: [
        { text: 'Good value for the price', rating: 4, signalScore: 0.72 },
        { text: 'Arrived fast, works as described', rating: 5, signalScore: 0.68 },
      ],
      status: 'warning',
      warnings: ['DATA_DROUGHT: only 6 reviews available after filtering'],
    },
  };
}

export function buildScoutRun(url: string): ScoutRun {
  // Match against known presets by URL pattern
  const preset = PRESET_URLS.find((p) => p.url === url);
  if (!preset) {
    // Default: treat as unknown domain
    const domain = url.replace(/^https?:\/\//, '').split('/')[0] || 'unknown';
    const run = makeUnknownDomainRun(url);
    run.detectedDomain = domain;
    return run;
  }
  switch (preset.scenario) {
    case 'shopify-success':
      return makeShopifyRun(url);
    case 'headless-escalation':
      return makeHeadlessRun(url);
    case 'unknown-domain':
    default:
      return makeUnknownDomainRun(url);
  }
}
