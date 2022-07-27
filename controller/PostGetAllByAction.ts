import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Post } from "../entities/Post";

/**
 * Loads all posts from the database.
 */
export async function postGetAllAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = AppDataSource.manager.getRepository(Post);

  const posts = await postRepository.find();

  console.log({ posts });
  // load posts

  // return loaded posts
  response.send(posts);
}
