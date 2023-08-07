import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from '../UserImage';
import FlexBetween from '../FlexBetween';
import WidgetWrapper from '../WidgetWrapper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWidgetSide = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }
  const { firstName, lastName, profilePicture, adresse, phone } = user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color='black'
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: '#1877F2',
                  cursor: 'pointer',
                },
              }}>
              {firstName} {lastName}
            </Typography>
            <Typography color='black'>{phone} </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidgetSide;
