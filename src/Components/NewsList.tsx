import { Container, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../Hooks/UseTypedSelector';
import { getCountries } from '../Slices/FootballSlice';
import { getNews, getTags } from '../Slices/NewsSlice';
import NewsCard from './NewsCard';

function NewsList() {
  const counter = React.useRef(0)
  console.log(counter.current++);
  React.useEffect(() => {
    dispatch(getCountries())
  }, [])

  const { news, tags } = useTypedSelector((state) => state.news);
  const dispatch = useDispatch();  
  React.useEffect(() => {
    dispatch(getNews());
    dispatch(getTags())
  }, [])
  return (
    <Grid item xs={12}>
      <Grid item xs={8}>
        {tags.length && news.map((article) => <NewsCard key={article.id} news={article}/>)}
      </Grid>
      <Grid item xs={4}>

      </Grid>
    </Grid>
  );
}

export default NewsList;