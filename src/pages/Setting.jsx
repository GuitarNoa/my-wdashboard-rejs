import { useState } from "react";
import { ShieldCheckIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { FormField, FormNotice, FormPage } from "./forms/FormUI";
import { panelClass, primaryButton, secondaryButton, validateAccount } from "./forms/formStyles";

const storageKey = "dashboard.settings.v1";
const defaults = { name: "John Doe", email: "john@example.com", notifications: true };

function readSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return {
      name: typeof saved?.name === "string" ? saved.name : defaults.name,
      email: typeof saved?.email === "string" ? saved.email : defaults.email,
      notifications: typeof saved?.notifications === "boolean" ? saved.notifications : defaults.notifications,
    };
  } catch { return defaults; }
}

export default function SettingUI() {
  const [saved, setSaved] = useState(readSettings);
  const [draft, setDraft] = useState(saved);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const changed = Object.keys(defaults).some(key => saved[key] !== draft[key]);

  function change(event) {
    const { name, type, value, checked } = event.target;
    setDraft(current => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    setMessage("");
  }

  function save(event) {
    event.preventDefault();
    const nextErrors = validateAccount(draft, ["name", "email"]);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    const next = { ...draft, name: draft.name.trim(), email: draft.email.trim() };
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setMessage("Settings saved in this browser. No account details or email subscriptions were changed.");
    } catch {
      setMessage("Settings applied for this visit. Browser storage is unavailable, so changes will be lost when you reload.");
    }
    setSaved(next);
    setDraft(next);
  }

  return <FormPage title="Settings" eyebrow="Your workspace" description="Manage the sample preferences for this dashboard. Changes stay in this browser and are separate from your profile.">
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_280px]">
      <form onSubmit={save} noValidate className={panelClass + " space-y-6"}>
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-700"><span className="rounded-xl bg-teal-50 p-2.5 text-teal-700 dark:bg-teal-950 dark:text-teal-300"><AdjustmentsHorizontalIcon className="size-5" /></span><div><h2 className="font-semibold">General preferences</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Local demo settings</p></div></div>
        <FormField label="Contact name" name="name" autoComplete="name" maxLength={120} required value={draft.name} onChange={change} error={errors.name} />
        <FormField label="Contact email" type="email" name="email" autoComplete="email" required value={draft.email} onChange={change} error={errors.email} hint="Saved as a demo preference. No emails will be sent." />
        <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60"><span><span className="block text-sm font-medium">Notification preference</span><span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">Remember this preference for the demo. Email delivery is not connected.</span></span><input type="checkbox" name="notifications" checked={draft.notifications} onChange={change} className="mt-1 size-5 shrink-0 accent-teal-700" /></label>
        <FormNotice>{message}</FormNotice>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
          <button type="submit" disabled={!changed} className={primaryButton}>Save preferences</button>
          <button type="button" disabled={!changed} className={secondaryButton} onClick={() => { setDraft(saved); setErrors({}); setMessage(""); }}>Cancel</button>
          {changed && <span className="text-xs text-slate-500 dark:text-slate-400">Unsaved changes</span>}
        </div>
      </form>
      <aside className={panelClass}><ShieldCheckIcon className="size-6 text-teal-700 dark:text-teal-300" /><h2 className="mt-4 font-semibold">Account security</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Password changes and account management will be available when an authentication service is connected.</p><span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">Demo workspace</span></aside>
    </div>
  </FormPage>;
}
