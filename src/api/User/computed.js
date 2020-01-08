import { prisma } from "../../../generated/prisma-client";

export default {  
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, args, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [
          {
            id: user.id
          },
          {
            following_some: { 
              id: parentId
            }
          }
        ]
      });
    },
    isSelf: (parent, args, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
}