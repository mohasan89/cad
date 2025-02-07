import EnumPrimitive from "../types/primitive.enum";
import BasePrimitive from "./base-primitive";
import BoxPrimitive from "./box-primative";
import PyramidPrimitive from "./pyramid-primative";

class GeometryPrimitiveAdder {

    public static addGeometry(primitiveType: EnumPrimitive, length: number, width: number, height: number, count: number): void {
        const primative = this.getPrimitiveType(primitiveType);
        primative.addItemsToScene(length, width, height, count);
    }

    private static getPrimitiveType(primitiveType: EnumPrimitive): BasePrimitive {
        switch (primitiveType) {
            case EnumPrimitive.Box:
                return new BoxPrimitive();
            case EnumPrimitive.Pyramid:
                return new PyramidPrimitive();
            default:
                throw new Error('primitive not implemented')
        }
    }
}


export default GeometryPrimitiveAdder;