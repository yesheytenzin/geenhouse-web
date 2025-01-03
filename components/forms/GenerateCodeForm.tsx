"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "../ui/tooltip";
import { z } from "zod";
import { toast } from "sonner";
import copyToClipboard from "@/utils/clipboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "../Icons";
import { Input } from "../ui/input";
import downloadCode from "@/utils/download";
import Credentials from "next-auth/providers/credentials";

const FormSchema = z.object({
  ap: z.string().min(1),
  apPassword: z.string().min(1),
  brokerUrl: z.string().min(1),
  brokerPort: z.number(),
  brokerUsername: z.string().min(1),
  password: z
    .string()
    .min(8, { message: "The password should be min of 8 characters" }),
  controllerBrokerId: z.string().min(1),
  userBrokerId: z.string().min(1),
  wifiSSID: z.string().min(1),
  wifiPassword: z
    .string()
    .min(8, { message: "The password should be min of 8 characters" }),
  type: z.string().optional(),
});

const getIrrigationControllers = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/controller/irrigation-controllers`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
    },
  );
  const controllers = res.json();
  return controllers;
};

const getGreenhouseControllers = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/controller/greenhouse-controllers`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
    },
  );
  const controllers = res.json();
  return controllers;
};

//auto exec
const getUserDetail = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/controller/generate-code/user-config`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
    },
  );
  const detail = res.json();
  return detail;
};

const handleCopyToClipboard = async (content: string) => {
  try {
    await copyToClipboard(content);
    toast.success("Code Copied to Clipboard");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const generateCode = async (credentials: z.infer<typeof FormSchema>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/controller/generate-code`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const code = await res.json();
  console.log(code);
  return code;
};
interface IControllerDetail {
  controllerId: string;
  name: string;
}
interface UserDetail {
  brokerUrl: string;
  brokerPort: number;
  brokerIp: string;
  brokerId: string;
  password: string;
  username: string;
}
export default function GenerateCodeForm({ id }: { id: string }) {
  const [type, setType] = useState<string | null>(null);
  const [greenhouseControllers, setGreenhouseControllers] = useState<
    IControllerDetail[]
  >([]);
  const [irrigationControllers, setIrrigationControllers] = useState<
    IControllerDetail[]
  >([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [showList, setShowList] = useState<boolean>(false);
  const [controllerCode, setControllerCode] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [recievingCode, setRecievingCode] = useState<boolean>(false);
  const [controllerId, setControllerId] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    getIrrigationControllers(id).then((controllers) => {
      setIrrigationControllers(controllers);
      getGreenhouseControllers(id).then((controllers) => {
        setGreenhouseControllers(controllers);
        setFetching(false);
      });
    });
  }, [id]);
  useEffect(() => {
    if (controllerId !== "") {
      setFormLoading(true);
      getUserDetail(id).then((res) => {
        setUserDetail(res);
        form.setValue("controllerBrokerId", controllerId);
        form.setValue("userBrokerId", res?.brokerId);
        form.setValue("brokerUrl", res?.brokerIp);
        form.setValue("password", res?.password);
        form.setValue("brokerPort", res?.brokerPort);
        form.setValue("brokerUsername", res?.username);
        setFormLoading(false);
      });
    }
  }, [controllerId, id, form]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setRecievingCode(true);
    data.type = type;
    generateCode(data).then((res) => {
      setControllerCode(res);
      setRecievingCode(false);
    });
  }
  return (
    <div className="py-5 relative">
      {controllerCode && (
        <div className="flex space-x-4 absolute right-6 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleCopyToClipboard(controllerCode)}
                  variant="outline"
                >
                  <Icons.copyToClipboard />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to Clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => downloadCode(controllerCode)}
                  variant="outline"
                >
                  <Icons.downloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      {controllerCode ? (
        <pre>
          <ScrollArea className="h-[80vh] p-5">
            <SyntaxHighlighter
              wrapLines={true}
              showLineNumbers
              startingLineNumber={0}
              language="cpp"
              style={docco}
            >
              {controllerCode}
            </SyntaxHighlighter>
          </ScrollArea>
        </pre>
      ) : (
        <>
          <div>
            {fetching ? (
              <div className="flex flex-col justify-center items-center  lg:h-[85vh]">
                <Icons.codeGenerationLoading width={72} height={72} />
                <h2 className="animate-pulse delay-1000 tracking-wide">
                  Fetching all available controllers for user
                </h2>
              </div>
            ) : (
              <div>
                <div className="flex space-x-5">
                  <Select
                    onValueChange={(item) => {
                      setType(item);
                      setShowList(true);
                    }}
                  >
                    <SelectTrigger className="lg:max-w-[300px]">
                      <SelectValue placeholder="Choose a controller type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greenhouse">Greenhouse</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* For controllers */}
                  <Select
                    onValueChange={(item) => {
                      setControllerId(item);
                    }}
                  >
                    <SelectTrigger
                      disabled={!showList}
                      className="lg:max-w-[300px]"
                    >
                      <SelectValue placeholder="Choose a controller" />
                    </SelectTrigger>
                    <SelectContent>
                      {type === "greenhouse"
                        ? greenhouseControllers.map((controller) => (
                          <SelectItem
                            key={controller.controllerId}
                            value={controller.controllerId}
                          >
                            {controller.name} : {controller.controllerId}
                          </SelectItem>
                        ))
                        : irrigationControllers.map((controller) => (
                          <SelectItem
                            value={controller.controllerId}
                            key={controller.controllerId}
                          >
                            {controller.name} : {controller.controllerId}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          {formLoading ? (
            <div className="flex flex-col justify-center items-center  lg:h-[85vh]">
              <Icons.codeGenerationLoading width={72} height={72} />
              <h2 className="animate-pulse delay-1000 tracking-wide">
                Generating Form for Code
              </h2>
            </div>
          ) : recievingCode ? (
            <div className="flex flex-col justify-center items-center  lg:h-[85vh]">
              <Icons.codeGenerationLoading width={72} height={72} />
              <h2 className="animate-pulse delay-1000 tracking-wide">
                Generating code for the controller
              </h2>
            </div>
          ) : controllerId ? (
            <ScrollArea className="h-[80vh] rounded-md p-4 border mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 py-3 ml-2"
                >
                  <FormField
                    control={form.control}
                    name="controllerBrokerId"
                    defaultValue={controllerId}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the controller Id</FormLabel>
                        <FormControl>
                          <Input className="max-w-sm" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the broker id or keep it as default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userBrokerId"
                    defaultValue={userDetail?.brokerId}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the user broker ID</FormLabel>
                        <FormControl>
                          <Input className="max-w-sm" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the broker id for user or keep it as default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brokerUsername"
                    defaultValue={userDetail?.username}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the username for broker </FormLabel>
                        <FormControl>
                          <Input className="max-w-sm" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the broker username or keep it as default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    defaultValue={userDetail?.password}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the user broker password</FormLabel>
                        <FormControl>
                          <Input className="max-w-sm" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the broker password for user or keep it as
                          default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brokerUrl"
                    defaultValue={userDetail?.brokerIp}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the Broker URL</FormLabel>
                        <FormControl>
                          <Input className="max-w-sm" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the broker url or keep it as default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brokerPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the Broker Port</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={1883}
                            type="number"
                            className="max-w-sm"
                            {...form.register("brokerPort", {
                              valueAsNumber: true,
                            })}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the broker port or keep it as default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="wifiSSID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the wifi ssid</FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-sm"
                            placeholder="Enter here"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The controller will use this ssid to connect to
                          internet
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="wifiPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the wifi password</FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-sm"
                            placeholder="Enter here"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The password will be used for wifi authentication to
                          connect to interent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter the access point name for your controller
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-sm"
                            placeholder="Enter here"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The access point entered will be used for access point
                          mode for controller
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the access point password</FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-sm"
                            placeholder="Enter here"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The password here will be used for auth for AP mode
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </ScrollArea>
          ) : (
            <div className="flex flex-col prose min-h-[80vh] justify-center items-center container">
              <p className="text-muted-foreground">
                The controller&apos;s code will be generated here
              </p>
              <Icons.codeIcon size={72} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
