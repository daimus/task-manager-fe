"use client";

import {cn, parseApiErrors} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, {AxiosError} from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import {AlertError} from "@/components/alert-error";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({success} : {success: boolean}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Array<string>>([]);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/login", values);
      router.push('/')
    } catch (e: unknown) {
      if (e instanceof AxiosError){
        setError(parseApiErrors(e.response?.data));
      } else {
        console.error(e)
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <>
            {!!success && (
              <>
                <Alert variant="constructive">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Registration Success!</AlertTitle>
                  <AlertDescription>
                    Now you can login with your account.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </>
          <AlertError errors={error} />
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                              {...field}
                              type="email"
                              placeholder="johndoe@mail.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />
              <Button
                  className="w-full cursor-pointer"
                  type="submit"
                  disabled={isLoading}
              >
                <>
                  {isLoading && <Spinner size={'4'} inline />}
                  Login
                </>
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={"/register"} className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
