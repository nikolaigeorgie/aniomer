"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PricingCard = ({
  tier,
  price,
  period,
  description,
  isHighlighted = false,
  features,
  ctaText,
  ctaLink,
}: {
  tier: string;
  price: number;
  period: string;
  description: string;
  isHighlighted?: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl flex flex-col p-1 ${
        isHighlighted
          ? "bg-gradient-to-b from-primary via-primary/80 to-primary/60"
          : "bg-muted"
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
          Most Popular
        </div>
      )}
      <div className={`flex flex-col h-full p-6 bg-card rounded-[22px] ${isHighlighted ? 'shadow-2xl' : 'shadow-lg'}`}>
        <div className="flex flex-col mb-6">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {tier}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">${price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <Link
          href={ctaLink}
          className={`w-full py-3 px-6 rounded-xl text-center font-semibold transition-all ${
            isHighlighted
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-foreground hover:bg-muted/80 border border-border"
          }`}
        >
          {ctaText}
        </Link>

        <div className="mt-6 pt-6 border-t border-border">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlighted ? 'text-primary' : 'text-primary/70'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export function Pricing() {
  const t = useTranslations("pricing");

  const tiers = [
    {
      tier: t("starter.name"),
      price: 29,
      period: t("period"),
      description: t("starter.description"),
      isHighlighted: false,
      features: [
        t("starter.features.0"),
        t("starter.features.1"),
        t("starter.features.2"),
        t("starter.features.3"),
        t("starter.features.4"),
      ],
      ctaText: t("starter.cta"),
      ctaLink: "/auth/signup",
    },
    {
      tier: t("premium.name"),
      price: 79,
      period: t("period"),
      description: t("premium.description"),
      isHighlighted: true,
      features: [
        t("premium.features.0"),
        t("premium.features.1"),
        t("premium.features.2"),
        t("premium.features.3"),
        t("premium.features.4"),
        t("premium.features.5"),
        t("premium.features.6"),
      ],
      ctaText: t("premium.cta"),
      ctaLink: "/auth/signup",
    },
    {
      tier: t("complete.name"),
      price: 149,
      period: t("period"),
      description: t("complete.description"),
      isHighlighted: false,
      features: [
        t("complete.features.0"),
        t("complete.features.1"),
        t("complete.features.2"),
        t("complete.features.3"),
        t("complete.features.4"),
        t("complete.features.5"),
      ],
      ctaText: t("complete.cta"),
      ctaLink: "/auth/signup",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-primary">{t("titleHighlight")}</span> {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-2">{t("guarantee")}</p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t("securePayment")}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t("cancelAnytime")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;

