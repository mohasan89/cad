import EnumPrimitive from "./primitive.enum"

type MeshUserDataType = {
    type: EnumPrimitive,
    color: string,
    name: string,
    selected?: boolean,
}


export default MeshUserDataType