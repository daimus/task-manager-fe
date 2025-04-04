import {SessionOptions} from "iron-session";

export const sessionConfig : SessionOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: process.env.SESSION_NAME,
    cookieOptions: {
        secure: true,
    },
};