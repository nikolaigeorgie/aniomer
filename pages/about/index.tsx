import type { ReactElement } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { NextPageWithLayout } from "pages/_app";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "next/head";

const milestones = [
  {
    year: "2018",
    title: "Started Teaching",
    description: "Began teaching Hebrew and English to friends and family, discovering a passion for language education.",
  },
  {
    year: "2020",
    title: "Online Teaching",
    description: "Transitioned to online teaching during the pandemic, reaching students worldwide.",
  },
  {
    year: "2022",
    title: "Method Development",
    description: "Developed unique teaching methodology focused on real conversation and practical skills.",
  },
  {
    year: "2024",
    title: "Platform Launch",
    description: "Launched this platform to share my courses with students everywhere, anytime.",
  },
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Passion for Teaching",
    description: "I genuinely love helping students succeed. Your progress is my greatest reward.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Real Conversations",
    description: "Forget boring textbooks. We learn through real dialogue, practical situations, and cultural context.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Personalized Learning",
    description: "Every student is unique. I adapt my teaching to your pace, goals, and learning style.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fun & Engaging",
    description: "Learning should be enjoyable! My lessons are designed to keep you motivated and excited.",
  },
];

const stats = [
  { value: "500+", label: "Happy Students" },
  { value: "50+", label: "Video Lessons" },
  { value: "5.0", label: "Average Rating" },
  { value: "6+", label: "Years Teaching" },
];

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>About Aviya | Language Teacher & Course Creator</title>
        <meta
          name="description"
          content="Meet Aviya, a passionate language teacher helping students master Hebrew and English through engaging video courses and personalized learning."
        />
      </Head>

      <div className="relative min-h-screen bg-background">
        {/* Background effects */}
        <div className="fixed inset-0 grid-pattern opacity-30" />
        <div className="hero-glow -top-40 start-[-10rem]" />

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Meet Your Instructor
                </motion.span>

                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-foreground">
                  Hi, I&apos;m <span className="text-primary">Aviya</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  I&apos;m a passionate language teacher with over 6 years of experience helping students 
                  achieve fluency in Hebrew and English. My unique approach combines real conversation 
                  practice, cultural immersion, and personalized feedback to make language learning 
                  effective and enjoyable.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Born and raised in Israel, I&apos;ve always been fascinated by the power of language 
                  to connect people across cultures. After years of teaching one-on-one, I created 
                  this platform to share my methods with students everywhere.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
                  >
                    Explore Courses
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <a
                    href="mailto:hello@aviya.com"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-muted transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </a>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                  <Image
                    src="/images/aviya.png"
                    alt="Aviya - Language Instructor"
                    fill
                    className="object-cover object-top"
                    style={{ mixBlendMode: 'multiply' }}
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">5.0 Rating</div>
                      <div className="text-sm text-muted-foreground">From 500+ students</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute top-6 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
                >
                  Native Speaker 🇮🇱
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                My Teaching <span className="text-primary">Philosophy</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                I believe everyone can learn a new language. Here&apos;s what makes my approach different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="relative z-10 py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                My <span className="text-primary">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From teaching friends to building a global learning platform.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2" />

                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-orange-600" />
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="relative p-12 sm:p-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">
                  Ready to Start Your Language Journey?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
                  Join hundreds of students who&apos;ve transformed their language skills with my courses. 
                  Your first lesson is free!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-semibold text-lg hover:bg-primary-foreground/90 transition-colors"
                  >
                    Browse Courses
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Nav />
      {page}
    </>
  );
};

export default AboutPage;

