import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entities/Post";

/**
 * Loads all posts from the database.
 */
export async function postGetAllAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Post);

  // load posts
  const posts = await postRepository.find();

  // return loaded posts
  response.send(posts);
}
