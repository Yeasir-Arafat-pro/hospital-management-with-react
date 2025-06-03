import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../app/url';

const Home = () => {
  const handlePingForRender = async () => {
    try {
      const res = await axios.get(`${BASE_URL}seed/ping`);
      console.log('পিং রেসপন্স:', res.data);
    } catch (error) {
      console.log('পিং এরর:', error.response?.status, error.message);
    }
  };

  // শুধুমাত্র একবার কল হবে, কম্পোনেন্ট মাউন্ট হলে:
  useEffect(() => {
    setInterval(() => {
        handlePingForRender()
    }, 60000);

    return () => {
      clearInterval(60000);
    };
  }, []);

  return <div>Home Page</div>;
};

export default Home;