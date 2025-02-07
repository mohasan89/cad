import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import ThreeContainer from "./three-container";

abstract class BasePrimitive {
    protected abstract bufferGeometry: BufferGeometry;

    private scene = ThreeContainer.getInstance().getScene();
    private readonly scatterScale = 20 //this will create random position from [-20, 20] on x, y, z, 

    public addItemsToScene(length: number, width: number, height: number, itemsNumber: number): void {
        for (let i = 0; i < itemsNumber; i++) {
            this.scene.add(this.getMesh(length, width, height))
        }
    }

    private getMesh(length: number, width: number, height: number): Mesh {
        const material = this.getMaterial()
        const mesh = new Mesh(this.bufferGeometry, material);
        mesh.scale.set(length, width, height);
        mesh.position.set(...this.getRandomPosition())
        return mesh;
    }

    private getMaterial(): MeshStandardMaterial {
        return new MeshStandardMaterial({ color: 0xff0033 })
    }

    private getRandomPosition(): [number, number, number] {
        return Array(3).fill(() => this.getRandomValueBasedOnScatterVal()) as [number, number, number]
    };

    private getRandomValueBasedOnScatterVal(): number {
        return (Math.random() - 0.5) * 2 * this.scatterScale;
    }
}



export default BasePrimitive;