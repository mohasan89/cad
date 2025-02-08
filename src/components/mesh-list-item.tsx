import { Mesh } from "three";
import MeshUserDataType from "../types/mesh-usertype.type";
import MeshListItemName from "./mesh-list-item-name";
import MeshListItemPosition from "./mesh-list-item-position";
import MeshListItemColorPicker from "./mesh-list-item-color-picker";

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
      <div className="max-w-[20px] max-h-[20px] min-w-[20px] min-h-[20px] w-[20px] h-[20px] border-2 rounded-sm">
        <MeshListItemColorPicker mesh={mesh} userData={userData}/>
      </div>
    </div>
  );
};

export default MeshListItem;
