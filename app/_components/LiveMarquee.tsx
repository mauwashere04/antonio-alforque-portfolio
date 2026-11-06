"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { urlLabel, type Project } from "../_data/projects";

/** Scroll speed in px per second. */
const SPEED = 35;

/**
 * "Also live" row. Renders static and wrapped (no-JS, reduced motion). Once the single-line
 * width of the list is measured it sets data-ready and scrolls right to left. The second,
 * identical group exists only to make the loop seamless and is hidden from assistive tech.
 */
export default function LiveMarquee({ items }: { items: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState<number>();

  useEffect(() => {
    const root = rootRef.current;
    const group = groupRef.current;
    if (!root || !group) return;

    const measure = () => {
      // Apply the single-line layout just long enough to read the natural width (no paint in between).
      root.dataset.measure = "true";
      const width = group.getBoundingClientRect().width;
      delete root.dataset.measure;
      if (width > 0) {
        setDuration(width / SPEED);
        setReady(true);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  const style = duration ? ({ "--marquee-duration": `${duration.toFixed(1)}s` } as CSSProperties) : undefined;

  const links = (duplicate: boolean) =>
    items.map((p) => (
      <li key={p.slug}>
        <a href={p.href} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined}>
          {urlLabel(p.href ?? "")}
          <span aria-hidden="true"> ↗</span>
        </a>
      </li>
    ));

  return (
    <div
      className="hero-domains marquee"
      ref={rootRef}
      data-ready={ready ? "true" : undefined}
      data-paused={paused ? "true" : undefined}
      style={style}
    >
      <b>Also live:</b>
      <div className="marquee-viewport">
        <div className="marquee-track">
          <ul className="marquee-group" ref={groupRef}>
            {links(false)}
          </ul>
          <ul className="marquee-group marquee-dup" aria-hidden="true" inert>
            {links(true)}
          </ul>
        </div>
      </div>
      {ready && (
        <button
          type="button"
          className="marquee-toggle"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      )}
    </div>
  );
}
