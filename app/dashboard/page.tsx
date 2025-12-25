import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/utils/prisma";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { published: true },
        { author: { id: session.user?.id } },
      ],
    },
    include: {
      lessons: {
        include: {
          video: true,
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

  return <DashboardClient courses={courses} session={session} />;
}

