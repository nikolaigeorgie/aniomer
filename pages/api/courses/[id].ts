import { prisma } from 'utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Course ID is required' })
  }

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        lessons: {
          include: {
            video: {
              select: {
                id: true,
                publicPlaybackId: true,
                duration: true,
                status: true
              }
            }
          },
          orderBy: {
            id: 'asc'
          }
        },
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    // Check if course is published or user is the author
    if (!course.published && course.authorId !== session?.user?.id) {
      return res.status(404).json({ error: 'Course not found' })
    }

    // Get completed lessons if user is logged in
    let completedLessons: number[] = []
    if (session?.user?.id) {
      const progress = await prisma.userLessonProgress.findMany({
        where: {
          userId: session.user.id,
          lessonId: {
            in: course.lessons.map(lesson => lesson.id)
          }
        }
      })
      completedLessons = progress.map(p => p.lessonId)
    }

    res.status(200).json({ course, completedLessons })
  } catch (e) {
    console.error('Request error', e)
    res.status(500).json({ error: 'Failed to fetch course' })
  }
}
