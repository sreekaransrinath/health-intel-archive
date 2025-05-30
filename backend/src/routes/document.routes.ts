import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import * as documentController from '../controllers/document.controller';

export default async function documentRoutes(server: FastifyInstance) {
  // Placeholder for POST /api/documents - Upload document
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // Basic file handling example
    // const data = await request.file(); // if using request.file() directly
    // if (data) {
      // console.log('File received:', data.filename);
      // process file
      // await data.toBuffer(); // Or stream to a file
    // }
    // return reply.send({ message: 'Document upload placeholder', file: data?.filename });
    
    // Using attachFieldsToBody: true from fastify-multipart
    // The file will be available in request.body if it's a single file upload named 'file'
    // For multiple files or specific field names, adjust accordingly.
    // console.log(request.body);
    // const file = (request.body as any)?.file;
    // if (file && file.filename) {
    //   console.log('File received via body:', file.filename);
    //   // TODO: Call controller to handle file processing and saving
    //   return reply.send({ message: 'Document uploaded successfully via body', filename: file.filename });
    // } else {
    //   return reply.status(400).send({ message: 'No file uploaded or incorrect field name' });
    // }
    return reply.send({ message: 'Document upload endpoint placeholder. Implement controller logic.' });
  });

  // Placeholder for GET /api/documents - List documents
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // TODO: Call controller to get list of documents
    return reply.send({ message: 'List documents placeholder' });
  });

  // Placeholder for GET /api/documents/:id - Get specific document
  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    // TODO: Call controller to get document by ID
    return reply.send({ message: `Get document placeholder for ID: ${id}` });
  });

} 