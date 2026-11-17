"use client";

import { motion } from "motion/react";
import { useLoaded } from "@/components/layout/LoaderProvider";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";

/*
  Title block at the top of inner pages.
  - title:  main heading           - accent: optional words after it, with a yellow marker
  - lead:   intro paragraph        - children: extra content under the lead
*/
export default function PageHeader({ eyebrow, title, accent, lead, children }) {
  const loaded = useLoaded();
  return (
    <section className="container-x pb-14 pt-14 md:pb-20 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <h1 className="type-h1 mt-8 max-w-5xl">
        <SplitText text={title} onLoad />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} onLoad delay={0.1} wordClassName="mark" />
          </>
        )}
      </h1>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="type-lead mt-8 max-w-2xl text-gray"
        >
          {lead}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
