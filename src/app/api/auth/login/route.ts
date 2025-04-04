import {NextRequest} from "next/server";
import {cookies} from "next/headers";
import {getIronSession} from "iron-session";
import axios, {AxiosRequestConfig} from "axios";
import {sessionConfig} from "@/constant/session";
import {ISessionData} from "@/type/session";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function POST(request: NextRequest) {
    const session = await getIronSession<ISessionData>(await cookies(), sessionConfig);
    const body = await request.json();

    const config : AxiosRequestConfig = {
        method: "POST",
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
        url: '/api/v1/auth/login',
        data: body,
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    }
    const response = await axios.request(config);
    if (response.status !== 200){
        return Response.json(response.data, {
            status: response.status
        })

    }

    session.type = response.data.type;
    session.access_token = response.data.access_token;
    session.updateConfig({
        ...sessionConfig,
        ttl: 86400
    });
    await session.save();

    return Response.json({
        message: 'success'
    }, {
        status: response.status
    });
}