"use client"
import { useState } from "react";
import crypto from "crypto"
import Icons from "../Icons"

export default function TokenForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [generated, setGenerated] = useState<string>("");
  const [tokenGenerated, setTokenGenerated] = useState<boolean>(false);

  const generateToken = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/token");
    if (res.ok) {
      const token = await res.json();
      setGenerated(token);
      setTokenGenerated(true);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex space-x-2">
        <Icons.info />
        <p className="prose">Generate a token to access the newsfeeds</p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-center w-full">
        <div className={`${generated ? "text-black" : "text-gray-500"} p-2 border border-black text-center min-w-lg`}>{
          generated ? generated : "Click the button to generate a token"
        }</div>
        <div className="divider-vertical"></div>
        <div className="flex border border-black p-3">
          <button
            disabled={tokenGenerated}
            onClick={() => {
              generateToken();
            }}>
            {
              loading ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                tokenGenerated ? (
                  <Icons.check color="green" />
                ) : (
                  <Icons.generate />
                )
              )
            }
          </button>
        </div>
      </div>
    </div>
  )
} 
