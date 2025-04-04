import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

export default function CreateTaskForm (){
    return (
        <>
            <div className="w-full flex gap-2">
                <div className="flex-1">
                    <Input
                        id="name"
                        type="text"
                        placeholder="Mancing"
                        required
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        <Plus/>
                    </Button>
                </div>
            </div>
        </>
    )
}