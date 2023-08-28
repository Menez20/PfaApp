import React from 'react';

const TimestampConverter = ({ timestamp }) => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTimeDifference = (timestamp) => {
    const currentDate = new Date();
    const timestampDate = new Date(timestamp);
    const timeDifference = currentDate - timestampDate;
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    if (days === 0) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      if (hours === 0) {
        const minutes = Math.floor(timeDifference / (60 * 1000));
        if (minutes === 0) {
          return `in a few seconds`;
        }
        return `${minutes}m`;
      }
      return `${hours}h`;
    } else if (days <= 30) {
      return `${days}d`;
    } else {
      return formatDate(timestamp);
    }
  };

  return <div>{formatTimeDifference(timestamp)}</div>;
};

export default TimestampConverter;
