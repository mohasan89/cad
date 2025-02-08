import ThreeSelectHandler from "../helpers/three-select-handler";
import { MeshListItemPropsType } from "./mesh-list-item";

const MeshListItemName = ({ mesh, userData }: MeshListItemPropsType) => {
  const clickHandler = () => ThreeSelectHandler.selectMesh(mesh)

  return (
    <div className="w-full cursor-pointer" onClick={clickHandler}>
      {userData.name}
    </div>
  );
};

export default MeshListItemName;
