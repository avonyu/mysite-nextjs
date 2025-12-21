import { TestForm } from "./components/test-form";
import { ShowAllTests } from "./components/show-all-tests";

export default async function textPage() {
  async function onSubmit(
    value: {
      content: string;
    },
    userId: string
  ): Promise<{ success: boolean; message: string }> {
    "use server";

    try {
      // 使用相对URL，但在服务器环境中应该能正常工作
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: value.content,
            userId: userId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create test");
      }

      return { success: true, message: "测试数据创建成功！" };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "创建测试数据失败"
      );
    }
  }

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center gap-2 h-full">
        <TestForm onSubmit={onSubmit} />
        <ShowAllTests className="mx-3 p-2"/>
      </div>
    </main>
  );
}
