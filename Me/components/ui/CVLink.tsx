import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { ComponentProps } from "react";

/** Opens CV in a new tab — works on HTTP dev and HTTPS production (avoids Chrome insecure-download block) */
export function CVLink({ className, children, ...props }: ComponentProps<"a">) {
  return (
    <a
      href={siteConfig.cvPath}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View and download CV"
      title="View CV (PDF)"
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  );
}
