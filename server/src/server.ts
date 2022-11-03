import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prima = new PrismaClient({
    log: ['query'],
});

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    // http://localhost:3333/pools/count
    fastify.get('/pools/count', async () => {
        const count = await prima.pool.count()
        
        return  { count }
    });

    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ });
}

bootstrap();