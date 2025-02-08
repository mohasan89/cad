import { Add, Clear } from "@mui/icons-material";
import { Button, Menu } from "@mui/material";
import { useCallback, useState } from "react";
import { Mesh } from "three";
import ThreeContainer from "../helpers/three-container";
import AddPrimitiveForm from "./add-primitive-form";

type SidebarButtonControllerType = {
  sceneMeshes: Mesh[];
};

const SidebarButtonController = ({
  sceneMeshes,
}: SidebarButtonControllerType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetScene = useCallback(
    () => ThreeContainer.getInstance().resetScene(),
    []
  );

  return (
    <>
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
        <Button
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          Add Group
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          transform: "translateX(350px)",
        }}
      >
        <AddPrimitiveForm />
      </Menu>
    </>
  );
};

export default SidebarButtonController;
