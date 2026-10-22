import { useState } from "react";
import { FormField, FormNotice, FormPage } from "./FormUI";
import { panelClass, primaryButton, secondaryButton, validateAccount } from "./formStyles";

const steps = ["Personal details", "Account details", "Review"];
const emptyForm = { name: "", email: "", password: "" };

export default function FormWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [complete, setComplete] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const keys = step === 1 ? ["name"] : step === 2 ? ["email", "password"] : undefined;
    const nextErrors = validateAccount(formData, keys);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    if (step < 3) setStep(current => current + 1);
    else {
      setComplete(true);
      setFormData(current => ({ ...current, password: "" }));
    }
  }

  return <FormPage title="Form wizard" description="A clear path from personal details to review. This interactive example does not create an account or send your data.">
    <div className={panelClass + " max-w-3xl"}>
      <ol className="mb-8 grid grid-cols-3 gap-3" aria-label="Form progress">
        {steps.map((label, index) => <li key={label} aria-current={!complete && step === index + 1 ? "step" : undefined}>
          <div className={"mb-3 h-1.5 rounded-full " + (step > index || complete ? "bg-teal-600" : "bg-slate-200 dark:bg-slate-600")} />
          <p className={"text-xs font-medium sm:text-sm " + (step === index + 1 ? "text-teal-700 dark:text-teal-300" : "text-slate-500 dark:text-slate-400")}><span className="mr-1.5">0{index + 1}</span>{label}</p>
        </li>)}
      </ol>
      {complete ? <div className="space-y-5">
        <FormNotice>Demo completed. Your details passed validation; no account was created and no data was sent.</FormNotice>
        <button type="button" autoFocus className={primaryButton} onClick={() => { setFormData(emptyForm); setErrors({}); setStep(1); setComplete(false); }}>Start again</button>
      </div> : <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <h2 className="text-lg font-semibold" aria-live="polite">Step {step}: {steps[step - 1]}</h2>
        {step === 1 && <FormField key="name" label="Full name" name="name" autoComplete="name" required maxLength={120} value={formData.name} onChange={handleChange} error={errors.name} placeholder="e.g. Alex Morgan" />}
        {step === 2 && <>
          <FormField key="email" autoFocus label="Email address" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} error={errors.email} placeholder="alex@example.com" />
          <FormField label="Password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} error={errors.password} hint="At least 8 characters. Use a sample password for this demo." />
        </>}
        {step === 3 && <dl className="space-y-4 rounded-xl bg-slate-50 p-5 text-sm dark:bg-slate-900/60">
          <div><dt className="text-slate-500 dark:text-slate-400">Full name</dt><dd className="mt-1 break-words font-medium">{formData.name.trim()}</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Email address</dt><dd className="mt-1 break-words font-medium">{formData.email.trim()}</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Password</dt><dd className="mt-1 font-medium">Provided (hidden)</dd></div>
        </dl>}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
          {step > 1 && <button type="button" className={secondaryButton} onClick={() => { setErrors({}); setStep(current => current - 1); }}>Back</button>}
          <button type="submit" className={primaryButton + " ml-auto"}>{step === 3 ? "Complete demo" : "Continue"}</button>
        </div>
      </form>}
    </div>
  </FormPage>;
}
