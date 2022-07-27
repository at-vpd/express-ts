import { DataSource, DeepPartial } from "typeorm";

import { Author } from "./entities/Author";
import { Category } from "./entities/Category";
import { Post } from "./entities/Post";

import "reflect-metadata";
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

export const AppDataSource = new DataSource({
  type: "sqljs",
  entities: [Author, Category, Post],
  synchronize: true
});

AppDataSource.initialize().then(async () => {
  const author = AppDataSource.manager
    .getRepository(Author)
    .create({ name: "Author1" });

  await AppDataSource.manager.save(author);

  const category = AppDataSource.manager
    .getRepository(Category)
    .create({ name: "test" });

  await AppDataSource.manager.save(category);

  const newPost = AppDataSource.manager.getRepository(Post).create({
    text: "test",
    title: "testTitle",
    author,
    categories: [category]
  });

  await AppDataSource.manager.save(newPost);

  console.log("Created Seed Data");
  const app: any = express();
  app.use(bodyParser.json());

  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch((err: any) => next(err));
      }
    );
  });

  // run app
  app.listen(3000, () =>
    console.log("Express application is up and running on port 3000")
  );
});
