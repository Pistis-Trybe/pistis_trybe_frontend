import { Check } from "lucide-react";

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "number", label: "Contains a number", test: (p) => /[0-9]/.test(p) },
  { id: "special", label: "Contains a special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

// Live checklist: each rule ticks off as the password satisfies it.
const PasswordChecklist = ({ password = "" }) => {
  const met = PASSWORD_RULES.filter((r) => r.test(password)).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white/50 p-3">
      <div className="flex gap-1 mb-3" aria-hidden="true">
        {PASSWORD_RULES.map((r, i) => (
          <span key={r.id}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < met ? (met === PASSWORD_RULES.length ? "bg-green-500" : "bg-purple-400") : "bg-gray-200"
            }`} />
        ))}
      </div>
      <ul className="flex flex-col gap-1.5" aria-label="Password requirements">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.id}
              className={`flex items-center gap-2 text-sm transition-colors duration-200 ${ok ? "text-green-700" : "text-gray-500"}`}>
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                ok ? "bg-green-500 border-green-500 text-white scale-110" : "border-gray-300 text-transparent"
              }`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={ok ? "font-medium" : ""}>{rule.label}</span>
              <span className="sr-only">{ok ? "(met)" : "(not met)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordChecklist;
