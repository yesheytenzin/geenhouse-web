"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { loginSchemaType } from "@/types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Icons from "../Icons";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Footer from "../Footer";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const handleSubmittedData = async (data: loginSchemaType) => {
    setLoading(true);
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.status === 200) {
      toast.success("Login Successful");
      router.replace("/dashboard");
    } else {
      toast.error(`Error occurred while login with status:${result?.status}`);
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <form onSubmit={handleSubmit(handleSubmittedData)}>
      <div className="p-5 shadow-xl">
        <div className="flex-col justify-center items-center rounded-lg m-5">
          <div className="w-fit mx-auto">
            <Image
              draggable={false}
              className="w-56 h-56 no-image-drag"
              src={logo}
              alt="logo"
            />
          </div>
          <div className="flex-col space-y-2">
            <div className="w-full">
              <p>
                <Label className="">
                  Username<b className="text-red-500">*</b>
                </Label>
              </p>
              <Input
                className="input w-full"
                placeholder="Username or Email"
                {...register("username")}
              />
              <p className="text-red-600 h-5 w-full">
                {errors.username ? errors.username.message : ""}
              </p>
            </div>
            <div>
              <p>
                <Label className="">
                  Password<b className="text-red-500">*</b>
                </Label>
              </p>
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  placeholder="Password"
                  {...register("password")}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2  -translate-y-1/2"
                >
                  {showPassword ? (
                    <Icons.eyeOn className="h-5 w-5" />
                  ) : (
                    <Icons.eyeOff className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-red-600 h-5 w-full">
                {errors.password ? errors.password.message : ""}{" "}
              </p>
            </div>
          </div>
          <div className="w-fit mx-auto mt-5">
            <Button
              className="bg-green-600 rounded-btn hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <span className="flex gap-1 justify-center ">
                  <Icons.spinner className="animate-spin w-5 h-5" />
                  <Label className="text-muted flex items-center">
                    Signing In
                  </Label>
                </span>
              ) : (
                <>Login</>
              )}
            </Button>
          </div>
          <div className="flex items-center space-x-1 my-3 mt-6">
            <Icons.customerSupportIcon className="w-6 h-6 dark:fill-white" />
            <p className="text-muted-foreground select-none">
              Forgot password? Contact the Support Team
            </p>
          </div>
          <Footer className="flex flex-col items-center justify-center mt-5 space-x-1 space-y-px" />
        </div>
      </div>
    </form>
  );
}
