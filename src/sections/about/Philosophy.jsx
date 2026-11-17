import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

/*
  ABOUT › OUR PHILOSOPHY — the belief, then three things every project deserves.
*/
const BELIEFS = [
  { word: "Curiosity", text: "Every idea deserves curiosity." },
  { word: "Attention", text: "Every detail deserves attention." },
  { word: "A voice of its own", text: "Every brand deserves its own visual language." },
];

export default function Philosophy() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Our Philosophy</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <h2 className="type-h1">
              <span className="text-outline block text-black/45">
                <SplitText text="Less ordinary." />
              </span>
              <span className="block">
                <SplitText text="More meaningful." delay={0.1} wordClassName="mark" />
              </span>
            </h2>
            <Reveal delay={0.1}>
              <p className="type-lead mt-8 max-w-2xl text-gray">
                We believe good design is thoughtful, distinctive, and made to communicate.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.word} delay={i * 0.1} className="group relative pt-8">
              {/* top rule that turns into a thick yellow bar on hover */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-black/15" />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-yellow transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <span className="type-eyebrow text-black/45">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-h3 mt-6">{b.word}</h3>
              <p className="mt-3 leading-relaxed text-gray">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
