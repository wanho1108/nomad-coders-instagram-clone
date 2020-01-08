import { prisma } from "../../../../generated/prisma-client";
// import { USER_FRAGMENT } from '../../../fragment';

export default {
  Query: {
    me: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = request.user;
      // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      return {
        user,
        posts
      };
    }
  },
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    }
  }
}