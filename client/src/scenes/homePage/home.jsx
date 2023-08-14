import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

function HomePage() {
  const isDesktop = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div
        style={{ width: "100%", padding: "2rem 6%" }}
        className={`${isDesktop ? "flex" : "block"} gap-2 justify-between`}
      >
        <div style={{ flexBasis: isDesktop && "26%" }}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div
          style={{
            flexBasis: isDesktop && "42%",
            marginTop: !isDesktop && "2rem",
          }}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        {isDesktop && (
          <div style={{ flexBasis: "26%" }}>
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
