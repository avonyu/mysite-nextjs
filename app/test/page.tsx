"use client";

import { TestForm } from "./components/test-form";
import { ShowAllTests } from "./components/show-all-tests";
import { useState } from "react";
import { TestResponse } from "@/app/api/test/service";

export default function TextPage() {
  const [tests, setTests] = useState<TestResponse[]>([]);

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center gap-2 h-full">
        <TestForm tests={tests} setTests={setTests} />
        <ShowAllTests
          tests={tests}
          setTests={setTests}
          className="mx-3 w-50 p-2 border"
        />
      </div>
    </main>
  );
}
