import { MeshStandardMaterial } from "three";

class MaterialCache {
    private static materialCache: { [key: string]: MeshStandardMaterial } = {}

    public static getMaterial(color: string): MeshStandardMaterial {
        if (this.materialCache[color]) return this.materialCache[color];

        const mateial = new MeshStandardMaterial({ color })
        this.materialCache[color] = mateial;
        return mateial;
    }
}

export default MaterialCache