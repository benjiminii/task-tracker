"use client";

import { Input } from "@/components/ui/input";
import Card from "@/components/layout/Card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import authStore from "@/store/authStore";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});

function Login() {
  const { login, user } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password, isAdmin } = values;

    try {
      const { success } = login(email, password, isAdmin);
      if (success) {
        toast.success("Login successful");
        // router.push("/dashboard");
      } else toast.error("Invalid email or password");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-[30rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Welcome</h1>
            <p className="text-gray-400 text-sm">
              Please enter your email and password to continue.
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormDescription>Login as Admin</FormDescription>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="w-full bg-stable-blue">Login</Button>
        </form>
      </Form>
    </Card>
  );
}

export default Login;
