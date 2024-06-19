"use client";

import { useEffect } from "react";

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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});

function Login() {
  const { login, user } = authStore();
  const router = useRouter();

  useEffect(() => {
    // redirect to dashboard if user is already logged in
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Form validation schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // after successful login, get from localStorage user credentials
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      // user type is set to admin if true
      isAdmin: false,
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password, isAdmin } = values;

    try {
      // login and save user to state
      const { success } = login(email, password, isAdmin);

      // remember user creditials
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      if (success) {
        toast.success("Login successful");
      } else toast.error("Invalid email or password");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="m-4 md:m-8 border-white/30">
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
