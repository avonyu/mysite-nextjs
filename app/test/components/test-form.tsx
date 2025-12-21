"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

const formSchema = z.object({
  content: z.string(),
});

interface TestFormProps {
  onSubmit: (
    value: z.infer<typeof formSchema>,
    userId: string
  ) => Promise<{ success: boolean; message: string }>;
}

export function TestForm({ onSubmit }: TestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { data: session } = useSession();
  if (!session?.user) return null;
  const userId = session.user.id;

  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await onSubmit(value, userId);
      if (result.success) {
        toast.success(result.message);
      }
      form.reset(); // 清空表单
    } catch (error) {
      // 显示错误信息给用户
      toast.error(error instanceof Error ? error.message : "创建测试数据失败");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                <Input placeholder="输入内容" {...field} />
              </FormControl>
              <FormDescription>输入要测试的内容</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          创建测试数据
        </Button>
      </form>
    </Form>
  );
}
