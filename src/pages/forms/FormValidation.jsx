import { useState } from "react";
import { FormField, FormNotice, FormPage } from "./FormUI";
import { panelClass, primaryButton, validateAccount } from "./formStyles";

export default function FormValidation() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateAccount(formData);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setMessage("");
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    setMessage("All fields passed validation. This is a demo; no account was created and no data was sent.");
    setFormData(current => ({ ...current, password: "" }));
  }

  return <FormPage title="Form validation" description="Helpful feedback, right where you need it. Try the fields below to preview validation. Required fields are marked with an asterisk.">
    <form className={panelClass + " max-w-2xl space-y-5"} onSubmit={handleSubmit} noValidate>
      <div><h2 className="text-lg font-semibold">Account details</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use sample details to explore this form.</p></div>
      <FormField label="Full name" name="name" autoComplete="name" required maxLength={120} value={formData.name} onChange={handleChange} error={errors.name} placeholder="e.g. Alex Morgan" />
      <FormField label="Email address" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} error={errors.email} placeholder="alex@example.com" />
      <FormField label="Password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} error={errors.password} hint="At least 8 characters. Use a sample password for this demo." />
      <FormNotice>{message}</FormNotice>
      <button type="submit" className={primaryButton}>Validate details</button>
    </form>
  </FormPage>;
}
