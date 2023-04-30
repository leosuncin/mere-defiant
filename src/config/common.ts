declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
    }
  }
}

export default () => ({
  port: parseInt(process.env.PORT, 10),
});
