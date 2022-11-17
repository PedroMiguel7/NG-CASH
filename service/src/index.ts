import { AppDataSource } from "./data-source";
import express from "express";
import routesuser from "./routes/users";
import { errorMiddleware } from "./middlewares/error";
import cors from "cors";
import routestransaction from "./routes/transaction";

// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUI from "swagger-ui-express";
// import swaggerOptions from "./swagger/swagger";
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(routesuser);
  app.use(routestransaction);

  // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  app.use(errorMiddleware);

  return app.listen(process.env.port);
});

const app = express();
app.use(express.json());
export const server = app.listen(8000);
