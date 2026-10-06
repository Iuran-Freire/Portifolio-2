import s from "./Portfolio.module.css";
export function SectionHeading({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className={s.sectionHeading}>
      <p className={s.eyebrow}>
        <span>{number}</span>
        <i />
        {label}
      </p>
      <h2>{title}</h2>
    </div>
  );
}
