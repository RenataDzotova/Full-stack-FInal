import { prisma } from '../../server/db/client'


export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const {category, code, title} = req.body;
            console.log({category, code, title})
            const post = await prisma.post.create({
                data: {
                    category,
                    code,
                    title,
            }
            })
            res.status(201).json(post)
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
