'use client'

import {useContext, useEffect, useState} from "react";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {createAxiosConfig, parseApiErrors} from "@/lib/utils";
import {SessionContext} from "@/components/session-provider";

export default function useFetch (url: string){
    const {access_token} = useContext(SessionContext);
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
                    const config : AxiosRequestConfig = createAxiosConfig(access_token)
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
    }, [url, access_token])

    return {isLoading, isEmpty, data, error};
}