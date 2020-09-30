import React from "react";

const Page = (props) => {
  const { children } = props;
  return <div className="ant-page">{children}</div>;
};

export default Page;
