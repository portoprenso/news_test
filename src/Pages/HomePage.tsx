import { Box, Container } from '@mui/material';
import React from 'react';
import NewsList from '../Components/NewsList';
import TopNews from '../Components/TopNews';
import Sidebar from './../Components/Sidebar';

function HomePage() {
  return (
    <>
      <Sidebar />
      <Container>
        <TopNews />
        <NewsList />
      </Container>
    </>
  );
}

export default HomePage;