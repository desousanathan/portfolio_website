# Complete Coding Walkthrough: Building Your Portfolio Website

This document walks you through **exactly** how your portfolio website was built, step-by-step. Read this alongside the EDUCATIONAL_README.md for the full learning experience.

---

## Table of Contents
1. [Project Setup & Initialization](#project-setup--initialization)
2. [Environment & Configuration](#environment--configuration)
3. [Building the Foundation](#building-the-foundation)
4. [Creating Reusable Hooks](#creating-reusable-hooks)
5. [Building Components Step-by-Step](#building-components-step-by-step)
6. [Integrating GitHub API for Dynamic Projects](#integrating-github-api-for-dynamic-projects)
7. [Styling Everything with Tailwind](#styling-everything-with-tailwind)
8. [Animations & Effects](#animations--effects)
9. [Page Assembly & Content](#page-assembly--content)
10. [Performance Optimization](#performance-optimization)
11. [Common Tasks & Patterns](#common-tasks--patterns)

---

## Project Setup & Initialization

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest project --typescript --tailwind
```

This command:
- Creates a new directory called `project`
- Sets up TypeScript (strict type checking)
- Installs and configures Tailwind CSS
- Creates Next.js default file structure

### Step 2: Project Structure Created
```
project/
├── src/
│   ├── app/              # App Router (Next.js 13+ feature)
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static files
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind settings
└── next.config.ts        # Next.js settings
```

**Why this structure?**
- `src/` keeps code organized
- `components/` groups UI building blocks
- `hooks/` centralizes React logic
- `lib/` holds pure functions

---

## Environment & Configuration

### Step 3: TypeScript Configuration
File: `tsconfig.json`

Key settings:
```json
{
  "compilerOptions": {
    "strict": true,           // Catch more errors
    "target": "ES2020",       // Modern JavaScript
    "module": "ES2020",       // ES modules
    "moduleResolution": "bundler",
    "resolveJsonModule": true
  }
}
```

**Why strict mode?**
- Prevents `any` type (forces explicit types)
- Catches null/undefined errors
- Makes code more maintainable

### Step 4: Install Dependencies
```bash
npm install
```

**Key dependencies installed:**
- `react` & `react-dom` - UI library
- `next` - Framework
- `tailwindcss` - Utility CSS
- `typescript` - Type checking
- `framer-motion` - Animations
- `clsx` & `tailwind-merge` - Dynamic classes

---

## Building the Foundation

### Step 5: Create Global Styles
File: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This imports Tailwind's three layers:
1. **base** - Default styles (h1, p, etc.)
2. **components** - Reusable classes (.btn, .card, etc.)
3. **utilities** - Single-purpose classes (.m-4, .text-blue-500)

### Step 6: Define Design System
File: `tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefdf0',
          500: '#d4af37',
          // ... more shades
        },
        teal: {
          50: '#f0fffe',
          500: '#4a9b8e',
          // ... more shades
        }
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)'],
        mono: ['var(--font-jetbrains-mono)'],
        serif: ['var(--font-inter)']
      }
    }
  }
}
```

**Why define here?**
- Single source of truth for colors, fonts, spacing
- Ensures consistency across entire site
- Easy to update branding (change one place, updates everywhere)

### Step 7: Set Up Fonts
File: `src/app/layout.tsx`

```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600']
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500']
});
```

**Why import from Next.js?**
- Auto-optimizes font loading
- Prevents layout shift (CLS)
- Fonts load from Google CDN
- Variables allow CSS to access fonts

---

## Creating Reusable Hooks

### Step 8: Build useScrollProgress Hook
File: `src/hooks/useScrollProgress.ts`

**What it does:** Tracks how far down the page you've scrolled (0-100%)

```typescript
import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;

    function handleScroll() {
      // Use requestAnimationFrame for performance
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;

        // Calculate progress (0-100)
        setProgress((scrolled / docHeight) * 100);
        setScrollY(scrolled);
      });
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { progress, scrollY };
}
```

**Key concepts:**
1. **requestAnimationFrame** - Syncs with browser refresh (60fps max)
2. **Passive listeners** - Tells browser scroll won't call preventDefault()
3. **Cleanup** - Remove listeners on unmount to prevent memory leaks

### Step 9: Build useScrollReveal Hook
File: `src/hooks/useScrollReveal.ts`

**What it does:** Triggers animations when elements enter viewport

```typescript
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once revealed
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

**Key concepts:**
1. **IntersectionObserver** - Native browser API, more efficient than scroll listeners
2. **Threshold** - When to trigger (0.1 = 10% of element visible)
3. **Unobserve** - Stop watching after first trigger

---

## Building Components Step-by-Step

### Step 10: Create Landscape Component (The Parallax Background)
File: `src/components/background/Landscape.tsx`

This is the most complex component. Built in layers:

**Layer 1: Initialize with Client-Side Hook**
```typescript
'use client'; // Enable React hooks

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function Landscape() {
  const { scrollY } = useScrollProgress(); // Get scroll position
  // scrollY updates as user scrolls
}
```

**Layer 2: Create SVG Layers**
```typescript
return (
  <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
    <svg viewBox="0 0 1440 900" className="w-full h-full">
      {/* SVG content here */}
    </svg>
  </div>
);
```

**Layer 3: Add Parallax Motes (Floating Particles)**
```typescript
// Create deterministic "random" particles
const motes = Array.from({ length: 30 }, (_, i) => {
  const seed = i;
  const x = seeded(seed) * 1440; // Random X position
  const y = seeded(seed + 1) * 900; // Random Y position
  const opacity = 0.3 + seeded(seed + 2) * 0.4;

  return (
    <circle
      key={i}
      cx={x}
      cy={y}
      r="2"
      fill="currentColor"
      opacity={opacity}
      style={{
        transform: `translateY(${scrollY * 0.3}px)` // Parallax: 30% of scroll
      }}
    />
  );
});
```

**Why seeded randomness?**
- Server renders same particles as client (prevents hydration mismatch)
- Without this, particles would flicker during page load

**Layer 4: Add Sun with Blur Animation**
```typescript
<g>
  <defs>
    <filter id="sunBlur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
    </filter>
  </defs>
  <circle
    cx="1200"
    cy="100"
    r="120"
    fill="rgba(212, 175, 55, 0.3)"
    filter="url(#sunBlur)"
    className="animate-sunPulse"
  />
</g>
```

**Layer 5: Add Ridge Layers with Different Parallax Speeds**
```typescript
// Back ridge (moves slowly)
<path
  d="M 0 600 Q 360 500 720 600 T 1440 600 L 1440 900 L 0 900"
  fill="rgba(74, 155, 142, 0.1)"
  style={{
    transform: `translateY(${scrollY * 0.2}px)` // 20% speed
  }}
/>

// Mid ridge (moves medium)
<path
  d="M 0 700 Q 360 650 720 700 T 1440 700 L 1440 900 L 0 900"
  fill="rgba(74, 155, 142, 0.15)"
  style={{
    transform: `translateY(${scrollY * 0.35}px)` // 35% speed
  }}
/>

// Front ridge (moves fastest)
<path
  d="M 0 800 Q 360 750 720 800 T 1440 800 L 1440 900 L 0 900"
  fill="rgba(74, 155, 142, 0.2)"
  style={{
    transform: `translateY(${scrollY * 0.5}px)` // 50% speed
  }}
/>
```

**The Parallax Effect Explained:**
- Back layer multiplier: 0.2 (slowest, in background)
- Mid layer multiplier: 0.35 (medium speed)
- Front layer multiplier: 0.5 (fastest, in foreground)
- This creates depth illusion: closer = moves faster

### Step 11: Create Progress Line Component
File: `src/components/ui/ProgressLine.tsx`

```typescript
'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ProgressLine() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold-500 to-teal-500 z-50"
      style={{
        width: `${progress}%`,
        transition: 'width 0.1s ease-out'
      }}
    />
  );
}
```

**How it works:**
1. Get scroll progress (0-100%)
2. Set div width to that percentage
3. Smooth CSS transition makes it flow
4. Fixed positioning keeps it at top always

### Step 12: Create Navbar Component
File: `src/components/ui/Navbar.tsx`

```typescript
'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function Navbar() {
  const { scrollY } = useScrollProgress();

  // Add blur effect when scrolled
  const isScrolled = scrollY > 50;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md' : 'bg-transparent'}`}
    >
      {/* Navigation items */}
    </nav>
  );
}
```

**Pattern here:**
- Use scroll position to trigger conditional styles
- Backdropblur creates modern frosted glass effect
- Transition makes changes smooth

### Step 13: Create Hero Section Component
File: `src/components/sections/Hero.tsx`

```typescript
'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Hero() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center
        transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
    >
      <h1 className="text-5xl font-bold text-gold-500">
        Welcome to My Portfolio
      </h1>
      <p className="text-xl text-teal-400 mt-4">
        Building beautiful web experiences
      </p>
    </section>
  );
}
```

**Animation pattern:**
1. Component ref attached to div
2. useScrollReveal watches when it enters viewport
3. isVisible state triggers CSS classes
4. opacity and translate-y create fade-up effect

---

## Integrating GitHub API for Dynamic Projects

### Step 14: Create GitHub API Utility
File: `src/lib/github.ts`

This utility fetches your real projects from GitHub instead of hardcoding them.

```typescript
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Optional: Add GitHub token for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      // Cache for 1 hour - don't fetch on every page load
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos: GitHubRepo[] = await response.json();

  // Keep only original repos (filter forks)
  // Sort by stars (most popular first)
  // Show top 9 repos
  return repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9);
}

