import { PublicOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../widget/FlexBetween';
import UserImage from '../../widget/UserImage';
import TimestampConverter from '../../widget/TimeConverter';

const Friend = ({ friendId, name, subtitle, userPicturePath, creation }) => {
  const navigate = useNavigate();

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}>
          <Typography
            color={'black'}
            variant='h6'
            fontWeight='300'
            sx={{
              textTransform: 'capitalize',
              '&:hover': {
                color: 'black',
                cursor: 'pointer',
              },
            }}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Tooltip title={creation}>
              <Typography
                color={'black'}
                sx={{ cursor: 'pointer' }}
                fontSize='0.75rem'>
                <TimestampConverter timestamp={creation} />
              </Typography>
            </Tooltip>
            <Tooltip title='public'>
              <PublicOutlined
                sx={{ width: '17px', height: '17px' }}
                className='text-xs ml-2 '
              />
            </Tooltip>
          </Box>
        </Box>
      </FlexBetween>
      <IconButton></IconButton>
    </FlexBetween>
  );
};

export default Friend;
