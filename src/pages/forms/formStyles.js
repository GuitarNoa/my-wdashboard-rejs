export const inputClass = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100";
export const primaryButton = "inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40";
export const secondaryButton = "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";
export const panelClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-700 dark:bg-slate-800";

export function validateAccount(values, keys = ["name", "email", "password"]) {
  const errors = {};
  if (keys.includes("name") && !values.name.trim()) errors.name = "Enter your name.";
  if (keys.includes("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (keys.includes("password") && values.password.length < 8) errors.password = "Use at least 8 characters.";
  return errors;
}
