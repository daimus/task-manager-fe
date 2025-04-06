import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
import {ISessionData} from "@/type/session";
import {sessionConfig} from "@/constant/session";
import axios from "axios";
import {createAxiosConfig} from "@/lib/utils";

export async function GET() {
    const session = await getIronSession<ISessionData>(await cookies(), sessionConfig);
    await axios.post('/api/v1/auth/logout', {}, createAxiosConfig(session.access_token));
    session.destroy();
    redirect('/login')
}