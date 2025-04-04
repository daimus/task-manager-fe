'use client'

import TaskItem from "@/components/task/task-item";
import useFetch from "@/hooks/useFetch";
import TaskLoading from "@/components/task/task-loading";
import {useWatch} from "@/hooks/useWatch";

export default function TaskList(){
    const {watch} = useWatch()
    const {isLoading, data} = useFetch(`/api/v1/tasks?watch=${watch}`)
    return (
        <>
            <div className="mt-4">
                {
                    isLoading && <TaskLoading />
                }
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