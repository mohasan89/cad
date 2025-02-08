import { Mesh } from "three";
import MeshUserDataType from "../types/mesh-usertype.type";
import MeshListItemName from "./mesh-list-item-name";
import MeshListItemPosition from "./mesh-list-item-position";

export type MeshListItemPropsType = {
  mesh: Mesh;
  userData: MeshUserDataType;
};

const MeshListItem = ({ mesh, userData }: MeshListItemPropsType) => {
  return (
    <div
      className={`flex p-2 justify-between items-center ${
        userData?.selected && "border-2"
      }`}
    >
      <div className="grow flex flex-col">
        <div className="w-full">
          <MeshListItemName mesh={mesh} userData={userData} />
        </div>
        <div className="w-full">
          <MeshListItemPosition mesh={mesh} userData={userData} />
        </div>
      </div>
      <div>color</div>
    </div>
  );
};

export default MeshListItem;
