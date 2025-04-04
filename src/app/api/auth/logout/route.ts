import {NextRequest} from "next/server";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
import {ISessionData} from "@/type/session";
import {sessionConfig} from "@/constant/session";

export async function GET(request: NextRequest) {
    const session = await getIronSession<ISessionData>(cookies(), sessionConfig);
    await session.destroy();
    redirect('/login')
}