export interface SectionMeta {
  id: string;
  /** Roman numeral — the house index mark. */
  numeral: string;
  label: string;
}

/** Ordered sections — drives the section rail, the mobile drawer and the indices. */
export const sections: SectionMeta[] = [
  { id: "home", numeral: "I", label: "Introduction" },
  { id: "about", numeral: "II", label: "Journey" },
  { id: "experience", numeral: "III", label: "Experience" },
  { id: "projects", numeral: "IV", label: "Work" },
  { id: "skills", numeral: "V", label: "Stack" },
  { id: "leadership", numeral: "VI", label: "Leadership" },
  { id: "education", numeral: "VII", label: "Education" },
  { id: "achievements", numeral: "VIII", label: "Recognition" },
  { id: "contact", numeral: "IX", label: "Contact" },
];
