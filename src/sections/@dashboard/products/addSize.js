import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import Label from 'src/components/Label';

//-------------------------------------------
export default function AddSize(props) {
  const [size, setSize] = useState(props.data.name);
  const [quantity, setQuantity] = useState(props.data.quantity);

  const handleChangeSize = e => {
    setSize(e.target.value);
    const data = { ...props.data, name: e.target.value };
    props.setData(data);
    const list = props.listdata.map((x, index) => {
      if (index === props.id) {
        return data;
      }
      return x;
    });

    props.setData(list);
  };

  const handleChangeQuantity = e => {
    setQuantity(e.target.value);
    const data = { ...props.data, quantity: e.target.value };
    props.setData(data);
    const list = props.listdata.map((x, index) => {
      if (index === props.id) {
        return data;
      }
      return x;
    });

    props.setData(list);
  };
  //-------------------------------------------
  return (
    <Box display="flex" gap="20px">
      <Box>
        <Label>Size</Label> <br />
        <TextField type="number" onChange={handleChangeSize} value={size} />
      </Box>
      <Box>
        <Label>Quantity</Label>
        <br />
        <TextField
          type="number"
          onChange={handleChangeQuantity}
          value={quantity}
        />
      </Box>
    </Box>
  );
}
