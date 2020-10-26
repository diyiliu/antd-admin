import React from "react";
import { withMainConsumer } from "../../useContext";
import MainLayout from "../layout/MainLayout";

const MainContainer = (props) => {
  return <MainLayout {...props}/>;
};

export default withMainConsumer(MainContainer);