export function getLanguageColor(language: string | null): 'gold' | 'violet' | 'teal' | 'slate' {
  // Map programming languages to accent colors
  const colorMap: Record<string, 'gold' | 'violet' | 'teal' | 'slate'> = {
    TypeScript: 'gold',
    Python: 'violet',
    JavaScript: 'teal',
    // ... more mappings
  };

  return (language && colorMap[language]) || 'slate';
}
```

**How it works:**
1. **fetch()** - Makes HTTP request to GitHub API
2. **response.json()** - Parses GitHub's response into JavaScript objects
3. **Filter** - Removes forks (copies) of other people's projects
4. **Sort** - Arranges by star count (popularity indicator)
5. **Slice** - Takes only top 9 repos
6. **Caching** - `next: { revalidate: 3600 }` tells Next.js to cache for 1 hour

### Step 15: Update Projects Section (Server Component)
File: `src/components/sections/ProjectsSection.tsx`

The key insight: **This is now a server component** (no 'use client' directive).

```typescript
// No 'use client' here - this runs on the SERVER
import { fetchGitHubRepos, getLanguageColor } from "@/lib/github";
import ProjectCardClient from "./ProjectCard";

export async function ProjectsSection() {
  // Fetch repos on server (secure, efficient)
  const repos = await fetchGitHubRepos("desousanathan");

  return (
    <section id="projects" className="mx-auto max-w-5xl px-[8vw] py-[90px]">
      <h2>Things I've shipped.</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {repos.length > 0 ? (
          repos.map((repo, i) => (
            // Pass data to CLIENT component
            <ProjectCardClient
              key={repo.id}
              repo={repo}
              accent={getLanguageColor(repo.language)}
              index={i}
            />
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </section>
  );
}
```

**Why server component?**
- GitHub API calls are secure on server (no API keys exposed)
- Fetches once per hour (revalidate), then cached
- Fast page loads (data already there when HTML sent to browser)

### Step 16: Create Project Card (Client Component)
File: `src/components/sections/ProjectCard.tsx`

```typescript
'use client';  // This MUST run in browser (uses hooks)

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type GitHubRepo } from "@/lib/github";

export default function ProjectCardClient({ repo, accent, index }) {
  // useScrollReveal needs React hooks - must be client component
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-in={inView}
      className={`group flex flex-col gap-3.5 rounded-2xl border border-white/10 p-6
        transition-all duration-300 hover:-translate-y-1.5`}
    >
      {/* Project name from GitHub */}
      <h3 className="font-display text-xl font-semibold text-white">
        {repo.name}
      </h3>

      {/* Star badge if popular */}
      {repo.stargazers_count > 10 && (
        <span className="rounded-md border px-2.5 py-1 font-mono text-[0.62rem]">
          ⭐ {repo.stargazers_count}
        </span>
      )}

      {/* Description from GitHub */}
      <p className="flex-1 text-sm leading-relaxed text-white/65">
        {repo.description || "No description provided"}
      </p>

      {/* Language + Topics as tags */}
      <div className="flex flex-wrap gap-1.5">
        {repo.language && (
          <span className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[0.68rem]">
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="rounded-md border px-2.5 py-1 font-mono text-[0.68rem]">
            {topic}
          </span>
        ))}
      </div>

      {/* Link to GitHub repo */}
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
      >
        View repo
        <span className="transition-transform group-hover:rotate-45">↗</span>
      </a>
    </div>
  );
}
```

**Why client component?**
- Uses `useScrollReveal` hook (React hook = must be client)
- Handles animations and interactions (scroll reveal)
- Receives data as props from server component

### Step 17: Optional - Add GitHub Token for Higher Rate Limits

If you deploy and fetch frequently, GitHub limits unauthenticated requests to 60/hour.

Add to `.env.local`:
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get token from: https://github.com/settings/tokens

The code already handles this:
```typescript
...(process.env.GITHUB_TOKEN && {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
})
```

**Benefits of GitHub API approach:**
- ✅ Projects always up-to-date (no manual updates)
- ✅ Star counts are live
- ✅ New repos appear automatically
- ✅ Easy to show/hide repos by adding topics
- ✅ One source of truth (your GitHub)

---

## Styling Everything with Tailwind

### Step 18: Understanding Tailwind Classes

**Spacing utilities:**
```jsx
<div className="p-4">      {/* padding: 1rem */}
<div className="m-2">      {/* margin: 0.5rem */}
<div className="mt-8">     {/* margin-top: 2rem */}
```

**Text utilities:**
```jsx
<h1 className="text-4xl font-bold text-gold-500">
{/* font-size: 2.25rem; font-weight: 700; color: gold */}

