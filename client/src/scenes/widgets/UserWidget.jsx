import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const apiUrl = process.env.REACT_APP_API_URL;

  const getUser = async () => {
    const response = await axios.get(`${apiUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {console.log(firstName, location, occupation)}
      {/* FIRST ROW */}
      <FlexBetween
        className="gap-2 pb-4"
        onClick={() => navigate(`/profiles/${userId}`)}
      >
        <FlexBetween className="gap-4">
          <UserImage image={picturePath} />
          <div>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography>{friends.length} friends</Typography>
          </div>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <div className="py-4 px-0">
        <div className="flex items-center gap-4 mb-2">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </div>
      </div>
      {/* THIRD ROW */}
      <div className="py-4 px-0">
        <FlexBetween className="mb-2">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight={"500"}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight={"500"}>
            {impressions}
          </Typography>
        </FlexBetween>
      </div>
      {/* FOURTH ROW */}
      <div className="py-4 px-0">
        <Typography fontSize="1rem" color={main} fontWeight={"500"} mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween className={"gap-4 mb-2"}>
          <FlexBetween>
            <img
              src="../assets/twitter.png"
              alt="twitter"
              style={{ width: "25px", marginRight: "8px" }}
            />
            <div>
              <Typography color={main} fontWeight={"500"}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </div>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween className={"gap-4"}>
          <FlexBetween>
            <img
              src="../assets/linkedin.png"
              alt="linkedin"
              style={{ width: "25px", marginRight: "8px" }}
            />
            <div>
              <Typography color={main} fontWeight={"500"}>
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </div>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </div>
    </WidgetWrapper>
  );
}

export default UserWidget;
