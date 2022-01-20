import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Divider,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import { useNavigate } from 'react-router-dom';
import GetIcon from './GetIcon';
import { getNews } from '../Slices/NewsSlice';
import { useDispatch } from 'react-redux';



export default function TopNews() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { news } = useTypedSelector(state => state.news);
  const [value, setValue] = React.useState('mainNews');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if(!news || Array.isArray(news) && !news.length){
      dispatch(getNews())
    }
  }, [])

  React.useEffect(() => {
    
  }, [value])

  const renderNewsList = (flag: string) => {
    return news.slice(0,5).map(article => (
    <ListItem key={article.id} disablePadding onClick={() => navigate(`/${article.id}/view`)}>
      <ListItemButton sx={{py: 0}}>
        <ListItemIcon>
          <GetIcon tags={article.tags}/>
        </ListItemIcon>
        <ListItemText primary={article.title} />
      </ListItemButton>
    </ListItem>
  ))}

  // console.log(news)

  return (
    <Paper elevation={3} sx={{ width: '100%', mt: 10 }}>
      { news &&
      <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="mainNews" label="Главные новости" />
        <Tab value="popular" label="Обсуждаемые" />
      </Tabs>
      <Divider />
      <Box>
      <nav aria-label="secondary mailbox folders">
        <List>
          {value && renderNewsList(value)
          }
          </List>
      </nav>
      </Box>
      </>
      }
    </Paper>
  );
}
