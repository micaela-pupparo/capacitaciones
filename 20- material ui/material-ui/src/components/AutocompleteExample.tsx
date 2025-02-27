import top100Films from "../data/top100films";
import { Autocomplete, Container, TextField, Typography } from "@mui/material";

const AutocompleteExample = () => {
  return (
    <>
      <Typography component="h1" sx={{mb: 6, mt: 2}}>Autocomplete</Typography>

      <Container>
        <Typography component="h2" sx={{mb: 3}}>Combo box - Caso 1</Typography>
        <Autocomplete
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Container>

      <Container sx={{ mt: 4 }}>
        <Typography component="h2" sx={{mb: 3}}>Free solo - Caso 2</Typography>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
      </Container>
    </>
  );
};

export default AutocompleteExample;
