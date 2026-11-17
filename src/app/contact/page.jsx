import PageHeader from "@/components/shared/PageHeader";
import ContactSection from "@/sections/contact/ContactSection";
import FaqSection from "@/components/shared/FaqSection";

export const metadata = {
  title: "Contact",
  description: "Start a project with Newlex Designs — brand identity, social media, packaging and CGI & 3D.",
};

// CONTACT PAGE — sections render top to bottom in this order.
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's create something"
        accent="unforgettable."
        lead="Have a project in mind, or just want to explore an idea? Tell us a little about it and we'll get back to you within 1–2 working days."
      />
      <ContactSection />
      <FaqSection />
    </>
  );
}
