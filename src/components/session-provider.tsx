'use client'

import {createContext} from "react";
import useSession from "@/hooks/useSession";
import Spinner from "@/components/spinner";
import {ISessionData} from "@/type/session";

export const SessionContext = createContext<ISessionData>({access_token: "", type: ""});
export default function SessionProvider ({children}: Readonly<{
    children: React.ReactNode;
}>){
    const {isLoading, session} = useSession();

    if (isLoading || !session) return <Spinner />

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}