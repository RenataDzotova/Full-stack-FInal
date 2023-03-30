import { prisma } from '../../../server/db/client'

export async function getServerSideProps() {
  // will always run on the server
  //newest first
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

export default async function handler(req, res) {
  const { posts } = await getServerSideProps()
  res.status(200).json(posts)
}