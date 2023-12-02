import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { FC } from "react";

import logo from "@/assets/logo.svg";
import logoLight from "@/assets/logo-light.svg";

const variants = {
  xs: {
    width: 16,
    height: 14,
  },
  sm: {
    width: 29,
    height: 26,
  },
  md: {
    width: 40,
    height: 36,
  },
  lg: {
    width: 54,
    height: 48,
  },
  xl: {
    width: 72,
    height: 64,
  },
};

export type LogoProps = {
  size?: keyof typeof variants;
  className?: string;
};

const Logo: FC<LogoProps> = ({ size = "md", className }) => {
  const { theme } = useTheme();

  const { width, height } = variants[size];

  return (
    <Link href="/" className={className}>
      <Image
        src={theme === "light" ? logo : logoLight}
        alt="Logo"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="transition-all"
      />
    </Link>
  );
};

export default Logo;
