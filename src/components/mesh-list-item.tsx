import { Mesh } from "three";
import MeshUserDataType from "../types/mesh-usertype.type";
import MeshListItemName from "./mesh-list-item-name";

export type MeshListItemPropsType = {
  mesh: Mesh;
  userData: MeshUserDataType;
};

const MeshListItem = ({ mesh, userData }: MeshListItemPropsType) => {
  return (
    <div className="flex p-2 justify-between items-center ">
      <div className="grow flex flex-col">
        <div className="w-full cu">
          <MeshListItemName mesh={mesh} userData={userData} />
        </div>
        <div>position</div>
      </div>
      <div>color</div>
    </div>
  );
};

export default MeshListItem;
