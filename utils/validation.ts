export const validationMessages = {
  phone: "נא להזין מספר טלפון ישראלי תקין (05X-XXXXXXX)",
  hebrew: "נא להזין טקסט בעברית",
  email: "נא להזין כתובת אימייל תקינה",
  required: "שדה חובה",
} as const;

export function isValidIsraeliPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(?:\+972|0)(?:5[0-9])\d{7}$/.test(cleaned);
}

export function isValidHebrewText(text: string): boolean {
  const hebrewChars = text.match(/[\u0590-\u05FF]/g);
  return (hebrewChars?.length ?? 0) >= 2;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
