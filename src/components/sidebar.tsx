"use client";

import { Drawer } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ThreeContainer from "../helpers/three-container";
import SidebarButtonController from "./sidebar-button-controller";
import { Mesh } from "three";
import MeshListItem from "./mesh-list-item";
import MeshUserDataType from "../types/mesh-usertype.type";

const Sidebar = () => {
  const [meshes, setMeshes] = useState<Mesh[]>([]);

  const getMeshesFromScene = useCallback(() => {
    setMeshes(ThreeContainer.getInstance().getMeshes());
  }, []);

  useEffect(() => {
    const scene = ThreeContainer.getInstance().getScene();
    scene.addEventListener("childadded", getMeshesFromScene);
    scene.addEventListener("childremoved", getMeshesFromScene);
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "24rem",
          background: "#eceff1",
          position: "absolute",
          padding: "4px",
        },
      }}
    >
      <div className="flex flex-col h-full w-full justify-between">
        <div className="grow overflow-auto">
          {meshes.map((mesh) => (
            <MeshListItem
              mesh={mesh}
              userData={mesh.userData as MeshUserDataType}
              key={mesh.uuid}
            />
          ))}
        </div>
        <div className="w-full p-5">
          <SidebarButtonController sceneMeshes={meshes} />
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
