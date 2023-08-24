import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
} from '@mui/material';
import FlexBetween from '../widget/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from '../widget/UserImage';
import WidgetWrapper from '../widget/WidgetWrapper';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [isClip, setIsClip] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
  const [image, setImage] = useState(null);
  const [clip, setClip] = useState(null);
  const [Attachement, setAttachment] = useState(null);
  const [post, setPost] = useState('');
  const [postValue, setPostValue] = useState('');
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const token = localStorage.getItem('token');
  const _id = JSON.parse(localStorage.getItem('user'))._id;
  const options = [
    { label: 'Housing Law', value: 'housing-law' },
    { label: 'Criminal Law', value: 'criminal-law' },
    { label: 'Income Assistance', value: 'income-assistance' },
    { label: 'Abuse and Family Violence', value: 'abuse-family-violence' },
    { label: 'Tribunals and Courts', value: 'tribunals-courts' },
    { label: 'Wills and Powers of Attorney', value: 'wills-powers-attorney' },
    { label: 'Debt and Consumer Rights', value: 'debt-consumer-rights' },
    { label: 'Human Rights', value: 'human-rights' },
    { label: 'Education', value: 'education' },
    { label: 'Provincial Offences', value: 'provincial-offences' },
    { label: 'Immigration Law', value: 'immigration-law' },
    { label: 'Refugee Law', value: 'refugee-law' },
    { label: 'Health and Disability', value: 'health-disability' },
    { label: 'French Language Rights', value: 'french-language-rights' },
    {
      label: 'Help from Lawyers and Paralegals',
      value: 'help-lawyers-paralegals',
    },
  ];

  const handlePost = async (event) => {
    event.preventDefault();
    if (!post || !postValue) {
      // Check if post content or post topic is empty
      toast.warn('Please provide both post content and topic.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', _id);
      formData.append('topic', postValue); // Adding the post topic
      formData.append('content', post); // Adding the post content
      if (image) {
        formData.append('image', image);
        // formData.append('picturePath', image.name);
      }
      await axios
        .post(`http://localhost:3001/posts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success('Post created successfully');
          setImage(null);
          setPost('');
          setPostValue(''); // Clear the selected post topic after creating the post
          setIsImage(false);
          setIsClip(false);
          setIsAttachment(false);
        })
        .catch((error) => {
          toast.error('Error Posting:', error);
        });
    } catch (error) {
      toast.error('Error while Posting:', error);
    }
  };

  return (
    <WidgetWrapper>
      <div>
        <FlexBetween gap='1.5rem'>
          <UserImage image={picturePath} />

          {/* Select Component */}
          <Select
            value={postValue}
            onChange={(e) => setPostValue(e.target.value)}
            sx={{
              width: '100%',
              backgroundColor: '#F2F2F2',
              borderRadius: '2rem',
              border: 'none',
              height: '35px',
              textAlign: 'center',
              color: 'grey',
              fontSize: '0.9rem',
            }}
            displayEmpty>
            <MenuItem value='' disabled sx={{ border: 'none' }}>
              Chose post topic here ...
            </MenuItem>
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ border: 'none' }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FlexBetween>

        {/* InputBase Component */}
        <InputBase
          placeholder='What on your mind...'
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '88%',
            backgroundColor: '#fff',
            borderRadius: '2rem',
            padding: '1rem 2rem',
            marginLeft: '12%',
          }}
        />
      </div>

      {isImage && (
        <Box border={`1px solid 'black'`} borderRadius='5px' mt='1rem' p='1rem'>
          <Dropzone
            acceptedFiles='.jpg,.png,.jpeg,.gif,.bmp,.tif,.tiff,.ico,.svg'
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}>
                  <input
                    {...getInputProps()}
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  {!image ? (
                    <p sx={{ color: 'grey' }}>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography sx={{ color: 'grey' }}>
                        {image.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: 'auto', height: 'auto', marginLeft: '20px' }}>
                    <DeleteOutlined sx={{ color: '#ef233c' }} />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {isClip && (
        <Box border={`1px solid 'black'`} borderRadius='5px' mt='1rem' p='1rem'>
          <Dropzone
            acceptedFiles='.mp4,.mov,.avi,.wmv,.mpg,.mpeg,.flv,.3gp,.mkv,.webm,.m4v,.gif'
            multiple={false}
            onDrop={(acceptedFiles) => setClip(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}>
                  <input {...getInputProps()} />
                  {!clip ? (
                    <p sx={{ color: 'grey' }}>Add Clip Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography sx={{ color: 'grey' }}>
                        {clip.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {clip && (
                  <IconButton
                    onClick={() => setClip(null)}
                    sx={{ width: 'auto', height: 'auto', marginLeft: '20px' }}>
                    <DeleteOutlined sx={{ color: '#ef233c' }} />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {isAttachment && (
        <Box border={`1px solid 'black'`} borderRadius='5px' mt='1rem' p='1rem'>
          <Dropzone
            acceptedFiles='.pdf,dotx,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt'
            multiple={false}
            onDrop={(acceptedFiles) => setAttachment(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}>
                  <input {...getInputProps()} />
                  {!Attachement ? (
                    <p sx={{ color: 'grey' }}>Add Attachment Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography sx={{ color: 'grey' }}>
                        {Attachement.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {Attachement && (
                  <IconButton
                    onClick={() => setAttachment(null)}
                    sx={{ width: 'auto', height: 'auto', marginLeft: '20px' }}>
                    <DeleteOutlined sx={{ color: '#ef233c' }} />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: '1.25rem 0' }} />
      <FlexBetween>
        <FlexBetween
          gap='0.25rem'
          onClick={() => {
            setIsImage(!isImage);
            setIsClip(false);
            setIsAttachment(false);
          }}>
          <ImageOutlined
            sx={{
              color: 'black',
              '&:hover': { cursor: 'pointer', color: 'black' },
            }}
          />
          <Typography
            color={'black'}
            sx={{ '&:hover': { cursor: 'pointer', color: 'black' } }}>
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap='0.25rem'
              onClick={() => {
                setIsClip(!isClip);
                setIsImage(false);
                setIsAttachment(false);
              }}>
              <GifBoxOutlined
                sx={{
                  color: 'black',
                  '&:hover': { cursor: 'pointer', color: 'black' },
                }}
              />
              <Typography
                color={'black'}
                sx={{ '&:hover': { cursor: 'pointer', color: 'black' } }}>
                Clip
              </Typography>
            </FlexBetween>

            <FlexBetween
              gap='0.25rem'
              onClick={() => {
                setIsAttachment(!isAttachment);
                setIsImage(false);
                setIsClip(false);
              }}>
              <AttachFileOutlined
                sx={{
                  color: 'black',
                  '&:hover': { cursor: 'pointer', color: 'black' },
                }}
              />
              <Typography
                color={'black'}
                sx={{
                  color: 'black',
                  '&:hover': { cursor: 'pointer', color: 'black' },
                }}>
                Attachment
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap='0.25rem'>
            <MoreHorizOutlined sx={{ color: 'black' }} />
          </FlexBetween>
        )}

        <button
          // disabled={!post || !postValue}
          className={
            'bg-black text-sm text-white px-4 p-1 rounded-full hover:bg-gray-500 hover:cursor-pointer focus:outline-none'
          }
          onClick={handlePost}>
          POST
        </button>
      </FlexBetween>
      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </WidgetWrapper>
  );
};

export default MyPostWidget;
