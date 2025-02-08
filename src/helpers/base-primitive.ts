import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import ThreeContainer from "./three-container";
import RandomColorPicker from "./random-color-picker";
import EnumPrimitive from "../types/primitive.enum";
import MeshUserDataType from "../types/mesh-usertype.type";

abstract class BasePrimitive {
    protected abstract bufferGeometry: BufferGeometry;
    protected abstract defaultUserData: { 'type': EnumPrimitive }

    private scene = ThreeContainer.getInstance().getScene();

    public addItemsToScene(length: number, width: number, height: number, itemsNumber: number): void {
        const typeCountNumber = this.getTypeCount()
        for (let i = 0; i < itemsNumber; i++) {
            this.scene.add(this.getMesh(length, width, height,`${this.defaultUserData.type}-${typeCountNumber+i+1}`));
        }
    }

    private getMesh(length: number, width: number, depth: number,name: string): Mesh {
        const color = RandomColorPicker.getRandomColor()
        const material = this.getMaterial(color);
        const mesh = new Mesh(this.bufferGeometry, material);
        mesh.scale.set(length, width, depth);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        mesh.position.set(...this.getRandomPosition(length, width, depth));
        mesh.userData = { ...this.defaultUserData, color, name } satisfies MeshUserDataType;
        return mesh;
    }

    private getMaterial(color: string): MeshStandardMaterial {
        return new MeshStandardMaterial({ color });
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