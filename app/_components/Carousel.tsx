"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { thumb, urlLabel, type Project } from "../_data/projects";

const GAP = 18;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Carousel({ items }: { items: Project[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const first = trackRef.current?.firstElementChild;
      if (!viewport || !first) return;
      const cardWidth = first.getBoundingClientRect().width;
      setVisible(Math.max(1, Math.floor((viewport.clientWidth + GAP) / (cardWidth + GAP))));
      setStep(cardWidth + GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const max = Math.max(0, items.length - visible);
  const i = Math.min(index, max);
  const last = Math.min(items.length, i + visible);

  return (
    <>
      <div className="sec-head">
        <div>
          <p className="label">Work</p>
          <h2 id="work-h">Selected live sites</h2>
        </div>
        <div className="car-controls">
          <span className="car-count num">
            {pad(i + 1)}–{pad(last)} / {items.length}
          </span>
          <button
            className="icon-btn"
            type="button"
            aria-label="Previous"
            disabled={i <= 0}
            onClick={() => setIndex(Math.max(0, i - 1))}
          >
            ←
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label="Next"
            disabled={i >= max}
            onClick={() => setIndex(Math.min(max, i + 1))}
          >
            →
          </button>
        </div>
      </div>
      <div className="carousel" ref={viewportRef}>
        <div className="car-track" ref={trackRef} style={{ transform: `translateX(${-i * step}px)` }}>
          {items.map((p, k) => (
            <article className="car-card" key={p.slug}>
              <a href={p.href} target="_blank" rel="noopener" aria-label={`${p.name} (opens live site)`}>
                <div className="shot">
                  <img src={thumb(p.slug)} alt="" loading="lazy" decoding="async" width={640} height={400} />
                </div>
              </a>
              <div className="row">
                <span className="name">{p.name}</span>
                <span className="idx num">{pad(k + 1)}</span>
              </div>
              {p.href && (
                <a className="url" href={p.href} target="_blank" rel="noopener">
                  {urlLabel(p.href)} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
