import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import {sessionConfig} from "@/constant/session";
import {cookies} from "next/headers";
import {ISessionData} from "@/type/session";
import {getIronSession} from "iron-session";

export async function middleware(request: NextRequest) {
    const session = await getIronSession<ISessionData>(cookies(), sessionConfig);
    if (!session?.access_token){
        return NextResponse.rewrite(new URL('/login', request.url))
    }

}

export const config = {
    matcher: "/",
}