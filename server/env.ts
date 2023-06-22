declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
        }
    }
}

declare module 'cors';

export {}