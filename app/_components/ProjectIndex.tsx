"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { thumb, urlLabel, type Project } from "../_data/projects";

const PER = 9;
const pad = (n: number) => String(n).padStart(2, "0");

/** Rhythm within a page of 9: 2 large (r1), 3 medium (r2), 4 small (r3). */
const rhythm = (j: number) => (j < 2 ? "r1" : j < 5 ? "r2" : "r3");

export default function ProjectIndex({ items }: { items: Project[] }) {
  const [page, setPage] = useState(0);
  const total = Math.ceil(items.length / PER);

  const goTo = (n: number) => {
    setPage(n);
    document.getElementById("index")?.scrollIntoView({ behavior: "smooth" });
  };

  // Index numbers start at 02 because MARE is 01 in Featured.
  const first = page * PER + 2;
  const last = Math.min(items.length, (page + 1) * PER) + 1;

  return (
    <>
      <div className="index-grid">
        {items.map((p, k) => {
          const on = k >= page * PER && k < (page + 1) * PER;
          const cls = ["icard", on ? rhythm(k - page * PER) : "", p.quiet ? "quiet" : ""].filter(Boolean).join(" ");
          const shotCls =
            p.shot === "pending" ? "shot standin" : p.shot === "private" ? "shot standin private" : "shot";
          return (
            <article className={cls} data-slug={p.slug} key={p.slug} style={on ? undefined : { display: "none" }}>
              <div className={shotCls}>
                {p.shot === "img" && (
                  <img src={thumb(p.slug)} alt={`${p.name} homepage`} width={640} height={400} />
                )}
                {p.shot === "pending" && (
                  <>
                    <span className="t">{p.name}</span>
                    <span className="d">Capture pending · visit the live site</span>
                  </>
                )}
                {p.shot === "private" && (
                  <>
                    <span className="t">{p.name}</span>
                    <span className="d">Private build · no public URL</span>
                  </>
                )}
              </div>
              <div className="row">
                <span className="n num">{pad(k + 2)}</span>
                <span className="name">{p.name}</span>
                {p.href ? (
                  <a className="url" href={p.href} target="_blank" rel="noopener">
                    {urlLabel(p.href)} ↗
                  </a>
                ) : (
                  <span className="url private">private / in progress</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="pager" aria-label="Project pages">
        <div className="pages">
          {Array.from({ length: total }, (_, n) => (
            <button
              key={n}
              type="button"
              className={n === page ? "is-active" : undefined}
              aria-label={`Page ${n + 1}`}
              onClick={() => goTo(n)}
            >
              {n + 1}
            </button>
          ))}
        </div>
        <div className="info num">
          Projects {pad(first)}–{pad(last)} of 37 · page {page + 1} of {total}
        </div>
      </div>
    </>
  );
}
