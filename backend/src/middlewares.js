export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error('You seed to log in to perform this action');
  }
}