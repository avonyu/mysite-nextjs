import { cn } from "@/lib/utils";

function GradientColorText({
  gradientColor = "bg-linear-to-r from-blue-500 to-teal-400",
  className,
  ...props
}: React.ComponentProps<"div"> & { gradientColor: string }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent animate-fade-in",
        gradientColor,
        className
      )}
      {...props}
    ></span>
  );
}

export { GradientColorText };
