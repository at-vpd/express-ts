import { DataSource, DeepPartial } from 'typeorm';
import { Author } from './entities/Author';
import { Category } from './entities/Category';
import { Post } from './entities/Post';

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRoutes } from './routes';

export const AppDataSource = new DataSource({ type: 'sqljs' });

const author: DeepPartial<Author> = { name: 'Author1' };
const category: DeepPartial<Category> = { name: 'Category1' };
const posts: DeepPartial<Post>[] = [
  { text: 'testTest', title: 'testTitle', author, categories: [category] },
];

AppDataSource.initialize().then(async () => {
  AppDataSource.manager.getRepository(Category).create(category);
  AppDataSource.manager.getRepository(Post).create(posts);

  const app = express();
  app.use(bodyParser.json());

  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch((err) => next(err));
      }
    );
  });

  console.log('App Started ');
});
