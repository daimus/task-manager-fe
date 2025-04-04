import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Pencil, Check, Trash2} from "lucide-react";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {cn, createAxiosConfig, parseApiErrors} from "@/lib/utils";
import axios, {AxiosError} from "axios";
import {toast} from "sonner";
import {useSession} from "@/components/session-provider";
import {useWatch} from "@/hooks/useWatch";

export default function TaskItem ({task} : {task: {id: number, name: string, completed: boolean}}){
    const {token} = useSession();
    const {updateWatcher} = useWatch();
    const [t, sT] = useState(task)
    const [isEditMode, setIsEditMode] = useState(false);

    function handleEdit(){
        setIsEditMode(!isEditMode)
    }

    function handleTaskCheck(value: boolean){
        sT({
            ...t,
            completed: value
        });
        updateTask({
            name: t.name,
            completed: value
        })
    }

    async function updateTask(data : {name: string, completed: boolean}){
        try {
            await axios.patch(`/api/v1/tasks/${task.id}`, data, createAxiosConfig(token));
            updateWatcher();
        } catch (e: AxiosError) {
            toast.error(parseApiErrors(e.response?.data).join('\n'))
        }
    }

    return (
        <>
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 w-full">
                    {
                        isEditMode ? <Button className="cursor-pointer" type="button" variant="destructive"><Trash2 /> </Button> : <Checkbox className="w-6 h-6 rounded-full cursor-pointer" onCheckedChange={handleTaskCheck} checked={t.completed} />
                    }
                    <div className="w-full">
                        {
                            isEditMode ?
                                <Input defaultValue="Mancing" className="w-full" /> :
                                <p className={cn(`text-md font-medium leading-none`, t.completed && 'line-through')}>{t.name}</p>
                        }
                    </div>
                </div>
                <Button className="cursor-pointer" type="button" onClick={handleEdit}>
                    <>
                        {
                            isEditMode ? <Check /> : <Pencil/>
                        }
                    </>
                </Button>
            </div>
        </>
    )
}