import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const Countdown = ({ timeTillDate, timeFormat }) => {
  const [minutes, setMinutes] = useState('01');
  const [seconds, setSeconds] = useState('59');

  useEffect(() => {
    const interval = setInterval(() => {
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <span className="tag is-info is-light">{`${minutes}:${seconds}`}</span>
    </div>
  );
};
