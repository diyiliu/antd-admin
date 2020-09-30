import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb } from "antd";

const breadItem = (item) => {
  const { name, url } = item;
  if (url) {
    return (
      <Breadcrumb.Item key={name}>
        <Link to={url}>{name}</Link>
      </Breadcrumb.Item>
    );
  }
  return <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>;
};

const Bread = ({ crumbs }) => {
  return (
    <Breadcrumb>
      {crumbs &&
        crumbs.map((crumb) => {
          return breadItem(crumb);
        })}
    </Breadcrumb>
  );
};

export default Bread;
