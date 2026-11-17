import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";

// HOME › WHO WE ARE — short studio intro with a link to the About page.
export default function WhoWeAre() {
  return (
    <section className="section-y overflow-hidden">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Who We Are</Eyebrow>
            </Reveal>
            <h2 className="type-h2 mt-7">
              <span className="block">
                <SplitText text="Different minds." />
              </span>
              <span className="block">
                <SplitText text="One creative vision." delay={0.1} wordClassName="mark" />
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-14">
            <Reveal>
              <p className="type-lead text-black">
                We&apos;re <strong className="font-semibold">Newlex Designs</strong>, an independent creative studio where
                imagination meets intention.
              </p>
              <p className="mt-6 leading-relaxed text-gray">
                From bold brand identities to compelling digital experiences, we bring together design, motion, and
                storytelling to turn ambitious ideas into something extraordinary.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 border-l-[3px] border-yellow pl-5 font-display text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold leading-snug tracking-[-0.02em] text-black">
                We don&apos;t just make things look good. We make them worth remembering.
              </p>
              <Button href="/about" className="mt-10">
                Discover Our Studio
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
