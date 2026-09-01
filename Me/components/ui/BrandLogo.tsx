import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imgClassName?: string;
  size?: number;
  withName?: boolean;
  priority?: boolean;
};

export function BrandLogo({
  className,
  imgClassName,
  size = 40,
  withName = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={siteConfig.logo}
        alt={siteConfig.shortName}
        width={size}
        height={size}
        priority={priority}
        className={cn("brand-logo", imgClassName)}
      />
      {withName && (
        <span className="font-heading text-base font-bold tracking-tight sm:text-lg">
          {siteConfig.shortName}
        </span>
      )}
    </span>
  );
}
