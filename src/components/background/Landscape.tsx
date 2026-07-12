"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

// Deterministic pseudo-random helper (seeded by index) so server and client
// render the same positions for the motes/clouds — avoids hydration mismatches
// while still looking scattered.
function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 * salt) * 43758.5453;
  return x - Math.floor(x);
}

const MOTE_COUNT = 16;
const motes = Array.from({ length: MOTE_COUNT }, (_, i) => ({
  left: `${seeded(i, 1) * 100}%`,
  bottom: `${-10 - seeded(i, 2) * 10}%`,
  duration: `${10 + seeded(i, 3) * 10}s`,
  delay: `${-seeded(i, 4) * 18}s`,
}));

const clouds = [
  { w: 340, h: 72, top: "16%", left: "6%", duration: "75s" },
  { w: 220, h: 48, top: "10%", left: "46%", duration: "58s" },
  { w: 300, h: 62, top: "22%", left: "68%", duration: "90s" },
  { w: 180, h: 40, top: "30%", left: "30%", duration: "66s" },
];

export function Landscape() {
  const { scrollY } = useScrollProgress();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* sky gradient — bright midday blue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #3E8FD0 0%, #7EC1EC 38%, #CFEBFA 62%, #EAF6FF 76%, #F6FBFF 100%)",
        }}
      />

      {/* sun */}
      <div
        className="absolute left-1/2 top-[22%]"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl animate-sun-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(255,246,214,0.65), rgba(255,246,214,0) 65%)",
          }}
        />
        <div
          className="relative h-28 w-28 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 34%, #ffffff, #FFF3C4 55%, rgba(255,243,196,0) 75%)",
            boxShadow: "0 0 110px rgba(255,240,196,0.65)",
          }}
        />
      </div>

      {/* clouds */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        {clouds.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-md animate-cloud-drift"
            style={{
              width: c.w,
              height: c.h,
              top: c.top,
              left: c.left,
              animationDuration: c.duration,
              animationDelay: `${-i * 9}s`,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(255,255,255,0) 72%)",
            }}
          />
        ))}
      </div>

      {/* far ridge */}
      <svg
        className="absolute bottom-[16%] left-0 h-[30%] w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <path
          fill="#A9C9D6"
          opacity="0.6"
          d="M0,260 C120,210 220,290 340,240 C460,190 540,270 660,230 C780,190 860,260 980,220 C1100,180 1200,250 1320,210 C1380,190 1420,220 1440,210 L1440,420 L0,420 Z"
        />
      </svg>

      {/* mid ridge */}
      <svg
        className="absolute bottom-[7%] left-0 h-[30%] w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.11}px)` }}
      >
        <path
          fill="#5E9A82"
          opacity="0.85"
          d="M0,300 C100,240 200,320 320,270 C440,220 520,300 640,260 C760,220 840,290 960,250 C1080,210 1180,280 1300,240 C1370,215 1410,250 1440,235 L1440,420 L0,420 Z"
        />
      </svg>

      {/* near ridge with a soft sunlit rim */}
      <svg
        className="absolute bottom-0 left-0 h-[28%] w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.18}px)` }}
      >
        <path
          fill="#28503E"
          d="M0,340 C110,270 210,350 330,300 C450,250 540,330 660,290 C780,250 870,320 990,280 C1110,240 1200,310 1320,270 C1380,250 1420,280 1440,265 L1440,420 L0,420 Z"
        />
        <path
          fill="none"
          stroke="#FFF3C4"
          strokeOpacity="0.4"
          strokeWidth="2"
          d="M0,340 C110,270 210,350 330,300 C450,250 540,330 660,290 C780,250 870,320 990,280 C1110,240 1200,310 1320,270 C1380,250 1420,280 1440,265"
        />
      </svg>

      {/* water haze at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[16%]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* rising light motes, catching the sun */}
      <div className="absolute inset-0">
        {motes.map((m, i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full animate-mote-rise"
            style={{
              left: m.left,
              bottom: m.bottom,
              animationDuration: m.duration,
              animationDelay: m.delay,
              background: "#F0B46E",
              boxShadow: "0 0 6px #F0B46E",
            }}
          />
        ))}
      </div>

      {/* readability scrim + grain + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,24,0.28) 0%, rgba(6,10,24,0.4) 55%, rgba(6,10,24,0.62) 100%)",
        }}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.025] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, transparent 40%, rgba(4,5,12,0.35) 100%)",
        }}
      />
    </div>
  );
}
