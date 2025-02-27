import { Alert, Button, Container, Stack } from "@mui/material";
import colors from "../data/colorsPalette";

const AlertExample = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Stack spacing={2}>
        {colors.map((color) => {
          if (color !== "secondary") {
            return (
              <>
                <Alert severity={color}>This is a {color} Alert.</Alert>
                <Alert variant="filled" severity={color}>
                  This is a filled {color} Alert.
                </Alert>
                <Alert variant="outlined" severity={color}>
                  This is a outlined {color} Alert.
                </Alert>
              </>
            );
          }
          return;
        })}
        <Alert severity="warning" onClose={() => {}}>
          This Alert displays the default close icon.
        </Alert>
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small">
              UNDO
            </Button>
          }
        >
          This Alert uses a Button component for its action.
        </Alert>
      </Stack>
    </Container>
  );
};

// podes usar el prop color para sobreescribir el color de severity

export default AlertExample;