<p className="text-slate-400 leading-relaxed">
{/* color: light gray; line-height: loose */}
```

**Layout utilities:**
```jsx
<div className="flex flex-col justify-center items-center">
{/* display: flex; flex-direction: column; align/justify center */}

<div className="grid grid-cols-2 gap-4">
{/* display: grid; 2 equal columns; 1rem gap */}
```

**Responsive utilities:**
```jsx
<div className="text-sm md:text-base lg:text-lg">
{/* Small: 14px, Medium: 16px, Large: 18px */}
{/* md = 768px+, lg = 1024px+ */}
```

**State utilities:**
```jsx
<button className="bg-gold-500 hover:bg-gold-600 active:bg-gold-700">
{/* Changes color on hover and click */}
```

### Step 19: Create Custom Tailwind Classes
File: `src/app/globals.css`

```css
@layer components {
  .section-padding {
    @apply px-8 py-20 md:px-12 md:py-32;
  }

  .heading-primary {
    @apply text-4xl md:text-5xl font-bold text-gradient;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-gold-500 to-teal-500 bg-clip-text text-transparent;
  }

  .card {
    @apply bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6;
  }
}
```

**Why create custom classes?**
- Reduce repetition in JSX
- Easier to update styles everywhere
- Makes code more readable

---

## Animations & Effects

### Step 20: Define Keyframe Animations
File: `tailwind.config.ts`

```typescript
keyframes: {
  fadeUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  sunPulse: {
    '0%, 100%': { opacity: '0.3' },
    '50%': { opacity: '0.6' }
  },
  cloudDrift: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(20px)' }
  }
}
```

**How animations work:**
- 0% = starting state
- 100% = ending state
- Browser smoothly transitions between

### Step 21: Apply Animations with Classes

```typescript
<div className="animate-fadeUp">
  {/* Fades in and moves up */}
