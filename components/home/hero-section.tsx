"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import imgTea from "@/imgtea.png";

const featureCards = [
  {
    icon: "😌",
    label: "Judgment",
    value: "Free",
  },
  {
    icon: "🔒",
    label: "Privacy",
    value: "Protected",
  },
  {
    icon: "☕",
    label: "Tea",
    value: "Fresh",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-0 pb-10 pt-6 sm:pb-14 sm:pt-10">
      <div className="page-shell relative">
        <div className="matcha-blob left-[6%] top-10 hidden h-32 w-32 bg-[#dde7d7] sm:block" />
        <div className="matcha-blob right-[8%] top-6 hidden h-24 w-24 bg-[#ece2d5] sm:block" />
        <div className="matcha-blob bottom-16 right-[18%] hidden h-24 w-24 bg-[#e5ede0] sm:block" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-full border border-[#e2d5cb] bg-[#fcfaf6] shadow-[0_10px_20px_rgba(92,112,97,0.06)]">
              <Image
                src={imgTea}
                alt="Spill The Tea logo"
                className="h-11 w-11 object-cover sm:h-12 sm:w-12"
                priority
              />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b8f71] sm:text-sm sm:tracking-[0.28em]">
              Spill The Tea
            </p>
          </div>
          <a
            href="#chat-text"
            className="soft-lift rounded-full bg-[#6b8f71] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#5f8165] sm:px-5"
          >
            Start
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="matcha-card relative rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-7 lg:p-8"
        >
          <div className="matcha-dots rounded-[1.5rem] border border-[#e3d2c6] bg-[#f8f5ef] p-4 sm:rounded-[1.65rem] sm:p-6 lg:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-3.5 w-3.5 rounded-full bg-[#6b8f71]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#ddbea9]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#d5dfd0]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div className="py-2">
                <div className="mb-4 inline-flex rounded-full bg-[#f4f0e8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b8f71] sm:text-xs sm:tracking-[0.24em]">
                  Tea Preview
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h1 className="max-w-2xl text-[2.7rem] font-extrabold leading-[1] tracking-[-0.05em] text-[#2d3436] sm:text-6xl lg:text-7xl">
                      Because your friends said
                      <br />
                      &ldquo;send me the screenshot.&rdquo;
                    </h1>

                    <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#5f6668] sm:mt-5 sm:text-lg sm:leading-8">
                      Paste the chat. We&apos;ll handle the overthinking.
                    </p>

                    <div className="mt-6 sm:mt-7">
                      <a
                        href="#chat-text"
                        className="soft-lift inline-flex rounded-full bg-[#6b8f71] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#5f8165] sm:px-7 sm:py-3.5 sm:text-base"
                      >
                        Spill The Tea ☕
                      </a>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-[#6f7779]">
                        No login. No accounts. No saved chats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="ml-auto max-w-[92%] rounded-[1.35rem] rounded-br-md bg-[#789979] px-4 py-3.5 text-[15px] leading-6 text-white shadow-[0_10px_24px_rgba(92,112,97,0.08)] sm:max-w-[86%] sm:rounded-[1.6rem] sm:px-5 sm:py-4 sm:text-base sm:leading-7">
                  be honest... is this flirting?
                  <span className="mt-2 block text-right text-xs text-white/75">11:24 PM</span>
                </div>

                <div className="max-w-[94%] rounded-[1.35rem] rounded-bl-md bg-[#fcfaf6] px-4 py-3.5 text-[15px] leading-6 text-[#4d5557] shadow-[0_10px_24px_rgba(92,112,97,0.05)] sm:max-w-[84%] sm:rounded-[1.6rem] sm:px-5 sm:py-4 sm:text-base sm:leading-7">
                  respectfully, the mixed signals are doing cardio.
                  <span className="mt-2 block text-right text-xs text-[#8a9193]">11:25 PM</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {featureCards.map((card, index) => (
                    <motion.article
                      key={card.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: 0.2 + index * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="result-card rounded-[1.35rem] bg-[#fcfaf6] p-4 shadow-[0_10px_24px_rgba(92,112,97,0.05)] sm:rounded-[1.5rem]"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf2e7] text-xl">
                        {card.icon}
                      </div>
                      <p className="text-sm font-semibold text-[#5e6668]">{card.label}</p>
                      <p className="mt-2 text-[1.45rem] font-extrabold tracking-[-0.04em] text-[#2d3436] sm:text-[1.7rem]">
                        {card.value}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-dashed border-[#d7c6ba] bg-[#fbf7f1] px-4 py-4 sm:rounded-[1.5rem] sm:px-5 sm:py-5">
              <p className="text-xl font-semibold tracking-[-0.03em] text-[#4e5658] sm:text-2xl">
                Your group chat&apos;s smartest unemployed friend.
              </p>
              <p className="mt-2 text-sm text-[#7b8385]">
                No accounts. No saved chats. Just vibes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
