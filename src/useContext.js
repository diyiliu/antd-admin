import React, { useState, useEffect } from "react";
import menuList from "./assets/menus";

const MainContext = React.createContext({});
const MainProvider = (props) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(menuList);
  }, []);

  const getMenu = (path) => {
    const mList = menus.length ? menus : menuList;
    const menu = mList.find((m) => m.url === path || path.startsWith(m.url));
  
    return menu || mList[0];
  };

  return (
    <MainContext.Provider value={{ menus: menus, getMenu: getMenu }}>
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
