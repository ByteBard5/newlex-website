/*
  PROJECT › CREDITS
  Centred lines under the work. Uses the project's "credits" list
  (e.g. "Creative Director: Name") if it has one, otherwise its details
  (role, software, format, resolution).
*/
export default function ProjectCredits({ project }) {
  const lines = project.credits.length
    ? project.credits
    : [
        project.role && `Role: ${project.role}`,
        project.software.length && `Software: ${project.software.join(", ")}`,
        project.format && `Format: ${project.format}`,
        project.resolution && `Resolution: ${project.resolution}`,
      ].filter(Boolean);
  if (!lines.length) return null;

  return (
    <section className="bg-black text-white">
      <div className="container-x pb-12 text-center md:pb-16">
        {lines.map((line) => (
          <p key={line} className="text-base leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
