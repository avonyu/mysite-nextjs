"use client";

import { useEffect, useState } from "react";
import { TestResponse } from "@/app/api/test/service";

export function ShowAllTests({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  const [tests, setTests] = useState<TestResponse[]>([]);

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
    <div className={className} {...props}>
      {tests.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}
