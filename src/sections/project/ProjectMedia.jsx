import Image from "@/components/ui/SmartImage";
import AutoVideo from "@/components/ui/AutoVideo";

/*
  PROJECT › MEDIA
  Every picture and video of the project ("results", then "gallery"), stacked one under
  another, each across the full width and never taller than the screen. So one piece
  of work fills one screen; tall (portrait) pieces are centred with black either side.
  The owner asked for this instead of showing two or four pictures side by side.
*/
const FIT = "mx-auto block h-auto max-h-[calc(100svh-5rem)] w-full object-contain";

export default function ProjectMedia({ project }) {
  const items = [...project.results, ...project.gallery.map((src) => ({ type: "image", src }))];
  if (!items.length) return null;

  return (
    <section className="bg-black px-4 pb-16 md:px-[50px] md:pb-24">
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) =>
          item.type === "video" ? (
            <AutoVideo key={item.src + i} src={item.src} controls className={FIT} />
          ) : (
            <Image
              key={item.src + i}
              src={item.src}
              alt={`${project.title}, ${i + 1} of ${items.length}`}
              width={1920}
              height={1080}
              sizes="100vw"
              className={FIT}
            />
          )
        )}
      </div>
    </section>
  );
}
