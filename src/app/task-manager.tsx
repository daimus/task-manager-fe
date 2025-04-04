'use client'

import {GalleryVerticalEnd} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import CreateTaskForm from "@/components/task/create-task-form";
import TaskList from "@/components/task/task-list";
import {SessionProvider} from "@/components/session-provider";

export default function TaskManager ({accessToken} : {accessToken: string}){
    return (
        <>
            <SessionProvider accessToken={accessToken}>
                <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
                    <div className="flex w-full max-w-2xl h-screen flex-col gap-6">
                        <a href="#" className="flex items-center gap-2 self-center font-medium">
                            <div
                                className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4"/>
                            </div>
                            Task Manager
                        </a>
                        <div className="flex flex-col gap-6">
                            <Card className="h-full">
                                <CardContent>
                                    <CreateTaskForm/>
                                    <TaskList/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SessionProvider>
        </>
    )
}