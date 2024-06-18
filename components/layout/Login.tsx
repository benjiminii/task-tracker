import React from "react";
import { Input } from "../ui/input";

function Login() {
  return (
    <div className="w-[30rem] grid gap-4 p-10 bg-stable-gradient rounded-lg border border-white/30">
      <h1 className="text-3xl font-semibold text-white">Login</h1>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}

export default Login;
