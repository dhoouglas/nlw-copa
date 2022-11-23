import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import ShortUniqueId from 'short-unique-id';


export async function poolRoutes(fastify: FastifyInstance) {
    // GET POOLS
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()

        return { count }
    });

    // POST
    fastify.post('/pools', async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(request.body);

        const generate = new ShortUniqueId({ length: 6 });
        const code = String(generate()).toLocaleUpperCase()

        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        return reply.status(201).send({ code })        
    });
}

