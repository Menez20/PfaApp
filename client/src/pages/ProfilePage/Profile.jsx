import React from "react";
import Navbar from "../../components/profilepagecmp/NewNav";
import UserWidget from "../../components/profilepagecmp/UserWidgetSide";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ConsultantList from "../../components/ConsultantList";
import MyPostWidget from '../../components/MyPostWidget';

const isAuthenticated = () => {
  // Check if the user is authenticated (you might need to implement your own logic)
  return !!localStorage.getItem("token");
};
export const User = () => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const LocalUser = JSON.parse(localStorage.getItem("user"));
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    if (!LocalUser) {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/users/${LocalUser._id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <Box className="bg-[#f6f4eb]">
      <Navbar />
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="left"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={LocalUser._id}
            picturePath={LocalUser.profilePicture}
          />
          <Box m="2rem 0" />
          <ConsultantList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}>
          <MyPostWidget picturePath={LocalUser.profilePicture} />
          <Box m='2rem 0' />
          <UserWidget userId={LocalUser._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
