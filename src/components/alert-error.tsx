import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function AlertError({errors} : {errors: Array<string>}) {
    if (errors.length <= 0) return ;
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                <ul>
                    {
                        errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))
                    }
                </ul>
            </AlertDescription>
        </Alert>
    )
}
