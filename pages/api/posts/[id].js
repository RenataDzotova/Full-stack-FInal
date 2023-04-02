import { prisma } from "../../../server/db/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;

  const { id } = req.query;
  switch (method) {
    case "DELETE":
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

      const deletedPost = await prisma.post.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json(deletedPost);
      break;

    case "PUT":
      const { category, code, title } = req.body;
      const updatedPost = await prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          category,
          code,
          title,
        },
      });
      res.status(200).json(updatedPost);
      break;

    case "GET":
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(post);
      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
