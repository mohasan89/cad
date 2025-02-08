import { MeshListItemPropsType } from "./mesh-list-item";

const MeshListItemColorPicker = ({ mesh, userData }: MeshListItemPropsType) => {
  const clickHandler = () => {};

  return (
    <div
      className="w-full h-full cursor-pointer"
      style={{ background: userData.color }}
      onClick={clickHandler}
    ></div>
  );
};

export default MeshListItemColorPicker;
