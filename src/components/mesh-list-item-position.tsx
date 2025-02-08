import { useCallback, useEffect, useState } from "react";
import { MeshListItemPropsType } from "./mesh-list-item";
import { TextField } from "@mui/material";

const MeshListItemPosition = ({ mesh }: MeshListItemPropsType) => {
  const [x, setX] = useState<string>(String(mesh.position.x));
  const [y, setY] = useState<string>(String(mesh.position.y));
  const [z, setZ] = useState<string>(String(mesh.position.z));

  const checkIfNumber = useCallback((val: string) => !isNaN(Number(val)), []);

  useEffect(() => {
    if (checkIfNumber(x) && checkIfNumber(y) && checkIfNumber(z)) {
      const xNum = Number(x);
      const yNum = Number(y);
      const zNum = Number(z);
      if (
        !(
          mesh.position.x === xNum &&
          mesh.position.y === yNum &&
          mesh.position.z === zNum
        )
      ) {
        mesh.position.set(xNum, yNum, zNum);
      }
    }
  }, [x, y, z]);

  return (
    <div className="w-full flex justify-start items-center py-2 gap-2">
      <div>Position (</div>
      <div className="max-w--[40px]">
        <TextField
          id="x"
          label="x"
          variant="outlined"
          sx={{ p: 0, m: 0, ".MuiInputBase-input": { p: 1, maxWidth: "40px" } }}
          value={x}
          onChange={(e) => setX(e.target.value)}
        />{" "}
        ,{" "}
      </div>

      <div className="max-w--[40px]">
        <TextField
          id="y"
          label="y"
          variant="outlined"
          sx={{ p: 0, m: 0, ".MuiInputBase-input": { p: 1, maxWidth: "40px" } }}
          value={y}
          onChange={(e) => setY(e.target.value)}
        />{" "}
        ,{" "}
      </div>

      <div className="max-w--[40px]">
        <TextField
          id="z"
          label="z"
          variant="outlined"
          sx={{ p: 0, m: 0, ".MuiInputBase-input": { p: 1, maxWidth: "40px" } }}
          value={z}
          onChange={(e) => setZ(e.target.value)}
        />
      </div>

      <div> )</div>
    </div>
  );
};

export default MeshListItemPosition;
