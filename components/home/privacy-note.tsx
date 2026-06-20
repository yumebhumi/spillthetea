"use client";

import { motion } from "framer-motion";

export function PrivacyNote() {
  return (
    <section className="px-0 pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="page-shell">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="matcha-card rounded-[1.35rem] px-4 py-5 text-sm leading-7 text-[#5f6668] sm:rounded-[1.75rem] sm:px-8 sm:py-6"
          >
            <p className="font-semibold uppercase tracking-[0.22em] text-[#6b8f71]">
              Privacy Note
            </p>
            <p className="text-safe-wrap mt-3 text-base text-[#4f585a]">
              Your chats are not saved. No login, no database, no receipts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="matcha-card rounded-[1.35rem] px-4 py-6 sm:rounded-[1.75rem] sm:px-8 sm:py-8"
          >
            <p className="text-safe-wrap max-w-2xl text-base leading-7 text-[#687173]">
              Built for screenshots, overthinking, and harmless tea with zero account
              drama.
            </p>

            <div className="mt-8 break-words pt-2 text-sm text-[#6f7779]">
              <p>&copy; 2026 Spill The Tea. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
