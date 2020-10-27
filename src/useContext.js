import React, { useState, useEffect } from "react";

import { treeAssets } from "./utils/api/menu";
import routes from "./assets/routes";

import { getToken, getUser } from "utils/auth";

const MainContext = React.createContext({});
const MainProvider = (props) => {
  const [menus, setMenus] = useState(null);
  const [user, setUser] = useState(null);

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

    const token = getToken();
    if (token) {
      if (!user) {
        getUser().then((res) => {
          const { success, content } = res;
          if (success) {
            setUser(content);
          }
        });
      }

      treeAssets().then((res) => {
        const { success, content } = res;
        if (success) {
          const items = buildMenus(content);
          setMenus(items);
        }
      });
    }
  }, [user]);

  return (
    <MainContext.Provider value={{ menus, user, setUser }}>
      {props.children}
    </MainContext.Provider>
  );
};

const MainConsumer = MainContext.Consumer;
export const withMainConsumer = (Component) => {
  return (props) => {
    return (
      <MainConsumer>
        {(value) => {
          return <Component {...props} context={value} />;
        }}
      </MainConsumer>
    );
  };
};

export { MainProvider, MainConsumer, MainContext };
