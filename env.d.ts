declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PG_URL: string;
      USER_BD: string;
      PWD: string;
    }
  }
}

export { }