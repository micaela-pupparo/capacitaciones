import { Button, Stack } from "@mui/material";
import colors from "../data/colorsPalette";


const ButtonExample = () => {
  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Button>Text</Button> {/* variant='text' */}
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      {colors.map((color) => (
        <Stack
          spacing={4}
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Button color={color}>Text</Button>
          <Button variant="contained" color={color}>
            Contained
          </Button>
          <Button variant="outlined" color={color}>Outlined</Button>
        </Stack>
      ))}
    </>
  );
};

export default ButtonExample;
