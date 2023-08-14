import { useState } from "react";

// prebuilt utility tools like button and all that with various variations
//could have built my own utility tools but would have violated the basic rule of development which is :

//DRY : Don't Repeat Yourself
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const theme = useTheme(); //we can use any of the specified colors
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <FlexBetween style={{ backgroundColor: alt, padding: "1rem 6%" }}>
      <FlexBetween style={{ gap: "1.75rem" }}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          className="flex justify-between items-center space-x-3"
        >
          <img
            src="/favicon.ico"
            style={{
              width: "32px",
              height: "32px",
            }}
          ></img>
          {isDesktopScreen && <span>Social Sphere</span>}
        </Typography>
        <FlexBetween
          style={{
            backgroundColor: neutralLight,
            borderRadius: "9px",
            gap: "3rem",
            padding: "0.1rem 1.5rem",
          }}
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isDesktopScreen ? (
        <FlexBetween style={{ gap: "2rem" }}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout)}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isDesktopScreen && isMobileMenuToggled && (
        <Box
          maxWidth="500px"
          backgroundColor={background}
          className="fixed right-0 bottom-0 h-full z-10"
        >
          {/* CLOSE ICON */}
          <Box
            onClick={() => setIsMobileMenuToggled((prev) => !prev)}
            className="flex justify-end p-4"
          >
            <IconButton>
              <Close sx={{ fontSize: "25px" }} />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            style={{ gap: "2rem" }}
            className="flex flex-col justify-center items-center gap-12"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout)}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
