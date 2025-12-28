import { prisma } from 'utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true
      },
      include: {
        lessons: {
          include: {
            video: {
              select: {
                id: true,
                publicPlaybackId: true,
                duration: true
              }
            }
          }
        },
        author: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    res.status(200).json(courses)
  } catch (e) {
    console.error('Request error', e)
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
}


