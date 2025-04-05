import TaskManager from "@/app/task-manager";
import {getIronSession} from "iron-session";
import {ISessionData} from "@/type/session";
import {cookies} from "next/headers";
import {sessionConfig} from "@/constant/session";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Task Manager'
}

export default async function Home() {
    const session = await getIronSession<ISessionData>(await cookies(), sessionConfig);
    return <TaskManager accessToken={session.access_token}/>
}
