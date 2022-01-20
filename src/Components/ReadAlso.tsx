import React from 'react';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import { getReadAlsoNews } from './../Slices/NewsSlice';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

export default function ReadAlso():JSX.Element {
  const { readAlsoNews } = useTypedSelector(state => state.news);
  const dispatch = useDispatch()
  React.useEffect(() => {
    if(!readAlsoNews.length){
      dispatch(getReadAlsoNews());
    }
  }, [])

  if(!readAlsoNews || !readAlsoNews.length) return <CircularProgress sx={{ position: "absolute", left: '50%', top: "50vh" }} />

  return(
  <Box sx={{overflow: 'auto', my: 2, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
    {readAlsoNews.map(news => (
      <Grid item xs={3} sx={{mx: 1, minWidth: "225px"}} key={news.id}>
        <img src={news.images.headerImage} style={{height: "150px", borderRadius: 8}}/>
        <Box>
          <Typography variant="caption" >{news.title}</Typography>
        </Box>
      </Grid>
    ))}
  </Box>)
}