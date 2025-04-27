"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { handleUserLogin } from "@/actions/user-auth";
import { Button } from "@/components/ui/button";

export default function DebugAuthPage() {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const testAction = async () => {
    setLoading(true);
    try {
      const res = await handleUserLogin();
      setResult(res);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  const testApi = async () => {
    setApiLoading(true);
    try {
      const res = await fetch("/api/test-auth");
      const data = await res.json();
      setApiResult(data);
    } catch (error) {
      setApiResult({ error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debugging</h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Auth Status</h2>
        <div className="space-y-1">
          <div><strong>Is Loaded:</strong> {isLoaded ? "Yes" : "No"}</div>
          <div><strong>Is Signed In:</strong> {isSignedIn ? "Yes" : "No"}</div>
          <div><strong>User ID:</strong> {userId || "Not authenticated"}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Test Server Action</h2>
          <Button 
            onClick={testAction} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? "Testing..." : "Test handleUserLogin"}
          </Button>
          
          {result && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-black text-green-400 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Test API Route</h2>
          <Button 
            onClick={testApi} 
            disabled={apiLoading}
            className="mb-4"
          >
            {apiLoading ? "Testing..." : "Test API Route"}
          </Button>
          
          {apiResult && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-black text-green-400 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(apiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 