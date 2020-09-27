import React from "react";
import * as Icon from "@ant-design/icons";

const Iconant = (props) => {
  const { type } = props;
  const dynamicIcon = React.createElement(Icon[type]);

  return <>{dynamicIcon}</>;
};

export default Iconant;
