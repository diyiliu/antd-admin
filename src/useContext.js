import React, { useState, useEffect } from "react";

import { treeAssets } from "./utils/api/menu";
import routes from "./assets/routes";

const MainContext = React.createContext({});
const MainProvider = (props) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const getPath = (name) => {
      const route = routes.find((r) => r.name === name && r.path !== "/");
      if (route) {
        const { path } = route;
        return path;
      }
      return "/";
    };

    const buildMenus = (list) => {
      const menus = list.map((i) => {
        const { name, code, icon, permission, children, hidden } = i;
        const url = getPath(code);
        const menu = { name, url, permission, hidden };
        if (icon) {
          menu.icon = icon;
        }
        if (children) {
          menu.children = buildMenus(children);
        }

        return menu;
      });

      return menus;
    };

    treeAssets().then((res) => {
      const { success, content } = res;
      if (success) {
        const items = buildMenus(content);
        setMenus(items);
      }
    });
  }, []);

  return (
    <MainContext.Provider value={{ menus }}>
      {props.children}
    </MainContext.Provider>
  );
};

const MainConsumer = MainContext.Consumer;
export const withMainConsumer = (Comment) => {
  return (props) => {
    return (
      <MainConsumer>
        {(value) => {
          return <Comment {...props} context={value} />;
        }}
      </MainConsumer>
    );
  };
};

export { MainProvider, MainContext };