</div>

<div className="animate-sunPulse">
  {/* Pulsing opacity effect */}
</div>

<svg className="animate-cloudDrift">
  {/* Drifts back and forth */}
</svg>
```

### Step 22: Add CSS Filter Effects
File: `src/components/background/Landscape.tsx`

```typescript
// SVG filters
<defs>
  <filter id="sunBlur">
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
  </filter>
  <filter id="shadowFilter">
    <feDropShadow dx="0" dy="4" stdDeviation="6" />
  </filter>
</defs>

// Apply filters
<circle filter="url(#sunBlur)" r="120" />
<path filter="url(#shadowFilter)" />
```

---

## Page Assembly & Content

### Step 23: Create Root Layout
File: `src/app/layout.tsx`

```typescript
import { Landscape } from '@/components/background/Landscape';
import { ProgressLine } from '@/components/ui/ProgressLine';
import { Navbar } from '@/components/ui/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {/* Global components */}
        <Landscape />           {/* Fixed background */}
        <ProgressLine />        {/* Scroll progress bar */}
        <Navbar />              {/* Navigation */}
        <CustomCursor />        {/* Mouse cursor effect */}

        {/* Page content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
```

**Why this structure?**
- Fixed/background elements don't move with scroll
- `z-10` puts content above background
- Children (sections) render in main

### Step 24: Create Home Page
File: `src/app/page.tsx`

```typescript
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
```

**Pattern:**
- Import sections
- Render in order
- Browser creates single scrollable page

### Step 25: Create Reusable Section Component
File: `src/components/ui/Section.tsx`

```typescript
'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="heading-primary mb-12">
        {title}
      </h2>
      {children}
    </section>
  );
}
```

**Reusability benefit:**
- Once built, copy/use in multiple sections
- Same animation logic, different content
- Reduces code duplication

---

## Performance Optimization

### Step 26: Image Optimization
```typescript
import Image from 'next/image';

export function ProjectCard({ image, title }) {
  return (
    <div>
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        quality={80}        // Slightly compressed
        placeholder="blur"  // Show blur while loading
      />
    </div>
  );
}
```

**Why this matters:**
- Next.js resizes image for each screen size
- Blur placeholder prevents layout shift
- Quality 80 = good visual, smaller file

### Step 27: Code Splitting
```typescript
import dynamic from 'next/dynamic';

// Component loads only when needed
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Don't render on server
});

export function Page() {
  return <HeavyComponent />;
}
```

### Step 28: Optimize Animations
```typescript
// Good: Use transform (GPU accelerated)
style={{ transform: `translateY(${scrollY * 0.3}px)` }}

// Bad: Avoid changing top/left (causes reflow)
style={{ top: `${scrollY * 0.3}px` }}

// Good: Use will-change for hinted animations
className="will-change-transform"
```

---

## Common Tasks & Patterns

### Adding a New Section

**Step 1: Create component**
```typescript
// src/components/sections/NewSection.tsx
'use client';

import { Section } from '@/components/ui/Section';

export function NewSection() {
  return (
    <Section id="new" title="New Section">
      <p>Your content here</p>
    </Section>
  );
}
```

**Step 2: Import in page.tsx**
```typescript
import { NewSection } from '@/components/sections/NewSection';

export default function Home() {
  return (
    <>
      <Hero />
      <NewSection /> {/* Add here */}
      <Contact />
    </>
  );
}
```

### Adding Hover Effects

```typescript
<button className="
  px-4 py-2 bg-gold-500 text-white rounded
  hover:bg-gold-600           // Hover color
  hover:scale-105             // Slightly bigger
  hover:shadow-lg              // Add shadow
  transition-all duration-300 // Smooth animation
