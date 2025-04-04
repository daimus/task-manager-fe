import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Pencil, Check, Trash2} from "lucide-react";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

export default function TaskItem ({task} : {task: {id: number, name: string, completed: boolean}}){
    const [isEditMode, setIsEditMode] = useState(false);

    function handleEdit(){
        setIsEditMode(!isEditMode)
    }

    function handleTaskCheck(value: boolean){
        // TODO: Handle when task checked or unchecked
    }

    return (
        <>
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 w-full">
                    {
                        isEditMode ? <Button className="cursor-pointer" type="button" variant="destructive"><Trash2 /> </Button> : <Checkbox className="w-6 h-6 rounded-full cursor-pointer" onCheckedChange={handleTaskCheck} checked={task.completed} />
                    }
                    <div className="w-full">
                        {
                            isEditMode ?
                                <Input defaultValue="Mancing" className="w-full" /> :
                                <p className={cn(`text-md font-medium leading-none`, task.completed && 'line-through')}>{task.name}</p>
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