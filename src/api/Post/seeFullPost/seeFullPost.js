import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragment';

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      console.log(post);
      const comments = await prisma.post({ id }).comments().$fragment(COMMENT_FRAGMENT);
      // const likeCount = (await prisma.post({ id }).likes()).length;
      const likeCount = await prisma
        .likesConnection({
          where: {
            post: {
              id
            }
          }
        })
        .aggregate()
        .count();
      const files = await prisma.post({ id }).files();
      const user = await prisma.post({ id }).user();
      return {
        post,
        files,
        comments,
        likeCount,
        user
      };
    }
  }
}