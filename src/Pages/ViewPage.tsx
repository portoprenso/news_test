import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getCurrentNews, getTags } from '../Slices/NewsSlice';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import Sidebar from './../Components/Sidebar';
import { Box, CircularProgress, Container, Divider, Grid, Typography, Stack, Button, Paper, Chip } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getAuthor, getCurrentUser } from './../Slices/AuthSlice';
import { getDateFormatted } from '../Helpers/functions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoSlider from '../Components/PhotoSlider/PhotoSlider';
import TopNews from '../Components/TopNews';
import ReadAlso from './../Components/ReadAlso';
import CommentSection from '../Components/CommentSection';

const SXstyles = {
  // leftContainer: {
  //   pr
  // },
  divider: {
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'background.paper',
    color: 'text.secondary',
    '& svg': {
      mx: 1.5,
      my: 0.5
    },
    '& hr': {
      mx: 0.5,
    },
  },
  headerImageContainer: {
    // px: 5,s
    overflow: 'hidden',
  },
  headerImage: {
    width: "100%",
    borderRadius: "8px"
  }
}

function ViewPage() {
  // let counter = React.useRef(0);
  // counter.current++
  // console.log(`RENDER #${counter.current}`)
  const { id } = useParams();
  const idRef = React.useRef(id);
  const dispatch = useDispatch()
  const { currentNews, tags } = useTypedSelector(state => state.news);
  const { newsAuthor } = useTypedSelector(state => state.user);
  React.useEffect(() => {
    if (typeof id === 'string') {
      dispatch(getCurrentNews(id))
    }
  }, [id])

  React.useEffect(() => {
    if (currentNews && id) {
      dispatch(getAuthor(currentNews.author));
      dispatch(getCurrentUser(currentNews.author));
      dispatch(getComments(id))
    }
    if(!tags.length){
      dispatch(getTags());
    }
  }, [currentNews])

  React.useEffect(() => {
    return () => {
      console.log('VIEWPAGE UNMOUNTED')
      dispatch(getComments(null))
    }
  }, [])

  if(!tags.length || !currentNews){
    return <CircularProgress sx={{ position: "absolute", left: '50%', top: "50vh" }} />
  }

  return (
    <>
      <Sidebar />
      <Container sx={{ mt: 10, display: 'flex' }}>
        {!currentNews && <CircularProgress sx={{ position: "absolute", left: '50%', top: "50vh" }} />}
        {currentNews && <><Grid sx={{ pr: 5 }} item xs={9}>
          <Typography variant="h4">
            {currentNews.title}
          </Typography>
          <Box>
            <Box>
              <Typography component={"span"} sx={SXstyles.divider}>
                <BorderColorIcon />
                {newsAuthor && `${newsAuthor.firstName} ${newsAuthor.lastName}`}
                <Divider orientation="vertical" variant="middle" flexItem />
                {getDateFormatted(currentNews.date)}
              </Typography>
            </Box>
            <Box sx={SXstyles.headerImageContainer}>
              <img src={currentNews.images.headerImage} style={SXstyles.headerImage} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack spacing={2} direction="row">
                <Button color='success' variant="text"><FavoriteIcon /></Button>
                {/* <Button variant="contained">Комментарии</Button> */}
              </Stack>

              <Stack spacing={2} direction="row">
                <Button color='success' variant="contained">Поделиться</Button>
                <Button variant="contained">Комментарии</Button>
              </Stack>
            </Box>
            <Paper elevation={3} sx={{ px: 2, mt: 2, py: 2 }}>
              <Typography variant="h6">
                {currentNews.subTitle}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                {currentNews.mainText}
              </Typography>
              {
                currentNews.images.otherImages && <PhotoSlider images={currentNews.images.otherImages} />
              }
            </Paper>
            <Box sx={{display: 'flex', mt: 2}}>
              <Typography sx={{mr: 1}} component={'span'} variant="body1" color={'GrayText'}>Теги</Typography>
              <Stack direction="row" spacing={1}>
                {tags.length && currentNews.tags.slice(0,4).map(item => <Chip
                  sx={{overflow: 'hidden', maxWidth: '100px',textOverflow: "ellipsis", whiteSpace: "nowrap",}}
                  key={item}
                  clickable={true}
                  size="small"
                  label={tags.find(tag => tag.id === item).title}
                  variant="outlined"
                  />
                )}
              </Stack>
            </Box>
          </Box>
          <ReadAlso />
          <CommentSection />
        </Grid>
          <Grid item xs={3}>
            <TopNews/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur magni perspiciatis ut repellendus, possimus ab veniam eius, quasi laudantium cum inventore totam fugit qui minima aperiam molestias, a corporis sint.
          </Grid></>}
      </Container>
    </>
  );
}

export default ViewPage;