">
  Click me
</button>
```

### Creating Gradient Text

```typescript
<h1 className="
  text-4xl font-bold
  bg-gradient-to-r from-gold-500 via-teal-500 to-violet-500
  bg-clip-text
  text-transparent
">
  Gradient Text
</h1>
```

### Responsive Design

```typescript
<div className="
  grid
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // Columns
  gap-4 md:gap-6 lg:gap-8                     // Spacing
  px-4 md:px-8                                // Padding
">
  {/* Cards here */}
</div>
```

---

## Key Concepts Summary

### React Hooks Pattern
```typescript
function Component() {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Run after render
    return () => {
      // Cleanup before unmount
    };
  }, [dependencies]);

  return <div>{state}</div>;
}
```

### TypeScript Pattern
```typescript
interface Props {
  title: string;
  count: number;
  onComplete?: () => void;
}

export function Component({ title, count, onComplete }: Props) {
  return <div>{title}</div>;
}
```

### Conditional Classes Pattern
```typescript
const className = `
  base-classes
  ${isActive ? 'active-classes' : 'inactive-classes'}
  ${isDark ? 'dark-classes' : 'light-classes'}
`;

return <div className={className}>{content}</div>;
```

### Composition Pattern
```typescript
// Build with smaller components
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Action</CardFooter>
</Card>
```

---

## Debugging Tips

### Check Console Errors
```bash
# Terminal shows TypeScript errors
npm run build

# Browser console (F12) shows runtime errors
```

### Use React DevTools Browser Extension
- Inspect component hierarchy
- Check prop values
- Watch state changes

### Inspect Styles
- Right-click element → Inspect
- See which Tailwind classes apply
- Test class combinations live

### Performance Profiler
- Chrome DevTools → Performance tab
- Record, then see what causes slowness
- Check for unnecessary re-renders

---

## Learning Path

**Week 1: Foundations**
1. Understand TypeScript basics
2. Learn React hooks (useState, useEffect)
3. Try building simple components

**Week 2: Styling**
1. Master Tailwind class system
2. Build responsive layouts
3. Create custom component classes

**Week 3: Interactivity**
1. Handle user events
2. Build forms with validation
3. Create interactive UI feedback

**Week 4: Advanced**
1. Optimize performance
2. Work with animations
3. Handle edge cases

---

## Next Steps to Learn More

1. **Study each component file** - Read source code, add comments
2. **Modify the design** - Change colors, spacing, fonts
3. **Add new sections** - Use patterns you learned
4. **Optimize performance** - Profile with Chrome DevTools
5. **Deploy** - Push to Vercel and see live results

---

## Resources for Continued Learning

- **TypeScript**: https://www.typescriptlang.org/docs/
- **React**: https://react.dev/learn
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Web Performance**: https://web.dev/performance/

---

Good luck on your learning journey! Remember: the best way to learn is by doing. Modify this code, break things, fix them, and build new features. Happy coding! 🚀
