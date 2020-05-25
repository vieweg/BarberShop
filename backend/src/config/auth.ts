export default {
  jwt: {
    secret: process.env.APP_SECRET || 'asdubfyuvnsuhcywhfikasndocn',
    expiresIn: '1d',
  },
};
