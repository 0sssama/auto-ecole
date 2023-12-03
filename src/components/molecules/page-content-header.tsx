import type { FC, ReactNode } from "react";

export type PageContentHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
};

const PageContentHeader: FC<PageContentHeaderProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">{title}</h1>
      {children && (
        <div className="flex items-center justify-end">{children}</div>
      )}
    </div>
  );
};

export default PageContentHeader;
