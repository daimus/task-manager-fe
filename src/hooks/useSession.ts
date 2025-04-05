import useSWR from "swr";
import {ISessionData} from "@/type/session";

async function fetchJson<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> {
    return fetch(input, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        ...init,
    }).then((res) => res.json());
}

export default function useSession() {
    const {data, isLoading} = useSWR(
        '/api/auth/session',
        fetchJson<ISessionData>,
        {
            fallbackData: {
                type: '',
                access_token: ''
            },
        },
    );

    return {
        session: data, isLoading
    };
}