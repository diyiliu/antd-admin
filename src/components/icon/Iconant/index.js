import React from "react";
import * as Icon from "@ant-design/icons";

const Iconant = (props) => {
  const { type, style = {} } = props;
  const dynamicIcon = React.createElement(Icon[type], { style });

  return <>{dynamicIcon}</>;
};

export default Iconant;
