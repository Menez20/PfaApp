import React from "react";
import Navbar from "../../components/profilepagecmp/NewNav";
import UserWidgetSide from "../../components/profilepagecmp/UserWidgetSide";
import ConsultantList from "../../components/profilepagecmp/ConsultantList";
import MyPostWidget from "../../components/profilepagecmp/post/MyPostWidget";
import { Navigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import PostsWidget from "../../components/profilepagecmp/post/PostsWidget";

const isAuthenticated = () => {
  // Check if the user is authenticated (you might need to implement your own logic)
  return !!sessionStorage.getItem("token");
};
export const User = () => {
  const LocalUser = JSON.parse(sessionStorage.getItem("user"));
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <Box className="bg-gradient-to-b from-zinc-100 to-teal-50">
      <Navbar />
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="left"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgetSide
            userId={LocalUser._id}
            picturePath={LocalUser.profilePicture}
          />
          <Box m="2rem 0" />
          <ConsultantList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={LocalUser.profilePicture} />
          <Box m="2rem 0" />
          <PostsWidget userId={LocalUser._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
