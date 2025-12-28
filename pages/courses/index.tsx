import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Course, Lesson, Video } from "@prisma/client";
import { prisma } from "utils/prisma";
import type { NextPageWithLayout } from "pages/_app";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "next/head";

type CourseWithDetails = Course & {
  lessons: (Lesson & {
    video: Video | null;
  })[];
  author: {
    name: string | null;
    image: string | null;
  };
};

type CoursesPageProps = {
  courses: CourseWithDetails[];
};

// Format duration from seconds to readable format
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}

// Calculate total course duration
function getTotalDuration(lessons: (Lesson & { video: Video | null })[]): number {
  return lessons.reduce((total, lesson) => {
    return total + (lesson.video?.duration || 0);
  }, 0);
}

const CoursesPage: NextPageWithLayout<CoursesPageProps> = ({ courses }) => {
  return (
    <>
      <Head>
        <title>Courses | Aviya Languages</title>
        <meta
          name="description"
          content="Explore our premium language courses. Learn Hebrew or English with engaging video lessons and interactive exercises."
        />
      </Head>

      <div className="relative min-h-screen bg-background">
        {/* Background effects */}
        <div className="fixed inset-0 grid-pattern opacity-30" />
        <div className="hero-glow -top-40 start-[-10rem]" />

        {/* Header */}
        <section className="relative z-10 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Premium Language Courses
              </motion.span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                Explore Our <span className="text-primary">Courses</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose from our carefully crafted courses designed to take you from beginner to
                confident speaker. Each course is packed with engaging video lessons and
                interactive exercises.
              </p>

              {/* Filter tabs */}
              <div className="flex items-center justify-center gap-2">
                {["All Courses", "Hebrew", "English"].map((filter, i) => (
                  <button
                    key={filter}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      i === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="relative z-10 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            {courses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Courses Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re preparing amazing courses for you. Sign up to be notified when they launch!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Notified
                </Link>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/courses/${course.id}`} className="group block">
                      <div className="rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30">
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          {course.lessons[0]?.video?.publicPlaybackId ? (
                            <Image
                              src={`https://image.mux.com/${course.lessons[0].video.publicPlaybackId}/thumbnail.jpg?width=640&time=5`}
                              alt={course.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                              <svg
                                className="w-16 h-16 text-primary/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          )}

                          {/* Duration badge */}
                          {getTotalDuration(course.lessons) > 0 && (
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                              {formatDuration(getTotalDuration(course.lessons))}
                            </div>
                          )}

                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 transform duration-300">
                              <svg
                                className="w-6 h-6 text-primary-foreground ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta info */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {course.lessons.length}{" "}
                              {course.lessons.length === 1 ? "lesson" : "lessons"}
                            </span>
                            {!course.published && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                                Coming Soon
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {course.name}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                            {course.description}
                          </p>

                          {/* Author */}
                          <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                              {course.author?.image ? (
                                <Image
                                  src={course.author.image}
                                  alt={course.author.name || "Author"}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                <svg
                                  className="w-4 h-4 text-primary"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {course.author?.name || "Aviya"}
                              </p>
                              <p className="text-xs text-muted-foreground">Instructor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 pb-32">
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
                  Ready to Start Learning?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
                  Join hundreds of students who are already on their journey to fluency. Your
                  first lesson is free!
                </p>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-semibold text-lg hover:bg-primary-foreground/90 transition-colors"
                >
                  Start Free Trial
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Nav />
      {page}
    </>
  );
};

export default CoursesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
    include: {
      lessons: {
        include: {
          video: true,
        },
        orderBy: {
          id: "asc",
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
    },
  };
};


