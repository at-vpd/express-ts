import { Request, Response } from "express";

import { AppDataSource } from "..";
import { Post } from "../entities/Post";

/**
 * Loads post by a given id.
 */
export async function postGetByIdAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = AppDataSource.manager.getRepository(Post);

  const postId = Number(request.params.id);

  // load a post by a given post id
  const post = await postRepository.findOne({ where: { id: postId } });

  // if post was not found return 404 to the client
  if (!post) {
    response.status(404);
    response.end();
    return;
  }

  // return loaded post
  response.send(post);
}
