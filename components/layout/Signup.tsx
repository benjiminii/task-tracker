import { Input } from "@/components/ui/input";
import Card from "@/components/layout/Card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function Signup() {
  return (
    <Card className="w-[30rem]">
      <div>
        <h1 className="text-3xl font-semiboldmb-1">Signup</h1>
        <p className="text-gray-400 text-sm">
          Please enter your email and password to continue.
        </p>
      </div>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <div className="flex items-center gap-2">
        <Switch />
        <Label htmlFor="airplane-mode">Signup as Admin</Label>
      </div>
      <Button className="w-full bg-stable-blue">Signup</Button>
      <Separator />
      <p className="text-gray-400">
        Not Registered? <Link href="/signup">Sign Up</Link>
      </p>
    </Card>
  );
}

export default Signup;
