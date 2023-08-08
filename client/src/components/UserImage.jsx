import { Box } from '@mui/material';

const UserImage = ({ image, size = '' }) => {
  return (
    <Box>
      <img
        className='w-16 h-16 max-w-none rounded-full object-cover'
        alt='user'
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
