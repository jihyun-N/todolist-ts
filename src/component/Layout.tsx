import React, { PropsWithChildren } from "react";
import Header from "./Header";

type BaseType = {
  id: string;
};
const Layout = ({ children }: PropsWithChildren<BaseType>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
