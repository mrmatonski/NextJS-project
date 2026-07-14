"use client";

import { useMemo, useState } from "react";

const projects = [
  { name: "Luma Residence", client: "North & Pine", type: "Brand system", progress: 82, due: "Jul 22", tone: "clay", team: ["AM", "JK", "SR"] },
  { name: "Arc Journal No. 06", client: "Arc Editions", type: "Editorial", progress: 64, due: "Jul 29", tone: "olive", team: ["MF", "AM"] },
  { name: "Serein Objects", client: "Serein Studio", type: "Digital launch", progress: 41, due: "Aug 08", tone: "blue", team: ["SR", "JK", "MF"] },
];

const activity = [
  ["AM", "Ana moved Luma Residence to review", "12 min"],
  ["SR", "Sofia uploaded 6 campaign selects", "48 min"],
  ["JK", "Jon added feedback to Arc Journal", "2 hr"],
];

export default function Home() {
  const [view, setView] = useState("All");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    if (view === "All") return projects;
    if (view === "In review") return projects.filter((project) => project.progress > 70);
    return projects.filter((project) => project.progress <= 70);
  }, [view]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <main className="app-shell">
      <aside className={menuOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="brand-row">
          <div className="brand-mark">A</div>
          <span>Atelier</span>
          <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close navigation">×</button>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          <a className="nav-item active" href="#overview"><span>⌂</span>Overview</a>
          <a className="nav-item" href="#projects"><span>◇</span>Projects <b>8</b></a>
          <a className="nav-item" href="#calendar"><span>□</span>Calendar</a>
          <a className="nav-item" href="#files"><span>◫</span>Files</a>
          <p className="nav-label nav-label-spaced">Manage</p>
          <a className="nav-item" href="#clients"><span>○</span>Clients</a>
          <a className="nav-item" href="#insights"><span>↗</span>Insights</a>
        </nav>

        <div className="sidebar-card">
          <span className="eyebrow">Studio pulse</span>
          <strong>86%</strong>
          <p>of this week’s capacity is thoughtfully allocated.</p>
          <div className="mini-meter"><i /></div>
        </div>

        <div className="profile-row">
          <div className="avatar avatar-dark">MM</div>
          <div><strong>Michael Maton</strong><span>Studio director</span></div>
          <button aria-label="Profile options">•••</button>
        </div>
      </aside>

      {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation overlay" />}

      <section className="workspace" id="overview">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation">☰</button>
          <div className="search"><span>⌕</span><input aria-label="Search workspace" placeholder="Search projects, clients, files…" /><kbd>⌘ K</kbd></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">◌<i /></button>
            <button className="primary-button" onClick={() => showNotice("New project workspace prepared")}>＋ New project</button>
          </div>
        </header>

        <div className="content-wrap">
          <div className="welcome-row">
            <div><p className="eyebrow">Tuesday, July 14</p><h1>Good afternoon, Michael.</h1><p>Here’s what is moving across the studio today.</p></div>
            <div className="week-note"><span>Week 29</span><strong>3 key deliveries</strong></div>
          </div>

          <section className="metrics-grid" aria-label="Studio metrics">
            <article className="metric-card metric-dark"><div><span>Active projects</span><strong>08</strong></div><small>↑ 2 this month</small><div className="metric-orbit" /></article>
            <article className="metric-card"><div><span>In review</span><strong>03</strong></div><small className="amber">2 need attention</small><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /></div></article>
            <article className="metric-card"><div><span>On-time rate</span><strong>94%</strong></div><small>↑ 6% vs. last quarter</small><div className="ring-chart"><span>94</span></div></article>
            <article className="metric-card"><div><span>July revenue</span><strong>$48.2k</strong></div><small>72% of monthly goal</small><div className="goal-bar"><i /></div></article>
          </section>

          <div className="main-grid">
            <section className="panel projects-panel" id="projects">
              <div className="panel-heading">
                <div><p className="eyebrow">Live work</p><h2>Priority projects</h2></div>
                <div className="view-tabs" aria-label="Filter projects">
                  {["All", "In review", "In progress"].map((tab) => <button key={tab} onClick={() => setView(tab)} className={view === tab ? "selected" : ""}>{tab}</button>)}
                </div>
              </div>
              <div className="project-list">
                {visibleProjects.map((project) => (
                  <article className="project-row" key={project.name}>
                    <div className={`project-thumb ${project.tone}`}><span>{project.name.slice(0, 1)}</span></div>
                    <div className="project-title"><strong>{project.name}</strong><span>{project.client} · {project.type}</span></div>
                    <div className="project-progress"><div><span>Progress</span><b>{project.progress}%</b></div><div className="progress-track"><i style={{ width: `${project.progress}%` }} /></div></div>
                    <div className="project-date"><span>Due</span><strong>{project.due}</strong></div>
                    <div className="avatar-stack">{project.team.map((person) => <span key={person}>{person}</span>)}</div>
                    <button className="row-button" onClick={() => showNotice(`${project.name} opened`)} aria-label={`Open ${project.name}`}>↗</button>
                  </article>
                ))}
                {visibleProjects.length === 0 && <p className="empty-state">Nothing in this view right now.</p>}
              </div>
              <button className="text-button" onClick={() => showNotice("Showing all 8 projects")}>View all projects <span>→</span></button>
            </section>

            <aside className="panel schedule-panel" id="calendar">
              <div className="panel-heading"><div><p className="eyebrow">Today</p><h2>Schedule</h2></div><button aria-label="More schedule options">•••</button></div>
              <div className="timeline">
                <div className="time-row"><span>09:30</span><article><i className="dot green"/><strong>Creative stand-up</strong><small>Studio team · 30 min</small><div className="tiny-avatars"><b>AM</b><b>JK</b><b>+3</b></div></article></div>
                <div className="time-row"><span>11:00</span><article><i className="dot clay-dot"/><strong>Luma client review</strong><small>North & Pine · 45 min</small><em>Video call</em></article></div>
                <div className="time-row"><span>14:30</span><article><i className="dot blue-dot"/><strong>Production planning</strong><small>Serein Studio · 60 min</small></article></div>
              </div>
              <button className="calendar-button" onClick={() => showNotice("Calendar view opened")}>Open calendar</button>
            </aside>
          </div>

          <section className="bottom-grid">
            <div className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Workspace</p><h2>Recent activity</h2></div><button>View all</button></div>{activity.map(([initials, text, time]) => <div className="activity-row" key={text}><span className="avatar">{initials}</span><p>{text}<small>{time} ago</small></p><b>→</b></div>)}</div>
            <div className="quote-card"><p>“Clarity is the kindest form of creative direction.”</p><span>Studio principle 04</span><div className="quote-shape" /></div>
          </section>
        </div>
      </section>

      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}
    </main>
  );
}
