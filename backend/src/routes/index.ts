import { FastifyInstance } from 'fastify';
import documentRoutes from './document.routes';

export function setupRoutes(server: FastifyInstance): void {
  server.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  // Register other routes
  server.register(documentRoutes, { prefix: '/api/documents' });

  server.log.info('Routes registered');
} 