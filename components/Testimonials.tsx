"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

const features = [
  { en: "Learn through real conversations, not textbooks", he: "למדו דרך שיחות אמיתיות, לא מספרי לימוד" },
  { en: "Personalized feedback on your pronunciation", he: "משוב אישי על ההגייה שלכם" },
  { en: "Progress at your own pace with bite-sized lessons", he: "התקדמו בקצב שלכם עם שיעורים קצרים" },
  { en: "Interactive exercises that make learning fun", he: "תרגולים אינטראקטיביים שהופכים את הלמידה לכיפית" },
];

// Placeholder testimonial images - replace with actual student photos
const testimonials = [
  { image: "/images/aviya.png", name: "Student 1" },
  { image: "/images/aviya.png", name: "Student 2" },
  { image: "/images/aviya.png", name: "Student 3" },
  { image: "/images/aviya.png", name: "Student 4" },
  { image: "/images/aviya.png", name: "Student 5" },
  { image: "/images/aviya.png", name: "Student 6" },
];

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="text-primary">{t("titleHighlight")}</span> {t("title")}
            </h2>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground/80">{t(`features.${index}`)}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              {t("cta")}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

          {/* Right Side - Orbiting Avatars */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] hidden md:block"
          >
            <OrbitingAvatars
              centerIcon={
                <div className="p-6 overflow-hidden z-20 flex flex-col items-center justify-center rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl">
                  <div className="text-4xl font-bold text-primary">5.0</div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{t("rating")}</div>
                </div>
              }
              testimonials={testimonials}
              className="w-full h-full"
            />
            {/* Gradient overlay for smooth edge */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-l from-background via-transparent to-transparent" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Testimonial Quotes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[0, 1, 2].map((index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                &ldquo;{t(`quotes.${index}.text`)}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {t(`quotes.${index}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{t(`quotes.${index}.name`)}</div>
                  <div className="text-sm text-muted-foreground">{t(`quotes.${index}.role`)}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const OrbitingAvatars = ({
  centerIcon,
  testimonials,
  className,
}: {
  centerIcon?: React.ReactNode;
  testimonials: Array<{ image: string; name: string }>;
  className?: string;
}) => {
  const [mounted, setMounted] = React.useState(false);
  const radius = 200;
  const speed = 30;
  const iconCount = testimonials.length;
  const angleStep = 360 / iconCount;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-calculate positions to avoid hydration mismatch
  const positions = React.useMemo(() => {
    return testimonials.map((_, index) => {
      const angle = angleStep * index;
      const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
      const y = Math.round(radius * Math.sin((angle * Math.PI) / 180));
      return { x, y };
    });
  }, [testimonials.length, angleStep]);

  return (
    <div className={cn("relative", className)}>
      {/* Center element */}
      {centerIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {centerIcon}
        </div>
      )}

      {/* Orbit ring */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Orbiting avatars - only render after mount to avoid hydration issues */}
      {mounted && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: radius * 2, height: radius * 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          {testimonials.map((testimonial, index) => {
            const { x, y } = positions[index];

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Testimonials;

