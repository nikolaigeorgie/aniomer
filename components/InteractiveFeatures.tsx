"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Message type definition
type Message = {
  role: "assistant" | "user";
  content: string;
};

// Course level type definition
type CourseLevel = {
  id: number;
  name: string;
  level: string;
  content: string;
  gradient: string;
};

// Icons
const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const MicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

// Reusable components
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-b from-card to-card/80 rounded-2xl p-4 border border-primary/10 shadow-lg overflow-hidden"
  >
    {children}
  </motion.div>
);

const ContentBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "space-y-4 rounded-xl p-4 bg-background/50 h-[320px] border border-primary/20 overflow-hidden",
      className
    )}
  >
    {children}
  </div>
);

const SectionTitle = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="mt-6 flex flex-col items-center">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-3">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <motion.h3
      whileHover={{ scale: 1.02 }}
      className="text-xl font-semibold text-primary mb-2 text-center"
    >
      {title}
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-muted-foreground text-sm leading-relaxed text-center"
    >
      {description}
    </motion.p>
  </div>
);

// Conversation Practice Section
const ConversationSection = ({ t }: { t: ReturnType<typeof useTranslations> }) => {
  const messages: Message[] = [
    {
      role: "assistant",
      content: t("conversation.messages.0"),
    },
    {
      role: "user",
      content: t("conversation.messages.1"),
    },
    {
      role: "assistant",
      content: t("conversation.messages.2"),
    },
  ];

  return (
    <SectionWrapper>
      <ContentBox>
        <div className="space-y-4 h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 5px 15px -3px rgba(139,90,43,0.15)",
                }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`max-w-[80%] text-sm p-3 ${
                  message.role === "user"
                    ? "rounded-[10px_0px_10px_10px] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md"
                    : "rounded-[0px_10px_10px_10px] bg-muted border border-primary/20 text-foreground shadow-md"
                }`}
              >
                {message.content}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border border-primary/30 rounded-full p-3 flex items-center gap-3 bg-background"
        >
          <input
            type="text"
            placeholder={t("conversation.placeholder")}
            className="flex-1 outline-none text-sm bg-transparent text-foreground placeholder-muted-foreground"
          />
          <div className="flex items-center gap-3 text-primary">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="hover:text-primary/80 transition-colors"
            >
              <MicIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              className="hover:text-primary/80 transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </ContentBox>

      <SectionTitle
        title={t("conversation.title")}
        description={t("conversation.description")}
        icon={MessageIcon}
      />
    </SectionWrapper>
  );
};

// Learning Paths Section
const LearningPathsSection = ({ t }: { t: ReturnType<typeof useTranslations> }) => {
  const [cards, setCards] = useState<CourseLevel[]>([
    {
      id: 1,
      name: t("paths.levels.0.name"),
      level: t("paths.levels.0.level"),
      content: t("paths.levels.0.content"),
      gradient: "from-amber-600 to-amber-700",
    },
    {
      id: 2,
      name: t("paths.levels.1.name"),
      level: t("paths.levels.1.level"),
      content: t("paths.levels.1.content"),
      gradient: "from-stone-500 to-stone-600",
    },
    {
      id: 3,
      name: t("paths.levels.2.name"),
      level: t("paths.levels.2.level"),
      content: t("paths.levels.2.content"),
      gradient: "from-emerald-600 to-emerald-700",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper>
      <ContentBox>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-primary">
            {t("paths.heading")}
          </h2>
          <p className="text-muted-foreground text-sm">{t("paths.subheading")}</p>
        </div>

        <div className="relative h-48">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`absolute w-full h-[160px] rounded-[20px] p-5 text-white bg-gradient-to-br ${card.gradient}`}
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                top: index * -8,
                scale: 1 - index * 0.05,
                zIndex: cards.length - index,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center relative z-10">
                <div className="w-10 h-7 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center">
                  <BookIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {card.level}
                  </span>
                </div>
              </div>
              <div className="mt-4 relative z-10">
                <p className="tracking-wider text-lg font-medium">
                  {card.content}
                </p>
                <p className="text-sm opacity-90 mt-2">{card.name}</p>
              </div>

              {/* Background shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                <div className="absolute -inset-[200%] animate-[spin_8s_linear_infinite] opacity-20 [background:conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentBox>

      <SectionTitle
        title={t("paths.title")}
        description={t("paths.description")}
        icon={BookIcon}
      />
    </SectionWrapper>
  );
};

// Progress Tracking Section
const ProgressSection = ({ t }: { t: ReturnType<typeof useTranslations> }) => {
  return (
    <SectionWrapper>
      <ContentBox>
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary font-medium text-sm">
            {t("progress.thisWeek")}
          </span>
          <div className="flex -space-x-2">
            {["M", "T", "W", "T", "F"].map((day, i) => (
              <div
                key={i}
                className={cn(
                  "w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium",
                  i < 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <div className="h-52 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-[10px] absolute inset-0 border border-dashed border-primary/30 bg-primary/5 p-4"
          />
          <motion.div
            whileHover={{ rotate: 1, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-[16px] absolute inset-0 border border-primary/20 bg-card shadow-lg p-4"
          >
            <div>
              <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded text-xs font-medium">
                {t("progress.currentLesson")}
              </span>
              <h4 className="text-foreground text-sm font-semibold mt-3 mb-1">
                {t("progress.lessonTitle")}
              </h4>
              <p className="text-muted-foreground text-xs">
                {t("progress.lessonDescription")}
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{t("progress.progress")}</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "65%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-primary">
                    12
                  </span>
                </div>
                <div className="text-muted-foreground text-xs">{t("progress.minutesLeft")}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium"
              >
                {t("progress.continue")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </ContentBox>

      <SectionTitle
        title={t("progress.title")}
        description={t("progress.description")}
        icon={ChartIcon}
      />
    </SectionWrapper>
  );
};

// Main Interactive Features component
export function InteractiveFeatures() {
  const t = useTranslations("interactiveFeatures");

  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Accent line */}
          <div className="w-24 h-[3px] bg-primary mb-8 mx-auto rounded-full"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("titleStart")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* Desktop: 3 columns, Tablet: 2 columns with stats below, Mobile: 1 column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ConversationSection t={t} />
          <LearningPathsSection t={t} />
          <ProgressSection t={t} />
        </div>

        {/* Stats row - shows on tablet to fill space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "500+", label: t("stats.students") },
            { value: "50+", label: t("stats.lessons") },
            { value: "5.0", label: t("stats.rating") },
            { value: "95%", label: t("stats.completion") },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InteractiveFeatures;

