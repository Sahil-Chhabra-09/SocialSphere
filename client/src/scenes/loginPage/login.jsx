import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

function LoginPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box
        className="w-full text-center"
        p="1rem 6%"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Social Sphere
        </Typography>
      </Box>
      <Box
        width={isDesktop ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Step into the Social Sphere, Unleash the Power of Networking...
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default LoginPage;
