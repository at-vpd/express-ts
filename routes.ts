import { postGetAllAction } from "./controller/PostGetAllByAction";
import { postGetByAuthorAction } from "./controller/PostGetByAuthor";
import { postGetByIdAction } from "./controller/PostGetByIdAction";
import { postSaveAction } from "./controller/PostSaveAction";

/**
 * All application routes.
 */
export const AppRoutes: any[] = [
  {
    path: "/posts",
    method: "get",
    action: postGetAllAction
  },
  {
    path: "/posts/:id",
    method: "get",
    action: postGetByIdAction
  },
  {
    path: "/posts",
    method: "post",
    action: postSaveAction
  },
  {
    path: "/posts/author/:authorId",
    method: "get",
    action: postGetByAuthorAction
  }
];
