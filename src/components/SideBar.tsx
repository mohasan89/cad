"use client";

import { Drawer } from "@mui/material";
import { useEffect } from "react";
import ThreeContainer from "../helpers/three-container";

const SideBar = () => {
  useEffect(() => {
    ThreeContainer.getInstance()
      .getScene()
      .addEventListener("childadded", () => {
        console.log("childAdded");
      });
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "24rem",
          background: "",
          opacity: "0.4",
          position: "absolute",
        },
      }}
    ></Drawer>
  );
};

export default SideBar;
