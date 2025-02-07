import BasePrimitive from "./base-primitive";
import BufferGeometryStore from "./buffer-geometry-store";
import EnumPrimitive from "../types/primitive.enum";

class BoxPrimitive extends BasePrimitive {
    protected bufferGeometry = BufferGeometryStore.getPrmitiveBufferGeometry(EnumPrimitive.Box)
}

export default BoxPrimitive