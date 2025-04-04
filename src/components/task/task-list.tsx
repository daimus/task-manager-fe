'use client'

import TaskItem from "@/components/task/task-item";
import {useState} from "react";

export default function TaskList(){
    const [tasks, setTasks] = useState([
        {id: 1, name: 'Mancing', completed: false},
        {id: 2, name: 'Beli Ikan', completed: false},
        {id: 3, name: 'Kasih Makan Ikan', completed: false},
        {id: 4, name: 'Kasih Minum Ikan', completed: true},
    ])
    return (
        <>
            <div className="mt-4">
                <div className="grid gap-2">
                    {
                        tasks.map(task => (
                            <TaskItem task={task} key={task.id}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}