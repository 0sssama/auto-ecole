import React from "react";

export type PageContentHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function PageContentHeader({
  title,
  children,
}: PageContentHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">{title}</h1>
      {children && (
        <div className="flex items-center justify-end">{children}</div>
      )}
    </div>
  );
}
