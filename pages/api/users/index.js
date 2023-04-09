import { prisma } from "../../../server/db/client";

export default async function handler(req, res) {
    res.status(200).json(await prisma.user.findMany());
}