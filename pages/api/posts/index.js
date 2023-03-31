import { prisma } from "../../../server/db/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!prismaUser) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { category, code, title } = req.body;
      console.log({ category, code, title });
      const post = await prisma.post.create({
        data: {
          category,
          code,
          title,
          userId: prismaUser.id,
        },
      });
      res.status(201).json(post);
      break;

    case "DELETE":
      const { id } = req.body;
      const deletedPost = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.status(201).json(post);
      console.log(deletedPost);
      break;

    case "GET":
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
