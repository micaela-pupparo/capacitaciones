import { Avatar, Chip, Container, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import colors from "../data/colorsPalette";

const ChipExample = () => {
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography component="h1" sx={{ mb: 3 }}>
          Basics
        </Typography>
        <Stack direction="row" spacing={1}>
          {colors.map((color) => (
            <>
              <Chip
                label="Chip Filled"
                avatar={<Avatar>M</Avatar>}
                color={color}
              />
              <Chip label="Chip Outlined" variant="outlined" color={color} />
            </>
          ))}
        </Stack>
      </Container>
      <Container sx={{ mt: 5 }}>
        <Typography component="h1" sx={{ mb: 3 }}>
          Clickabble
        </Typography>
        <Stack direction="row" spacing={1}>
          {colors.map((color) => (
            <>
              <Chip label="Click me!" onClick={() => {}} color={color} />
              <Chip
                label="Click me!"
                variant="outlined"
                onClick={() => {}}
                color={color}
              />
            </>
          ))}
        </Stack>
      </Container>
      <Container sx={{ mt: 5 }}>
        <Typography component="h1" sx={{ mb: 3 }}>
          Deletable
        </Typography>
        <Stack direction="row" spacing={1}>
          {colors.map((color) => (
            <>
              <Chip label="Delete me!" onDelete={() => {}} color={color} />
              <Chip
                label="Delete me!"
                variant="outlined"
                onDelete={() => {}}
                deleteIcon={<DeleteIcon color={color} />}
              />
            </>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default ChipExample;
