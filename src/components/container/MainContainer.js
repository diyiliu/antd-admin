import React from "react";
import { withMainConsumer } from "../../useContext";
import MainLayout from "../../layouts/MainLayout";

const MainContainer = () => {
  return <MainLayout />;
};

export default withMainConsumer(MainContainer);
