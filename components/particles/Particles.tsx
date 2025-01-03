"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useTheme } from "next-themes";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesComponent = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // Ensure the theme value changes trigger a re-render
  const key = useMemo(() => theme, [theme]);

  // Initialize particles engine only once
  useEffect(() => {
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };

    initEngine();
  }, [key]);

  const particlesLoaded = async (container) => {
    // console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        opacity: 0.4,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        color: {
          value: theme === "light" ? "#ff2321" : "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 130,
          enable: true,
          opacity: 0.5,
          width: 3,
        },
        move: {
          enable: true,
          random: false,
          speed: 4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            particles: {
              number: {
                value: 50,
              },
            },
          },
        },
        {
          breakpoint: 425,
          options: {
            particles: {
              number: {
                value: 30,
              },
            },
          },
        },
      ],
    }),
    [theme]
  );

  return init ? (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  ) : null;
};
