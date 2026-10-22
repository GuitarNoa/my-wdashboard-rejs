import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { FormField, FormNotice } from "../forms/FormUI";
import { primaryButton, validateAccount } from "../forms/formStyles";

export default function AuthForm({ register = false }) {
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function change(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined, ...(name === "password" ? { confirmPassword: undefined } : {}) }));
    setMessage("");
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateAccount(values, register ? ["name", "email", "password"] : ["email"]);
    if (!register && !values.password) nextErrors.password = "Enter a sample password.";
    if (register && values.password !== values.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    setMessage(register ? "Demo details validated. Registration is unavailable until an account service is connected. No account was created." : "Demo details validated. Sign-in is unavailable until an account service is connected. You have not been signed in.");
    setValues(current => ({ ...current, password: "", confirmPassword: "" }));
  }

  return <main className="flex min-h-dvh items-center justify-center bg-slate-100 p-4 text-slate-900 sm:p-8 dark:bg-slate-950 dark:text-slate-100">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.85fr_1fr] dark:border-slate-700 dark:bg-slate-800">
      <aside className="relative overflow-hidden bg-slate-900 p-7 text-white sm:p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -bottom-28 -left-20 size-96 rounded-full border-[48px] border-teal-800/40" aria-hidden="true" />
        <Link to="/" className="relative inline-flex items-center gap-3 font-semibold tracking-tight"><span className="rounded-xl bg-teal-600 p-2.5"><Squares2X2Icon className="size-5" /></span>Workspace</Link>
        <div className="relative mt-8 lg:my-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Made for your everyday</p><h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Your work.<br />A little clearer.</h1><p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">A focused space to explore your dashboard, insights and team.</p></div>
        <p className="relative mt-6 text-xs text-slate-400">Dashboard interface preview</p>
      </aside>
      <section className="p-6 sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300"><ArrowLeftIcon className="size-4" />Back to dashboard</Link>
        <h2 className="mt-7 text-2xl font-bold tracking-tight">{register ? "Create an account" : "Welcome back"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Demo form. Use sample details; authentication is not connected.</p>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          {register && <FormField label="Full name" name="name" autoComplete="name" required maxLength={120} value={values.name} onChange={change} error={errors.name} placeholder="Alex Morgan" />}
          <FormField label="Email address" name="email" type="email" autoComplete="username" required value={values.email} onChange={change} error={errors.email} placeholder="alex@example.com" />
          <FormField label="Password" name="password" type="password" autoComplete={register ? "new-password" : "current-password"} required value={values.password} onChange={change} error={errors.password} hint={register ? "At least 8 characters. Use a sample password." : undefined} />
          {register && <FormField label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" required value={values.confirmPassword} onChange={change} error={errors.confirmPassword} />}
          <FormNotice>{message}</FormNotice>
          <button type="submit" className={primaryButton + " w-full"}>{register ? "Preview registration" : "Preview sign-in"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">{register ? "Already have an account? " : "New here? "}<Link to={register ? "/auth/login" : "/auth/register"} className="font-semibold text-teal-700 hover:underline dark:text-teal-300">{register ? "Sign in" : "Create an account"}</Link></p>
      </section>
    </div>
  </main>;
}

