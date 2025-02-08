import { Mesh } from "three";
import MaterialCache from "./material-cache";
import ThreeContainer from "./three-container";

class MeshMaterialChanger {
    public static changeColor(mesh: Mesh, color: string): void {
        const material = MaterialCache.getMaterial(color);
        mesh.material = material;
        mesh.userData.color = color
        ThreeContainer.getInstance().refresView();
    }
}


export default MeshMaterialChanger