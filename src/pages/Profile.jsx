import { useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, CodeBracketIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import profilePhoto from "../assets/my_profile.jpg";

const STORAGE_KEY = "dashboard.profile.v1";
const defaults = {
  name: "Thawatchai Rueanin",
  role: "Full Stack Developer",
  about: "I build thoughtful web experiences with React, Next.js, Node.js, and Tailwind CSS. I enjoy turning complex problems into simple, responsive interfaces that people love to use.",
  skills: "React, Next.js, Node.js, TypeScript, Tailwind CSS",
  linkedin: "", github: "", portfolio: "",
};
const networks = [["linkedin", "LinkedIn"], ["github", "GitHub"], ["portfolio", "Portfolio"]];
const panel = "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-gray-800";
const input = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-gray-900 dark:text-slate-100";

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function readProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, typeof saved?.[key] === "string" ? saved[key] : value]));
  } catch { return defaults; }
}

export default function Profile() {
  const [profile, setProfile] = useState(readProfile);
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editButton = useRef(null);
  const skills = [...new Set(profile.skills.split(",").map(skill => skill.trim()).filter(Boolean))];
  const links = networks.filter(([key]) => safeUrl(profile[key]));

  function finishEditing() {
    setEditing(false);
    setError("");
    requestAnimationFrame(() => editButton.current?.focus());
  }

  function save(event) {
    event.preventDefault();
    const next = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()]));
    if (!next.name || !next.role) {
      setError("Please enter your name and professional title.");
      return;
    }
    if (networks.some(([key]) => next[key] && !safeUrl(next[key]))) {
      setError("Social links must be complete http:// or https:// addresses.");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setMessage("Profile saved on this browser.");
    } catch {
      setMessage("Profile updated for this visit only. Browser storage is unavailable.");
    }
    setProfile(next);
    finishEditing();
  }

  function field(key, label, options = {}) {
    return <label className="block text-sm font-medium" key={key}>
      {label}
      <input className={input} name={key} value={draft[key]} onChange={event => setDraft(current => ({ ...current, [key]: event.target.value }))} maxLength={options.type === "url" ? 500 : 120} {...options} />
    </label>;
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 text-slate-900 sm:px-6 lg:px-8 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Your workspace</p><h1 className="mt-1 text-2xl font-bold tracking-tight">My profile</h1></div>
        <span className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">Personal profile</span>
      </div>

      <section className={`${panel} overflow-hidden`} aria-label="Profile summary">
        <div className="relative h-32 overflow-hidden bg-gradient-to-r from-slate-900 via-teal-900 to-cyan-700 sm:h-44" aria-hidden="true">
          <div className="absolute -right-12 -top-32 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <div className="absolute right-44 top-14 h-52 w-52 rounded-full border border-white/15" />
          <div className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80 sm:left-8">Create. Build. Improve.</div>
        </div>
        <div className="px-6 pb-7 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <img src={profilePhoto} alt={`${profile.name}'s profile`} className="relative -mt-10 h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-md sm:h-32 sm:w-32 dark:border-gray-800" />
            <button ref={editButton} type="button" disabled={editing} onClick={() => { setDraft({ ...profile }); setMessage(""); setError(""); setEditing(true); }} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50">
              <PencilSquareIcon className="h-4 w-4" />Edit profile
            </button>
          </div>
          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="min-w-0"><h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h2><p className="mt-2 break-words text-slate-500 dark:text-slate-400">{profile.role}</p></div>
            {links.length > 0 && <div className="flex flex-wrap gap-2">{links.map(([key, label]) => <a key={key} href={safeUrl(profile[key])} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-gray-700">{label}<ArrowUpRightIcon className="h-3.5 w-3.5" /></a>)}</div>}
          </div>
        </div>
      </section>

      {message && <p role="status" className="flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800 dark:bg-teal-950 dark:text-teal-200"><CheckIcon className="h-5 w-5 shrink-0" />{message}</p>}

      {editing && <section className={`${panel} p-6 sm:p-8`} aria-labelledby="edit-profile-heading">
        <h2 id="edit-profile-heading" className="text-lg font-semibold">Edit your profile</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Changes are stored only in this browser, not in your account.</p>
        <form onSubmit={save} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">{field("name", "Full name", { required: true, autoFocus: true, autoComplete: "name" })}{field("role", "Professional title", { required: true, autoComplete: "organization-title" })}</div>
          <label className="block text-sm font-medium">About me<textarea name="about" rows={4} maxLength={1500} value={draft.about} onChange={event => setDraft(current => ({ ...current, about: event.target.value }))} className={`${input} resize-y`} /></label>
          {field("skills", "Skills", { maxLength: 500, "aria-describedby": "skills-hint" })}
          <p id="skills-hint" className="text-xs text-slate-500 dark:text-slate-400">Separate skills with commas, for example: React, Node.js, Design.</p>
          <div className="grid gap-5 md:grid-cols-3">{networks.map(([key, label]) => field(key, `${label} URL (optional)`, { type: "url", placeholder: "https://…" }))}</div>
          {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-700"><button type="button" onClick={finishEditing} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium dark:border-slate-600">Cancel</button><button type="submit" className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">Save changes</button></div>
        </form>
      </section>}

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <section className={`${panel} p-6 sm:p-8 lg:col-span-2`} aria-labelledby="about-heading">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-teal-50 p-2.5 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300"><UserCircleIcon className="h-5 w-5" /></span><h2 id="about-heading" className="text-lg font-semibold">About me</h2></div>
          <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300">{profile.about || "Tell people a little about yourself. Add an introduction using Edit profile."}</p>
          <div className="mt-7 border-t border-slate-100 pt-5 dark:border-slate-700"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Professional focus</p><p className="mt-2 break-words text-sm font-medium">{profile.role}</p></div>
        </section>
        <section className={`${panel} p-6 sm:p-8`} aria-labelledby="skills-heading">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"><CodeBracketIcon className="h-5 w-5" /></span><h2 id="skills-heading" className="text-lg font-semibold">Skills & tools</h2></div>
          <div className="mt-5 flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className="max-w-full break-words rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-gray-900 dark:text-slate-300">{skill}</span>)}</div>
          <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">{skills.length ? "The technologies and tools I work with." : "Add your skills using Edit profile."}</p>
        </section>
      </div>
      <p className="pb-2 text-center text-xs text-slate-400">Your introduction, your skills, your story.</p>
    </main>
  );
}
