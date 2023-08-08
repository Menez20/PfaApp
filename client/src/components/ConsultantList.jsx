// import { Box, Typography, useTheme } from '@mui/material';
// import WidgetWrapper from './WidgetWrapper';
// import { useState, useEffect } from 'react';
// import Consultant from './profilepagecmp/Consultant';

// const ConsultantList = () => {
//   const [consultant, setConsultant] = useState([]); // Use an empty array as initial state
//   const token = localStorage.getItem('token');

//   const getConsultant = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/users/getusersbyrole`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setConsultant(data); // Update the state with the fetched data
//     } catch (error) {
//       console.error('Error fetching consultants:', error);
//     }
//   };

//   useEffect(() => {
//     getConsultant();
//   }, []);

//   return (
//     <WidgetWrapper>
//       <Typography
//         color={'black'}
//         variant='h5'
//         fontWeight='500'
//         sx={{ mb: '1.5rem' }}>
//         Consultant List
//       </Typography>
//       <Box display='flex' flexDirection='column' gap='1.5rem'>
//         {consultant.map((consultant) => (
//           <Consultant
//             key={consultant._id}
//             consultantId={consultant._id}
//             name={`${consultant.firstName} ${consultant.lastName}`}
//             ProfilePath={consultant.profilePicture}
//             token={consultant.token}
//           />
//         ))}
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default ConsultantList;

import { Box, Divider, Typography, useTheme } from '@mui/material';
import WidgetWrapper from './WidgetWrapper';
import { useState, useEffect } from 'react';
import Consultant from './profilepagecmp/Consultant';
import Pagination from '@mui/material/Pagination'; // Make sure to import the Pagination component from your Material-UI library

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultantsPerPage] = useState(5); // Number of consultants per page
  const token = localStorage.getItem('token');

  const getConsultants = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/getusersbyrole`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setConsultants(data);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    }
  };

  useEffect(() => {
    getConsultants();
  }, []);

  // Calculate current consultants to display
  const indexOfLastConsultant = currentPage * consultantsPerPage;
  const indexOfFirstConsultant = indexOfLastConsultant - consultantsPerPage;
  const currentConsultants = consultants.slice(
    indexOfFirstConsultant,
    indexOfLastConsultant
  );

  // Change page
  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  return (
    <WidgetWrapper>
      <Typography
        color={'black'}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}>
        Consultant List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {currentConsultants.map((consultant) => (
          <Box>
            {' '}
            <Consultant
              key={consultant._id}
              consultantId={consultant._id}
              name={`${consultant.firstName} ${consultant.lastName}`}
              ProfilePath={consultant.profilePicture}
              token={consultant.token}
            />
            <Divider sx={{ mt: '1.5rem' }} />
          </Box>
        ))}
      </Box>
      {consultants.length > consultantsPerPage && (
        <Box display='flex' justifyContent='center' mt='2rem'>
          <Pagination
            count={Math.ceil(consultants.length / consultantsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ConsultantList;
