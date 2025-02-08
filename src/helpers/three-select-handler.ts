import { Mesh, MeshStandardMaterial } from "three";
import ThreeContainer from "./three-container";
import MeshUserDataType from "../types/mesh-usertype.type";

class ThreeSelectHandler {
    public static selectMesh(mesh: Mesh): void {
        const selecedMesh = this.getSelectedMesh();
        if (selecedMesh?.uuid === mesh.uuid) return;
        if (selecedMesh) this.unselectMesh(selecedMesh);
        this.selectMeshItem(mesh);
    }


    private static getSelectedMesh(): Mesh | undefined {
        return this.getMeshes().filter(mesh => mesh.userData?.selected)?.[0]
    }

    private static getMeshes(): Mesh[] {
        return ThreeContainer.getInstance().getMeshes();
    }

    private static unselectMesh(mesh: Mesh): void {
        const userData = mesh.userData as MeshUserDataType;
        mesh.material = new MeshStandardMaterial({ color: userData.color });
        userData.selected = false;
    }

    private static selectMeshItem(mesh: Mesh): void {
        const userData = mesh.userData as MeshUserDataType;
        mesh.material = new MeshStandardMaterial({ color: 'yellow' });
        userData.selected = true;
    }
}


export default ThreeSelectHandler;