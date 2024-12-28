// config/swaggerConfig.js
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { swaggerDefinition } from './swaggerDefinition.js';

const options = {
  definition: swaggerDefinition,
  apis: ['./routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec));
};

export default setupSwagger;