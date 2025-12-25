"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faq");

  const faqKeys = ["0", "1", "2", "3", "4", "5"] as const;

  return (
    <section className="w-full py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("titleStart")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 rounded-2xl bg-muted/50 p-4 border border-border"
        >
          {faqKeys.map((key, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
                <span className="text-lg font-medium text-foreground">{t(`items.${key}.question`)}</span>
              </button>
              <AnimatePresence mode="sync">
                {openIndex === index && (
                  <motion.div
                    key={`content-${index}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { 
                        height: "auto",
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                          mass: 1
                        }
                      },
                      collapsed: { 
                        height: 0,
                        opacity: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                          mass: 1
                        }
                      }
                    }}
                    className="px-6 overflow-hidden"
                  >
                    <div className="pb-5 ps-9">
                      <p className="text-muted-foreground leading-relaxed">{t(`items.${key}.answer`)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">{t("stillHaveQuestions")}</p>
          <a 
            href="mailto:contact@aniomer.com" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t("contactUs")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;

