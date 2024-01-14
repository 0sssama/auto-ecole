'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Link } from '@/components/atoms/link';
import logo from '@/assets/logo.svg';
import logoLight from '@/assets/logo-light.svg';

import { sizes } from './logo.helpers';
import type { LogoComponentType, LogoSize } from './logo.types';

const Logo: LogoComponentType = ({ size = 'md', className }) => {
  const { theme } = useTheme();

  const { width, height } = sizes[size as LogoSize] || sizes.md;

  return (
    <Link
      href="/"
      className={className}
      style={{
        display: 'block',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        priority
        src={theme === 'dark' ? logoLight : logo}
        alt="Logo"
        width={width}
        height={height}
        decoding="async"
        className="transition-all"
      />
    </Link>
  );
};

export default Logo;
