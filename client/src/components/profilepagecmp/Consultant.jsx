// import { CheckCircle } from '@mui/icons-material';
// import {
//   Box,
//   IconButton,
//   Typography,
//   useTheme,
//   Button,
//   Divider,
//   Tooltip,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import FlexBetween from '../FlexBetween';
// import UserImage from '../UserImage';

// const Consultant = ({ consultantId, name, ProfilePath, token }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tokenn = token;

//   return (
//     <FlexBetween alignItems='center'>
//       <FlexBetween gap='0.5rem'>
//         <UserImage image={ProfilePath} size='60px' />
//         <Box>
//           <Typography
//             className='capitalize hover:text-[#48ffbf] hover:cursor-pointer w-full text-zinc-950 '
//             onClick={() => {
//               navigate(`/profile/${consultantId}`);
//               navigate(0);
//             }}>
//             {name}
//           </Typography>
//           <Typography color={'black'} fontSize='0.75rem'>
//             Law Consultant
//           </Typography>
//         </Box>
//         <Tooltip title='Verified'>
//           <CheckCircle
//             className='text-[#48ffbf] w-2 h-2 text-xs right-0'
//             sx={{ fontSize: 16, verticalAlign: 'center', marginLeft: 0 }}
//             alt='Verified'
//           />
//         </Tooltip>

//         <button className='flex bg-[#171818] text-xs w-auto left-0 shadow-md text-white rounded-lg px-2 py-1 hover:bg-[#58e3b2] '>
//           Connect
//         </button>
//       </FlexBetween>
//     </FlexBetween>
//   );
// };

// export default Consultant;

import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  CheckCircle,
} from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../UserImage';
import { Tooltip } from '@mui/material';

const Consultant = ({ consultantId, name, ProfilePath, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenn = token;

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      p='1rem'
      bg='white'
      borderRadius='md'
      boxShadow='md'
      gap='1rem'
      width='100%'
      boxSizing='border-box'>
      <Box>
        <UserImage image={ProfilePath} size='60px' />
      </Box>
      <Box flex='1'>
        <Typography
          className='capitalize hover:text-[#48ffbf] hover:cursor-pointer  w-full text-zinc-950 '
          fontWeight='500'
          onClick={() => {
            navigate(`/profile/${consultantId}`);
            navigate(0);
          }}>
          {name}
        </Typography>
        <Typography color={'black'} fontSize='0.75rem'>
          Law Consultant
        </Typography>
      </Box>
      <Box>
        <Tooltip title='Verified'>
          <CheckCircle
            className='text-[#48ffbf]   '
            sx={{ verticalAlign: 'left', fontSize: 18, marginRight: '5px' }}
            alt='Verified'
          />
        </Tooltip>
      </Box>
      <Box>
        <button className='flex bg-[#171818] text-xs w-auto left-0 shadow-md text-white rounded-lg px-2 py-1 hover:bg-[#58e3b2]'>
          Connect
        </button>
      </Box>
    </Box>
  );
};

export default Consultant;
