import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
import {ISessionData} from "@/type/session";
import {sessionConfig} from "@/constant/session";

export async function GET() {
    const session = await getIronSession<ISessionData>(await cookies(), sessionConfig);
    await session.destroy();
    redirect('/login')
}