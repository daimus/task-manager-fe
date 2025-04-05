import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Pencil, Check, Trash2} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {cn, createAxiosConfig, parseApiErrors} from "@/lib/utils";
import axios, {AxiosError} from "axios";
import {toast} from "sonner";
import {useWatch} from "@/hooks/useWatch";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import {SessionContext} from "@/app/session-provider";

const updateTaskSchema = z.object({
    name: z.string().min(3)
});

export default function TaskItem ({task} : {task: {id: number, name: string, completed: boolean}}){
    const {access_token} = useContext(SessionContext);
    const {updateWatcher} = useWatch();
    const [isLoading, setIsLoading] = useState(false);
    const [t, sT] = useState({id: 0, name: '', completed: false})
    const [isEditMode, setIsEditMode] = useState(false);

    const form = useForm<z.infer<typeof updateTaskSchema>>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
            name: task.name
        },
    });

    async function handleTaskCheck(value: boolean){
        sT({
            ...t,
            completed: value
        });
        await updateTask({
            name: t.name,
            completed: value
        })
    }

    async function handleUpdate(values: z.infer<typeof updateTaskSchema>){
        if (values.name === t.name){
            setIsEditMode(false)
            return;
        }
        await updateTask({
            name: values.name,
            completed: t.completed
        })
    }

    async function handleDelete(){
        setIsLoading(true)
        try {
            await axios.delete(`/api/v1/tasks/${task.id}`, createAxiosConfig(access_token));
            updateWatcher();
            setIsEditMode(false)
        } catch (e: unknown) {
            if (e instanceof AxiosError){
                toast.error(parseApiErrors(e.response?.data).join('\n'))
            } else {
                console.error(e)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function updateTask(data : {name: string, completed: boolean}){
        setIsLoading(true)
        try {
            await axios.patch(`/api/v1/tasks/${task.id}`, data, createAxiosConfig(access_token));
            updateWatcher();
            setIsEditMode(false)
        } catch (e : unknown) {
            if (e instanceof AxiosError){
                toast.error(parseApiErrors(e.response?.data).join('\n'))
            } else {
                console.error(e)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        sT(task)
    }, [task]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4 w-full">
                        {
                            isEditMode ?
                                <Button className="cursor-pointer" type="button" variant="destructive" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete()
                                }}>
                                    <>
                                        {
                                            isLoading ? <Spinner /> : <Trash2/>
                                        }
                                    </>
                                </Button> : <Checkbox className="w-6 h-6 rounded-full cursor-pointer"
                                                      onCheckedChange={handleTaskCheck} checked={t.completed}/>
                        }
                        <div className="w-full">
                            {
                                isEditMode ?
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> :
                                    <p className={cn(`text-md font-medium leading-none`, t.completed && 'line-through')}>{t.name}</p>
                            }
                        </div>
                    </div>
                    {
                        isEditMode ? <Button className="cursor-pointer" type="submit" disabled={isLoading}>
                            <>
                                {
                                    isLoading ? <Spinner /> : <Check/>
                                }
                            </>
                        </Button> : <Button className="cursor-pointer" type="button" onClick={(e) => {
                            e.preventDefault();
                            setIsEditMode(true);
                        }}>
                            <Pencil/>
                        </Button>
                    }
                </form>
            </Form>
        </>
    )
}