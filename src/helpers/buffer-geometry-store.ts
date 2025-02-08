import { BufferAttribute, BufferGeometry } from "three";
import EnumPrimitive from "../types/primitive.enum";

class BufferGeometryStore {
    private static readonly boxVertices = new Float32Array([
        //for ease of use made it based on 1 then recreated array by subtracting -0.5
        0, 0, 1, 1, 0, 1, 0, 1, 1,        // front-1
        0, 1, 1, 1, 0, 1, 1, 1, 1,        // front-2
        1, 0, 0, 0, 0, 0, 1, 1, 0,        // back-1
        1, 1, 0, 0, 0, 0, 0, 1, 0,        // back-2
        0, 0, 0, 0, 0, 1, 0, 1, 0,        // left-1
        0, 1, 0, 0, 0, 1, 0, 1, 1,        // left-2
        1, 0, 1, 1, 0, 0, 1, 1, 1,        // right-1
        1, 1, 1, 1, 0, 0, 1, 1, 0,        // right-2
        1, 1, 0, 0, 1, 0, 1, 1, 1,        // top-1
        1, 1, 1, 0, 1, 0, 0, 1, 1,        // top-2
        1, 0, 1, 0, 0, 1, 1, 0, 0,        // bottom-1
        1, 0, 0, 0, 0, 1, 0, 0, 0,        // bottom-2
    ].map(val => val - 0.5));

    private static readonly pyramidVertices = new Float32Array([
        0, 0, 1, 1, 0, 1, 0.5, 1, 0.5,    // front
        0, 0, 1, 0.5, 1, 0.5, 0, 0, 0,    // left
        1, 0, 0, 0, 0, 0,  0.5, 1, 0.5,    // back            
        1, 0, 0, 0.5, 1, 0.5, 1, 0, 1,    // right
        1, 0, 1, 0, 0, 1, 1, 0, 0,        // bottom-1
        1, 0, 0, 0, 0, 1, 0, 0, 0,        // bottom-2
    ].map(val => val - 0.5));


    public static getPrmitiveBufferGeometry(primitiveType: EnumPrimitive): BufferGeometry {
        switch (primitiveType) {
            case EnumPrimitive.Box:
                return this.getBufferGeometryFromVertices(this.boxVertices);
            case EnumPrimitive.Pyramid:
                return this.getBufferGeometryFromVertices(this.pyramidVertices);
            default:
                throw new Error('primitive type not implemented');
        }
    }

    private static getBufferGeometryFromVertices(vertices: Float32Array): BufferGeometry {
        const boxGeomertry = new BufferGeometry();
        boxGeomertry.setAttribute('position', new BufferAttribute(vertices, 3));
        return boxGeomertry;
    }
}


export default BufferGeometryStore;