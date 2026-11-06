"use client";

import { useState } from "react";
import {
  platformLabels,
  sectorLabels,
  thumb,
  thumbWebp,
  urlLabel,
  type Platform,
  type Project,
  type Sector,
} from "../_data/projects";

const PER = 9;
const pad = (n: number) => String(n).padStart(2, "0");

/** Rhythm within a page of 9: 2 large (r1), 3 medium (r2), 4 small (r3). */
const rhythm = (j: number) => (j < 2 ? "r1" : j < 5 ? "r2" : "r3");

const PLATFORMS = Object.keys(platformLabels) as Platform[];
const SECTORS = Object.keys(sectorLabels) as Sector[];

/** Without JS every card is shown and the filter/pager UI is hidden (React does not hydrate <noscript>). */
const NOSCRIPT_CSS = `<style>.icard.is-off{display:block!important}.filters,.pager{display:none!important}</style>`;

export default function ProjectIndex({ items }: { items: Project[] }) {
  const [page, setPage] = useState(0);
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [sector, setSector] = useState<Sector | "all">("all");

  const matches = (p: Project, pf = platform, sc = sector) =>
    (pf === "all" || p.platform === pf) && (sc === "all" || p.sector === sc);

  const shown = items.filter((p) => matches(p));
  const total = Math.max(1, Math.ceil(shown.length / PER));
  const filtered = platform !== "all" || sector !== "all";

  const goTo = (n: number) => {
    setPage(n);
    document.getElementById("index")?.scrollIntoView({ behavior: "smooth" });
  };
  const pickPlatform = (v: Platform | "all") => {
    setPlatform(v);
    setPage(0);
  };
  const pickSector = (v: Sector | "all") => {
    setSector(v);
    setPage(0);
  };
  const clear = () => {
    setPlatform("all");
    setSector("all");
    setPage(0);
  };

  const label = (() => {
    if (!filtered) return `All ${items.length} projects`;
    const parts = [platform !== "all" ? platformLabels[platform] : "", sector !== "all" ? sectorLabels[sector] : ""]
      .filter(Boolean)
      .join(" · ");
    return `${shown.length} of ${items.length} projects — ${parts}`;
  })();

  const first = shown.length ? page * PER + 1 : 0;
  const last = Math.min(shown.length, (page + 1) * PER);
  const visibleSlugs = new Set(shown.slice(page * PER, (page + 1) * PER).map((p) => p.slug));

  return (
    <>
      <div className="sec-head">
        <div>
          <p className="label">Index</p>
          <h2 id="idx-h">{label}</h2>
        </div>
        <p>Every build, 01–{pad(items.length)}. Filter by platform or sector — live URLs on every public build.</p>
      </div>

      <div className="filters" role="group" aria-label="Filter projects">
        <div className="filter-row" role="group" aria-label="Platform">
          <span className="label">Platform</span>
          <Chip on={platform === "all"} onClick={() => pickPlatform("all")} text="All" count={items.filter((p) => matches(p, "all")).length} />
          {PLATFORMS.map((v) => (
            <Chip key={v} on={platform === v} onClick={() => pickPlatform(v)} text={platformLabels[v]} count={items.filter((p) => matches(p, v)).length} />
          ))}
        </div>
        <div className="filter-row" role="group" aria-label="Sector">
          <span className="label">Sector</span>
          <Chip on={sector === "all"} onClick={() => pickSector("all")} text="All" count={items.filter((p) => matches(p, platform, "all")).length} />
          {SECTORS.map((v) => (
            <Chip key={v} on={sector === v} onClick={() => pickSector(v)} text={sectorLabels[v]} count={items.filter((p) => matches(p, platform, v)).length} />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {filtered ? `Showing ${shown.length} projects` : `Showing all ${items.length} projects`}
        </p>
      </div>

      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />

      <div className="index-grid">
        {items.map((p, k) => {
          const on = visibleSlugs.has(p.slug);
          const j = on ? shown.indexOf(p) - page * PER : 0;
          const cls = ["icard", on ? rhythm(j) : "is-off", p.quiet ? "quiet" : ""].filter(Boolean).join(" ");
          const shotCls =
            p.shot === "pending" ? "shot standin" : p.shot === "private" ? "shot standin private" : "shot";
          return (
            <article className={cls} data-slug={p.slug} key={p.slug}>
              <div className={shotCls}>
                {p.shot === "img" && (
                  <picture>
                    <source type="image/webp" srcSet={thumbWebp(p.slug)} />
                    <img
                      src={thumb(p.slug)}
                      alt={`${p.name} homepage`}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
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
                <span className="n num">{pad(k + 1)}</span>
                <span className="name">{p.name}</span>
                {p.href ? (
                  <a className="url" href={p.href} target="_blank" rel="noopener">
                    {urlLabel(p.href)} ↗
                  </a>
                ) : (
                  <span className="url private">private / in progress</span>
                )}
                <span className="tag">{platformLabels[p.platform]}</span>
              </div>
            </article>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className="index-empty">
          No projects match both filters.{" "}
          <button type="button" onClick={clear}>
            Clear filters
          </button>
        </p>
      )}

      <div className="pager" aria-label="Project pages">
        <div className="pages">
          {total > 1 &&
            Array.from({ length: total }, (_, n) => (
              <button
                key={n}
                type="button"
                className={n === page ? "is-active" : undefined}
                aria-label={`Page ${n + 1}`}
                aria-current={n === page ? "page" : undefined}
                onClick={() => goTo(n)}
              >
                {n + 1}
              </button>
            ))}
        </div>
        <div className="info num">
          {shown.length
            ? `Showing ${first}–${last} of ${shown.length} · page ${page + 1} of ${total}`
            : "No projects to show"}
        </div>
      </div>
    </>
  );
}

function Chip({ on, onClick, text, count }: { on: boolean; onClick: () => void; text: string; count: number }) {
  return (
    <button type="button" className="chip" aria-pressed={on} onClick={onClick} disabled={!on && count === 0}>
      {text}
      <span className="c num">{count}</span>
    </button>
  );
}
