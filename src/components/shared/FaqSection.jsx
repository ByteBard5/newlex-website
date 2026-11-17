import { faqs } from "@/content/faqs";
import Accordion from "@/components/ui/Accordion";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

// Frequently asked questions — edit them in src/content/faqs.js
export default function FaqSection() {
  return (
    <section className="container-x section-y grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="type-h2 mt-6">
          <SplitText text="Questions, answered." />
        </h2>
      </div>
      <div className="lg:col-span-8">
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
