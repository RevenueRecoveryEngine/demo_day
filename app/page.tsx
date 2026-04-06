'use client'

import Navigation from '@/components/ui/Navigation'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import Scene1Hook from '@/components/scenes/Scene1Hook'
import Scene2Problem from '@/components/scenes/Scene2Problem'
import Scene3Breakdown from '@/components/scenes/Scene3Breakdown'
import Scene4IntroRRE from '@/components/scenes/Scene4IntroRRE'
import Scene5Pipeline from '@/components/scenes/Scene5Pipeline'
import HorizontalScroll from '@/components/ui/HorizontalScroll'
import Scene6BeforeAfter from '@/components/scenes/Scene6BeforeAfter'
import Scene7Architecture from '@/components/scenes/Scene7Architecture'
import SceneTechStack from '@/components/scenes/SceneTechStack'
import SceneTeam from '@/components/scenes/SceneTeam'
import SceneWhatsNext from '@/components/scenes/SceneWhatsNext'
import Scene8FinalImpact from '@/components/scenes/Scene8FinalImpact'
import ScenePipelineContract from '@/components/scenes/ScenePipelineContract'

export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <ParticleCanvas />

      <main>
        {/* 1. Hook — "We built RRE. An agentic AI system from scratch." */}
        <Scene1Hook />

        {/* 2. The Problem — Amazon seller pain: bad listings, buried reviews, lost revenue */}
        <Scene2Problem />

        {/* 3. Breakdown — Same product, two realities. Expectation gap. */}
        <Scene3Breakdown />

        {/* 4. Turning Point — Introducing RRE */}
        <Scene4IntroRRE />

        {/* 5. What We Built — SCOUT → CRITIC → PRESCRIBER pipeline */}
        <Scene5Pipeline />

        {/* 6. Horizontal scroll interlude */}
        <HorizontalScroll />

        {/* 7. Technical Output — Before / After listing transformation */}
        {/* <Scene6BeforeAfter /> */}
        <ScenePipelineContract />
        {/* 8. Architecture — System diagram + pipeline simulation */}
        <Scene7Architecture />

        

        {/* 9. Tech Stack — Tool choices + engineering-honest Demo Mode note */}
        <SceneTechStack />

        {/* 10. The Team — Sahal, Youssef, Jibin, Hamza */}
        <SceneTeam />

        {/* 11. What's Next — Phase 2 connector → Phase 3 App Store → Phase 4 Enterprise */}
        <SceneWhatsNext />

        {/* 12. Final Impact */}
        <Scene8FinalImpact />
      </main>
    </>
  )
}
