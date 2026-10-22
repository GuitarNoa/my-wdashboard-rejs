import { useState } from "react";
import { FormField, FormNotice, FormPage } from "./FormUI";
import { inputClass, panelClass, primaryButton, secondaryButton } from "./formStyles";

const emptyForm = { name: "", email: "", password: "", age: "", bio: "", gender: "", terms: false, newsletter: false, file: null };

export default function FormElements() {
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;
    setFormData(current => ({ ...current, [name]: type === "checkbox" ? checked : type === "file" ? files[0] || null : value }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.name.trim()) {
      event.currentTarget.elements.namedItem("name").setCustomValidity("Enter your name.");
      event.currentTarget.reportValidity();
      return;
    }
    setMessage("Demo validated. No data or files were uploaded. Your sample password has been cleared.");
    setFormData(current => ({ ...current, password: "" }));
  }

  return <FormPage title="Form elements" description="Explore the building blocks of a clear, accessible form. This is a demo: use sample information. Required fields are marked with an asterisk.">
    <form className={panelClass + " space-y-6"} onSubmit={handleSubmit} onReset={() => { setFormData(emptyForm); setMessage(""); }}>
      <div className="border-b border-slate-200 pb-5 dark:border-slate-700"><h2 className="text-lg font-semibold">Personal information</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A mix of inputs, selections and preferences.</p></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" autoComplete="name" required maxLength={120} value={formData.name} onChange={event => { event.target.setCustomValidity(""); handleChange(event); }} placeholder="e.g. Alex Morgan" />
        <FormField label="Email address" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="alex@example.com" />
        <FormField label="Password" type="password" name="password" autoComplete="new-password" required minLength={8} value={formData.password} onChange={handleChange} hint="Use a sample password of at least 8 characters." />
        <FormField label="Age (optional)" type="number" name="age" min={1} max={120} step={1} value={formData.age} onChange={handleChange} placeholder="Enter your age" />
      </div>
      <label className="block text-sm font-medium">About you (optional)
        <textarea name="bio" value={formData.bio} onChange={handleChange} className={inputClass} rows={4} maxLength={1000} placeholder="A little about yourself..." />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Gender (optional)
          <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
            <option value="">Prefer not to say</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
          </select>
        </label>
        <fieldset><legend className="text-sm font-medium">Newsletter preference (demo)</legend>
          <div className="mt-4 flex gap-6 text-sm">
            <label className="flex cursor-pointer items-center gap-2"><input type="radio" name="newsletter" className="accent-teal-700" checked={formData.newsletter} onChange={() => { setFormData(current => ({ ...current, newsletter: true })); setMessage(""); }} />Yes</label>
            <label className="flex cursor-pointer items-center gap-2"><input type="radio" name="newsletter" className="accent-teal-700" checked={!formData.newsletter} onChange={() => { setFormData(current => ({ ...current, newsletter: false })); setMessage(""); }} />No</label>
          </div>
        </fieldset>
      </div>
      <div className="rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-600">
        <label htmlFor="demo-file" className="text-sm font-medium">Attach a file (optional)</label>
        <p id="file-hint" className="mt-1 text-xs text-slate-500 dark:text-slate-400">Selection preview only. The file stays on your device.</p>
        <input id="demo-file" type="file" name="file" onChange={handleChange} aria-describedby="file-hint" className="mt-3 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-2 file:font-medium file:text-teal-800 dark:file:bg-teal-950 dark:file:text-teal-200" />
        {formData.file && <p className="mt-3 break-all text-xs text-slate-500 dark:text-slate-400">Selected: {formData.file.name}</p>}
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm"><input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required className="mt-0.5 size-4 accent-teal-700" />I understand this is a demo and no information will be sent. *</label>
      <FormNotice>{message}</FormNotice>
      <div className="flex gap-3 border-t border-slate-200 pt-5 dark:border-slate-700"><button type="submit" className={primaryButton}>Validate demo</button><button type="reset" className={secondaryButton} onClick={event => event.currentTarget.form.elements.namedItem("name").setCustomValidity("")}>Reset form</button></div>
    </form>
  </FormPage>;
}
