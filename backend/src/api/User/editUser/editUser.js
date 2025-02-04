import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar, email, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: {
          id: user.id
        },
        data: {
          username,
          avatar,
          email,
          firstName,
          lastName,
          bio
        }
      });
    }
  }
}