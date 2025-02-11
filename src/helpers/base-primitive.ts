import { BufferGeometry, Mesh } from "three";
import ThreeContainer from "./three-container";
import RandomColorPicker from "./random-color-picker";
import EnumPrimitive from "../types/primitive.enum";
import MeshUserDataType from "../types/mesh-usertype.type";
import MaterialCache from "./material-cache";

abstract class BasePrimitive {
    protected abstract bufferGeometry: BufferGeometry;
    protected abstract defaultUserData: { 'type': EnumPrimitive }

    private scene = ThreeContainer.getInstance().getScene();

    public addItemsToScene(length: number, width: number, height: number, itemsNumber: number): void {
        const typeCountNumber = this.getTypeCount()
        const meshes: Mesh[] = []
        for (let i = 0; i < itemsNumber; i++) {
            meshes.push(this.getMesh(length, width, height, `${this.defaultUserData.type}-${typeCountNumber + i + 1}`));
        }
        this.scene.add(...meshes);
    }

    private getMesh(length: number, width: number, depth: number, name: string): Mesh {
        const color = RandomColorPicker.getRandomColor()
        const material = MaterialCache.getMaterial(color);
        const mesh = new Mesh(this.bufferGeometry, material);
        mesh.scale.set(length, width, depth);
    
        mesh.position.set(...this.getRandomPosition(length, width, depth));
        mesh.userData = { ...this.defaultUserData, color, name } satisfies MeshUserDataType;
        return mesh;
    }

    private getRandomPosition(length: number, width: number, depth: number): [number, number, number] {
        const randomFactor = Math.max(length, width, depth) * 25
        return Array.from({ length: 3 }, () => this.getRandomValueBasedOnScatterVal(randomFactor)) as [number, number, number];
    };

    private getRandomValueBasedOnScatterVal(scatterScale: number): number {
        return Math.round((Math.random() - 0.5) * 2 * scatterScale);
    }

    private getTypeCount(): number {
        return this.scene.children.filter(child => child.userData.type === this.defaultUserData.type).length
    }
}

export default BasePrimitive;