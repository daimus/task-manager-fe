import TaskManager from "@/app/task-manager";
import {getIronSession} from "iron-session";
import {ISessionData} from "@/type/session";
import {cookies} from "next/headers";
import {sessionConfig} from "@/constant/session";

export default async function Home() {
    const session = await getIronSession<ISessionData>(cookies(), sessionConfig);
    return <TaskManager accessToken={session.access_token}/>
}
