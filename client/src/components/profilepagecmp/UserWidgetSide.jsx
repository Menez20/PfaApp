import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  AlternateEmailOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import UserImage from "../widget/UserImage";
import FlexBetween from "../widget/FlexBetween";
import WidgetWrapper from "../widget/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";

const UserWidgetSide = ({ userId, picturePath }) => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    return null;
  }
  const { firstName, lastName, address, email, phone } = user;
  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              color="black"
              fontWeight="500"
              className=" capitalize  hover:text-[#48ffbf] hover:cursor-pointer"
              sx={{ fontSize: 16 }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color="black" sx={{ fontSize: 14 }}>
              {phone}{" "}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/user/${userId}`);
          }}
        />
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <AlternateEmailOutlined fontSize="small" sx={{ color: "black" }} />
          <Typography color="black">{email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <LocationOnOutlined fontSize="small" sx={{ color: "black" }} />
          <Typography color="black">{address}</Typography>
        </Box>
      </Box>

      <Divider />
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color="black">Who's viewed your profile</Typography>
          <Typography color="black" fontWeight="500">
            {Math.floor(Math.random() * 1000) + 1}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color="black">Impressions of your post</Typography>
          <Typography color="black" fontWeight="500">
            {Math.floor(Math.random() * 1000) + 1}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color="black" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color="black" fontWeight="500">
                Twitter
              </Typography>
              <Typography color="black">Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "black" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={linkedin} alt="linkedin" />
            <Box>
              <Typography color="black" fontWeight="500">
                Linkedin
              </Typography>
              <Typography color="black">Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "black" }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgetSide;
