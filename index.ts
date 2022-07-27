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

const author: DeepPartial<Author> = { name: "Author1" };
const category: DeepPartial<Category> = { name: "Category1" };
const posts: DeepPartial<Post>[] = [
  { text: "testTest", title: "testTitle", author, categories: [category] }
];

AppDataSource.initialize().then(() => {
  AppDataSource.manager.getRepository(Category).create(category);
  AppDataSource.manager.getRepository(Post).create(posts);

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
