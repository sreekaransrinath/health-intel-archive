import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { setupRoutes } from './routes';
import { initializeDatabase } from './config/database';

const server = Fastify({
  logger: true, // Enable logging for development
});

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    server.log.info('Database initialized successfully');

    // Register plugins
    await server.register(cors, {
      origin: '*', // Allow all origins for now, configure properly for production
    });
    await server.register(multipart, {
      attachFieldsToBody: true, // attach files to body
      // limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit - as per PRD
    });

    // Setup routes
    setupRoutes(server);

    // Start the server
    const port = process.env.PORT || 3001; // Default to 3001 for the backend
    await server.listen({ port: Number(port), host: '0.0.0.0' });
    server.log.info(`Server listening on port ${port}`);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer(); 