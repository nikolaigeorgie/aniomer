"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import type { Session } from "next-auth";

type Course = {
  id: number;
  name: string;
  description: string;
  slug: string;
  published: boolean;
  lessons: {
    id: number;
    name: string;
    video: { status: string; duration: number | null } | null;
  }[];
  author: {
    name: string | null;
    image: string | null;
  };
};

type DashboardClientProps = {
  courses: Course[];
  session: Session;
};

export function DashboardClient({ courses, session }: DashboardClientProps) {
  const publishedCourses = courses.filter((c) => c.published);
  const draftCourses = courses.filter((c) => !c.published);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-[rgb(var(--color-border))]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 8l8-6 8 6v12l-8 6-8-6V8z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Aniomer</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm text-[rgb(var(--color-text-muted))] hover:text-white transition-colors"
              >
                Admin Panel
              </Link>
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-[rgb(var(--color-text-muted))] hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Welcome back, {session.user?.name?.split(" ")[0] || "Creator"}
          </h1>
          <p className="text-[rgb(var(--color-text-muted))] text-lg">
            Explore courses or create your own
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="glow-card p-6">
            <p className="text-sm text-[rgb(var(--color-text-muted))] mb-1">Total Courses</p>
            <p className="text-3xl font-bold gradient-text">{courses.length}</p>
          </div>
          <div className="glow-card p-6">
            <p className="text-sm text-[rgb(var(--color-text-muted))] mb-1">Published</p>
            <p className="text-3xl font-bold text-green-400">{publishedCourses.length}</p>
          </div>
          <div className="glow-card p-6">
            <p className="text-sm text-[rgb(var(--color-text-muted))] mb-1">Drafts</p>
            <p className="text-3xl font-bold text-amber-400">{draftCourses.length}</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/courses/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Course
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[rgb(var(--color-border))] text-white font-medium hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage Courses
            </Link>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">All Courses</h2>
          </div>

          {courses.length === 0 ? (
            <div className="glow-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
              <p className="text-[rgb(var(--color-text-muted))] mb-6">
                Create your first course to get started
              </p>
              <Link
                href="/admin/courses/new"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link href={`/courses/${course.slug}`} className="block glow-card overflow-hidden group">
                    {/* Thumbnail placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {!course.published && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-medium">
                          Draft
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-violet-400 transition-colors line-clamp-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-[rgb(var(--color-text-muted))] line-clamp-2 mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(var(--color-text-muted))]">
                          {course.lessons.length} {course.lessons.length === 1 ? "lesson" : "lessons"}
                        </span>
                        <span className="text-violet-400">View →</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

