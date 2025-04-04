'use client'

import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {useSession} from "@/components/session-provider";
import {createAxiosConfig, parseApiErrors} from "@/lib/utils";

export default function useFetch (url: string){
    const {token} = useSession();
    const [data, setData] = useState(null);
    const [error, setError] = useState<string[] | null>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (
            async function(){
                if (!url) return;
                setError(null);
                setIsEmpty(false);
                setIsLoading(true);
                try{
                    const config : AxiosRequestConfig = createAxiosConfig(token)
                    const response = await axios.get(url, config);
                    setIsEmpty(false);
                    setData(response.data)
                }catch(err : unknown){
                    if (err instanceof AxiosError){
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setError(parseApiErrors(err.response.data))
                    } else {
                        console.error(err)
                    }
                }finally{
                    setIsLoading(false);
                }
            }
        )()
    }, [url, token])

    return {isLoading, isEmpty, data, error};
}