import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserImage from "../widget/UserImage";
import { Tooltip } from "@mui/material";

const Consultant = ({ user, consultantId, name, ProfilePath }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="1rem"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      gap="1rem"
      width="100%"
      boxSizing="border-box"
    >
      <Box>
        <UserImage image={ProfilePath} size="60px" />
      </Box>
      <Box flex="1">
        <Typography
          className="capitalize hover:text-[#48ffbf] hover:cursor-pointer  w-full text-zinc-950 "
          fontWeight="500"
          onClick={() => {
            navigate(`/user/${consultantId}`);
            navigate(0);
          }}
        >
          {name}
        </Typography>
        <Typography color={"black"} fontSize="0.75rem">
          Law Consultant
        </Typography>
      </Box>
      <Box>
        <Tooltip title="Verified">
          <CheckCircle
            className="text-[#48ffbf]   "
            sx={{ verticalAlign: "left", fontSize: 18, marginRight: "5px" }}
            alt="Verified"
          />
        </Tooltip>
      </Box>
      <Box>
        <button
          className="flex bg-[#171818] text-xs w-auto left-0 shadow-md text-white rounded-lg px-2 py-1 hover:bg-[#58e3b2]"
          onClick={() => {
            navigate(`/user/${user.id}`);
            navigate(0);
          }}
        >
          Connect
        </button>
      </Box>
    </Box>
  );
};

export default Consultant;
