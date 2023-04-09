import { prisma } from "../../../server/db/client";

export default async function (req, res) {
  res.status(200).json(
    await prisma.user.findUnique({
      where: { id: req.query.id },
    })
  );
}