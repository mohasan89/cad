import { Add, Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { Mesh } from "three";
import ThreeContainer from "../helpers/three-container";

type SidebarButtonControllerType = {
  sceneMeshes: Mesh[];
};

const SidebarButtonController = ({
  sceneMeshes,
}: SidebarButtonControllerType) => {
  const resetScene = useCallback(
    () => ThreeContainer.getInstance().resetScene(),
    []
  );

  return (
    <div className="w-full flex justify-end gap-3">
      <Button
        startIcon={<Clear />}
        variant="contained"
        color="error"
        disabled={sceneMeshes.length === 0}
        onClick={resetScene}
      >
        Clear scene
      </Button>
      <Button startIcon={<Add />} variant="contained" color="primary">
        Add Group
      </Button>
    </div>
  );
};

export default SidebarButtonController;
