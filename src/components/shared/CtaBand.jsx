import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/config/site";

// Yellow "start a project" band shown near the bottom of most pages.
export default function CtaBand({
  eyebrow = "Start a project",
  title = "Have a project in mind?",
  text = "Tell us about your idea — we'll help you take it from unseen to unforgettable.",
  buttonLabel = "Let's Talk",
}) {
  return (
    <section className="bg-yellow text-black">
      <div className="container-x flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="type-eyebrow mb-6 text-black/70">{eyebrow}</p>
          <h2 className="type-h2 text-black">{title}</h2>
          <p className="type-lead mt-6 max-w-xl text-black/80">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-col gap-5 sm:flex-row sm:items-center">
          <Button href="/contact" variant="primary">
            {buttonLabel}
          </Button>
          <a
            href={`mailto:${site.email}`}
            className="break-all text-base font-semibold text-black underline decoration-black/30 underline-offset-[6px] transition-colors hover:decoration-black"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
