import {Loader} from "lucide-react";
import {cn} from "@/lib/utils";

export default function Spinner ({size = '8', inline = false}){
    return (
        <>
            <div className={cn(inline ? 'inline' : 'flex flex-1 items-center justify-center ')}>
                <div className="flex flex-col items-center gap-1 text-center">
                    <Loader className={
                        cn('animate-spin', `w-${size} h-${size}`)
                    }/>
                </div>
            </div>
        </>
    )
}