import {Metadata} from "next";
import {GalleryVerticalEnd, LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import CreateTaskForm from "@/components/task/create-task-form";
import TaskList from "@/components/task/task-list";

export const metadata: Metadata = {
    title: 'Task Manager'
}

export default async function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-2xl h-screen flex-col gap-6">
                    <div className="flex w-full justify-between">
                        <a href="#" className="flex items-center gap-2 self-center font-medium">
                            <div
                                className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4"/>
                            </div>
                            Task Manager
                        </a>
                        <a href="/api/auth/logout">
                            <Button variant="destructive" className="cursor-pointer">
                                <LogOut/>
                            </Button>
                        </a>
                    </div>
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
        </>
    )
}
