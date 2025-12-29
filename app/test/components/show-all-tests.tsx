"use client";

import { useEffect, Dispatch, SetStateAction } from "react";
import { TestResponse } from "@/app/api/test/service";
import { useCountStore } from "@/store";

export function ShowAllTests({
  tests,
  setTests,
  className,
}: {
  tests: TestResponse[];
  setTests: Dispatch<SetStateAction<TestResponse[]>>;
  className?: string;
}) {
  const increment = useCountStore((state) => state.increment);
  const count = useCountStore((state) => state.count);
  useEffect(() => {
    // 获取测试数据的逻辑
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/test");
        const data = await response.json();
        setTests(data.tests || []);
      } catch (error) {
        console.error("获取测试数据失败:", error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className={className}>
      <button onClick={() => increment(3)}>count: {count}</button>
      {tests.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}
