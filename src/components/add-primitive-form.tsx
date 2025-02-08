import {
  Box,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import EnumPrimitive from "../types/primitive.enum";
import GeometryPrimitiveAdder from "../helpers/geometry-primitive-adder";

const AddPrimitiveForm = () => {
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);
  const [depth, setDepth] = useState(1);
  const [count, setCount] = useState(1);
  const [type, setType] = useState(EnumPrimitive.Box);
  const [error, setError] = useState(false);

  const onButtonClicked = () => {
    try {
      const isError = length<=0 || width<=0 || depth<=0 || count<=0;
      setError(isError);    
      if (isError) return;
      GeometryPrimitiveAdder.addGeometry(type, length, width, depth, count);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="p-4 ">
      {error && <Alert severity="error">error: Invalid params</Alert>}
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "20rem", display: "flex" } }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" mb={3}>
          Parameters:
        </Typography>
        <TextField
          id="length"
          label="Length (max 100)"
          variant="outlined"
          fullWidth={true}
          type="number"
          sx={{ mb: "10px" }}
          value={length}
          onChange={(e) => setLength(Math.min(Number(e.target.value), 100))}
        />
        <TextField
          id="width"
          label="Width"
          variant="outlined"
          fullWidth={true}
          type="number"
          sx={{ mb: "10px" }}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <TextField
          id="depth"
          label="Depth"
          variant="outlined"
          fullWidth={true}
          type="number"
          sx={{ mb: "10px" }}
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
        />
        <FormControl fullWidth sx={{ mb: "10px" }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value as EnumPrimitive)}
          >
            {Object.values(EnumPrimitive).map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="count"
          label="Count (max 100)"
          variant="outlined"
          fullWidth={true}
          type="number"
          sx={{ mb: "10px" }}
          value={count}
          onChange={(e) =>
            setCount(Math.min(Math.round(Number(e.target.value)), 100))
          }
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
          onClick={onButtonClicked}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default AddPrimitiveForm;
