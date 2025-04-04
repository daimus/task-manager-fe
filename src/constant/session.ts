import {SessionOptions} from "iron-session";

export const sessionConfig : SessionOptions = {
    password: process.env.SESSION_PASSWORD || '',
    cookieName: process.env.SESSION_NAME || 'X-TASKMANAGER',
    cookieOptions: {
        secure: true,
    },
};