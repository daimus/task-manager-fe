'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, Plus} from "lucide-react";
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, {AxiosError} from "axios";
import {cn, createAxiosConfig, parseApiErrors} from "@/lib/utils";
import {useSession} from "@/components/session-provider";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import {useWatch} from "@/hooks/useWatch";
import {toast} from "sonner";

const createTaskSchema = z.object({
    name: z.string().min(3),
    completed: z.coerce.boolean().default(false)
});

export default function CreateTaskForm() {
    const {token} = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const {updateWatcher} = useWatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = useForm<z.input<typeof createTaskSchema>, any, z.output<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            name: "",
            completed: false
        }
    });

    async function onSubmit(values: z.infer<typeof createTaskSchema>) {
        setIsLoading(true);
        try {
            await axios.post("/api/v1/tasks", values, createAxiosConfig(token));
            form.reset();
            updateWatcher();
            setIsCreated(true);
            setTimeout(function (){
                setIsCreated(false)
            }, 1500)
        } catch (e: unknown) {
            if (e instanceof AxiosError){
                toast.error(parseApiErrors(e.response?.data).join('\n'))
            } else {
                console.error(e)
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-2">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Mancing"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <Button type="submit" className={cn(`w-full cursor-pointer`, isLoading && 'cursor-not-allowed')}>
                            <>
                                {
                                    isLoading ? <Spinner /> : isCreated ? <Check/> : <Plus/>
                                }
                            </>
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}