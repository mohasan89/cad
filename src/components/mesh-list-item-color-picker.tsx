import { useState } from "react";
import { MeshListItemPropsType } from "./mesh-list-item";
import { Menu } from "@mui/material";
import RandomColorPicker from "../helpers/random-color-picker";
import MeshMaterialChanger from "../helpers/mesh-material-changer";

const MeshListItemColorPicker = ({ mesh, userData }: MeshListItemPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeColorHandler = (color: string) => {
    MeshMaterialChanger.changeColor(mesh, color);
  };

  return (
    <>
      <div
        className="w-full h-full cursor-pointer"
        style={{ background: userData.color }}
        onClick={handleClick}
      ></div>
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
          transform: "translateX(130px) translateY(15px)",
        }}
      >
        <div className="grid grid-cols-4 gap-0.5 p-2">
          {RandomColorPicker.getAllColors().map((color) => (
            <button
              key={color}
              className="border min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] cursor-pointer hover:opacity-85"
              style={{ background: color }}
              onClick={() => changeColorHandler(color)}
            ></button>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default MeshListItemColorPicker;
