import { prisma } from "../../../server/db/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    const { method } = req;
    const postId = Number.parseInt(req.query.postId);

    switch (method) {
        case "GET":
            const likes = await prisma.like.findMany({
                where: {
                    postId
                },
            });
            res.status(200).json(likes);
            break;

        case "POST":
        case "PUT":
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

            const like = await prisma.like.findFirst({
                where: {
                    postId,
                    userId: prismaUser.id,
                },
            });
            if (like) {
                await prisma.like.delete({
                    where: {
                        id: like.id
                    },
                });
                res.status(202).send();
            } else {
                res.status(201).json(
                    await prisma.like.create({
                        data: {
                            postId,
                            userId: prismaUser.id,
                        },
                    })
                );
            }
            break;

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
