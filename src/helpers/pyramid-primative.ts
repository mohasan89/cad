import BasePrimitive from "./base-primitive";
import BufferGeometryStore from "./buffer-geometry-store";
import EnumPrimitive from "../types/primitive.enum";

class PyramidPrimitive extends BasePrimitive {
    protected bufferGeometry = BufferGeometryStore.getPrmitiveBufferGeometry(EnumPrimitive.Pyramid)
}

export default PyramidPrimitive