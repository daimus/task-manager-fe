import {Skeleton} from "@/components/ui/skeleton";

export default function TaskLoading (){
    return (
        <>
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="h-8 w-8 rounded-full"/>
                    <div className="flex-1 w-full">
                        <Skeleton className="h-8 w-full"/>
                    </div>
                </div>
                <Skeleton className="h-8 w-8 rounded"/>
            </div>
        </>
    )
}