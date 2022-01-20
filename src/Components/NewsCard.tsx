import React from 'react';
import { Chip, Stack, CardHeader, Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { INews } from './../Types/NewsTypes';
import { getDateFormatted } from '../Helpers/functions';
import { useTypedSelector } from '../Hooks/UseTypedSelector';
import { useNavigate } from 'react-router-dom';

interface IProps {
  news: INews
}

function NewsCard(props: IProps) {
  const { news } = props;
  const { tags } = useTypedSelector((state) => state.news);
  const navigate = useNavigate()
  const time = getDateFormatted(news.date)
  return (
    <Card
    elevation={3}
    sx={{ maxWidth: "100%", display: 'flex', my: 2, alignItems: 'center'}}
    >
      <CardMedia
        onClick={() => navigate(`/${news.id}/view`)}
        sx={{maxWidth: "235px", cursor: "pointer"}}
        component="img"
        height="140"
        image={news.images.headerImage}
        alt="header-image"
      />
      <Box>
        <CardHeader
        onClick={() => navigate(`/${news.id}/view`)}
        sx={{cursor: "pointer"}}
        title={`${news.title.slice(0, 30)}...`}
        titleTypographyProps={{variant: 'h5' }}
        subheader={news.subTitle}
        />
        <CardContent>
        <Typography variant='subtitle2'>{time}</Typography>
          <Stack direction="row" spacing={1}>
            {news?.tags.slice(0,4).map(item => <Chip
              sx={{overflow: 'hidden', maxWidth: '100px',textOverflow: "ellipsis", whiteSpace: "nowrap",}}
              key={item}
              clickable={true}
              size="small"
              label={tags.find(tag => tag.id === item).title}
              variant="outlined"
              />
            )}
          </Stack>
        </CardContent>
      </Box>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default NewsCard;