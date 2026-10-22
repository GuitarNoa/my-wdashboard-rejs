import { useId } from "react";
import { inputClass } from "./formStyles";

export function FormPage({ title, description, children, eyebrow = "Form studio" }) {
  return <section className="mx-auto max-w-5xl space-y-6 px-4 py-6 text-slate-900 sm:px-6 lg:px-8 dark:text-slate-100">
    <header><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">{eyebrow}</p><h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p></header>
    {children}
  </section>;
}

export function FormField({ label, error, hint, ...props }) {
  const id = useId();
  return <div>
    <label htmlFor={id} className="text-sm font-medium">{label}{props.required && <span className="ml-1 text-teal-700 dark:text-teal-300" aria-hidden="true">*</span>}</label>
    <input id={id} className={`${inputClass} ${error ? "border-rose-500 dark:border-rose-400" : ""}`} aria-invalid={error ? true : undefined} aria-describedby={error || hint ? `${id}-help` : undefined} {...props} />
    {(error || hint) && <p id={`${id}-help`} className={`mt-2 text-xs ${error ? "text-rose-600 dark:text-rose-300" : "text-slate-500 dark:text-slate-400"}`}>{error || hint}</p>}
  </div>;
}

export function FormNotice({ children, error = false }) {
  if (!children) return null;
  return <div role={error ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm leading-6 ${error ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200" : "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200"}`}>{children}</div>;
}
