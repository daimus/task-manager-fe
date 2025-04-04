'use client'

import TaskItem from "@/components/task/task-item";
import useFetch from "@/hooks/useFetch";
import TaskLoading from "@/components/task/task-loading";
import {useWatch} from "@/hooks/useWatch";

export default function TaskList(){
    const {watch} = useWatch()
    const {data} = useFetch(`/api/v1/tasks?watch=${watch}`)

    if (!data){
        return <div className="mt-4">
            <TaskLoading />
        </div>
    }

    return (
        <>
            <div className="mt-4">
                <div className="grid gap-2">
                    {
                        (data || []).map(task => (
                            <TaskItem task={task} key={task.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}