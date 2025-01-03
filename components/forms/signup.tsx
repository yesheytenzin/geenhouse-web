"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { signUpSchemaType } from "@/types";
import { signUpSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Icons from "@/components/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({ resolver: zodResolver(signUpSchema) });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmittedData = async (data: signUpSchemaType) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (res) {
      setLoading(false);
      toast.success("SignUp Successful, Please Login!");
      router.replace("/auth/login");
    } else {
      toast.error("Error occurred while registration");
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <form
      onSubmit={handleSubmit(handleSubmittedData)}
    >
      <div className="flex-col justify-center items-center p-8 rounded-lg lg:min-w-[400px]">
        <h2 className="w-fit p-3 -h1 text-center mx-auto text-green-500 text-xl font-bold">
          GreenSage Connect SignUp Portal
        </h2>
        <div className="flex-col">
          <Label className="">Pick a username</Label>
          <div>
            <Input
              className="Input w-full bg-muted"
              placeholder="username"
              {...register("username")}
            />
            <p className="text-error h-5">
              {errors.username ? errors?.username?.message : ""}
            </p>
          </div>
        </div>
        <div className="flex-col">
          <Label className="">
            Enter your username for admin login
          </Label>
          <div>
            <Input
              className="input w-full bg-muted"
              placeholder="email"
              {...register("email")}
            />
            <p className="text-error h-5">
              {errors.email ? errors?.email?.message : ""}
            </p>
          </div>
        </div>
        <div>
          <Label className="">Enter your password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="input w-full bg-muted"
              placeholder="password"
              {...register("password")}
            />
            <p className="text-error h-5">
              {errors.password ? errors.password?.message : ""}
            </p>
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0  bottom-5"
            >
              {showPassword ? (
                <Icons.eyeOn className="h-5 w-5" />
              ) : (
                <Icons.eyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div>
          <Label className="">Enter your password again</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="input w-full bg-muted"
              placeholder="confirm password"
              {...register("confirmPassword")}
            />
            <p className="text-error h-5">
              {errors.confirmPassword ? errors.confirmPassword?.message : ""}
            </p>
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0  bottom-5"
            >
              {showPassword ? (
                <Icons.eyeOn className="h-5 w-5" />
              ) : (
                <Icons.eyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="w-fit mx-auto mt-5">
          <Button
            className=" bg-green-600  p-3 rounded-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="flex gap-1">
                <Icons.spinner className="animate-spin w-5 h-5" />
                <Label className="text-muted-foreground">Signing Up</Label>
              </span>
            ) : (
              <span>
                <Label>Sign Up</Label>
              </span>
            )}
          </Button>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 bg-black dark:bg-muted h-px my-auto"></div>
          <p className="p-2">OR</p>
          <div className="w-1/2 bg-black dark:bg-muted h-px my-auto"></div>
        </div>
        <div className="w-full flex justify-center">
          <Link className="link text-blue-500" href="/auth/login">
            Already have any account? Login
          </Link>
        </div>
      </div>
    </form>
  );
}
