import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";

const variants = {
  xs: {
    width: 12,
    height: 14,
  },
  sm: {
    width: 21,
    height: 26,
  },
  md: {
    width: 30,
    height: 36,
  },
  lg: {
    width: 40,
    height: 48,
  },
  xl: {
    width: 53,
    height: 64,
  },
};

export type LogoProps = {
  size?: keyof typeof variants;
  className?: string;
};

export default function Logo({ size = "md", className }: LogoProps) {
  const { width, height } = variants[size];

  return (
    <Link href="/" className={className}>
      <Image
        src={logo}
        alt="Logo"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="transition-all"
      />
    </Link>
  );
}
