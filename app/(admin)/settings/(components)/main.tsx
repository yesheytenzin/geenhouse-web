"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockIcon, UserIcon } from "lucide-react";
import PasswordChangeForm from "./form-passwd";
import Icons from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import ListTokensPage from "./(tokens)/list-tokens";
import GenerateTokenForm from "./(tokens)/generate-token-form";

export default function SettingsTab() {
  return (
    <Tabs defaultValue="password" className="lg:max-w-[800px]  mx-auto">
      <div className="grid grid-cols-12 h-full">
        <div className="max-w-sm col-span-3">
          <TabsList className="flex-col h-full space-y-2 bg-transparent justify-start">
            <div className="w-full flex justify-start">
              <h1 className="font-bold">Credentials</h1>
            </div>
            <Separator orientation="horizontal" />
            <TabsTrigger
              value="password"
              className="space-x-2 focus:border border-muted-foreground"
              role="link"
              id="password"
            >
              <a href="#password">Password Setting</a> <LockIcon />
            </TabsTrigger>
            <TabsTrigger
              value="credentials"
              className="space-x-2 focus:border border-muted-foreground"
              id="credentials"
            >
              <a href="#credentials">Admin Credentials</a> <UserIcon />
            </TabsTrigger>
            <div className="w-full flex justify-start">
              <h1 className="font-bold">Tokens</h1>
            </div>
            <Separator orientation="horizontal" />
            <TabsTrigger
              value="tokens"
              className="space-x-2 focus:border border-muted-foreground"
              id="tokens"
            >
              <a href="#tokens">List/Revoke Tokens</a>
              <Icons.token className="w-6 h-6" />
            </TabsTrigger>
            <TabsTrigger
              value="gen-tokens"
              className="space-x-2 focus:border border-muted-foreground"
              id="gen-tokens"
            >
              <a href="#gen-tokens">Generate Tokens</a>{" "}
              <Icons.token className="w-6 h-6" />
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="col-span-9">
          <TabsContent value="password">
            <PasswordChangeForm />
          </TabsContent>
          <TabsContent value="credentials">
            <h1 className="text-muted-foreground italic">
              Features will be added soon...
            </h1>
          </TabsContent>
          <TabsContent value="tokens">
            <ListTokensPage />
          </TabsContent>
          <TabsContent value="gen-tokens">
            <GenerateTokenForm />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
