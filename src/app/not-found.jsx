import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

// 404 page — shown for any address that doesn't exist.
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center py-24">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="type-h1 mt-8 max-w-4xl">
        This page is still <span className="mark">unseen.</span>
      </h1>
      <p className="type-lead mt-6 max-w-xl text-gray">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/portfolio" variant="outline">
          View Our Work
        </Button>
      </div>
    </section>
  );
}
