"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = [
  ".section__head",
  ".about__grid",
  ".skill-group",
  ".project",
  ".job",
  ".edu__card",
  ".contact__title",
  ".contact__cta",
  ".hero__tagline",
  ".hero__meta",
  ".hero__actions",
].join(", ");

/**
 * Pen-stroke draw-on-scroll, content reveal, and scroll-linked motion
 * (progress line, timeline spine, hero parallax).
 * Progressive enhancement over static markup — the page is fully
 * readable without JS (static export friendly).
 */
export function SketchEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealTargets =
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const drawTargets = document.querySelectorAll<SVGElement>(".draw");

    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
      drawTargets.forEach((el) => el.classList.add("is-drawn"));
      return;
    }

    // ---------- one-shot: draw strokes + reveal blocks ----------

    const drawObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            drawObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    drawTargets.forEach((el) => drawObserver.observe(el));
    revealTargets.forEach((el) => revealObserver.observe(el));

    // Stagger sibling reveals slightly (skill cards, timeline jobs)
    document.querySelectorAll(".skills, .timeline, .edu, .projects").forEach((group) => {
      group.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
      });
    });

    // ---------- scroll-linked: runs every frame while scrolling ----------

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    ).map((el) => ({
      el,
      speed: Number.parseFloat(el.dataset.parallax ?? "0"),
    }));
    const progressPath = document.querySelector<SVGPathElement>(
      ".nav__progress path"
    );
    const spinePath = document.querySelector<SVGPathElement>(
      ".timeline__spine path"
    );
    const timeline = document.querySelector<HTMLElement>(".timeline");

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    let rafId = 0;

    const frame = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      // 1. Page progress → pen line under the nav draws itself
      if (progressPath) {
        const max = document.documentElement.scrollHeight - vh;
        const progress = max > 0 ? clamp(y / max, 0, 1) : 0;
        progressPath.style.strokeDashoffset = String(1 - progress);
      }

      // 2. Hero parallax (only while the hero is on screen)
      if (y < vh * 1.5) {
        for (const { el, speed } of parallaxEls) {
          el.style.translate = `0 ${(y * speed).toFixed(1)}px`;
        }
      }

      // 3. Timeline spine draws in sync with scroll position
      if (spinePath && timeline) {
        const rect = timeline.getBoundingClientRect();
        const progress = clamp((vh * 0.75 - rect.top) / rect.height, 0, 1);
        spinePath.style.strokeDashoffset = String(1 - progress);
      }

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      drawObserver.disconnect();
      revealObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
