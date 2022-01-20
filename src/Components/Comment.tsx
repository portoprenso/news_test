import React from 'react';
import { Avatar, Box, Button, Divider, Grid, Typography, TextField } from '@mui/material';
import { IComment, InputEnum } from '../Types/NewsTypes';
import { getDateFormatted } from '../Helpers/functions';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import CommentInput from './CommentInput';
import { useTrail, animated as a } from "react-spring";
import { useDispatch } from 'react-redux';
import { deleteComment } from '../Slices/NewsSlice';

interface ICommentProps {
  comment: IComment;
  even?: boolean;
  rootCommentId: string;
}

const config = { mass: 5, tension: 2000, friction: 200 };



export default function Comment(props: ICommentProps):JSX.Element {
  const { comment, even=false, rootCommentId } = props;
  const { comments } = useTypedSelector(state => state.news);
  const inputRef = React.useRef(null);
  const dispatch = useDispatch()
  const [ openInput, setOpenInput ] = React.useState(false);
  const [ initialString, setInitialString ] = React.useState('');
  const trail = useTrail(1, {
    config,
    opacity: openInput ? 1 : 0,
    x: openInput ? 0 : 25,
    maxHeight: openInput ? 125 : 0,
    height: 'auto',
    from: { opacity: 0, x: 25, maxHeight: 0 },
  })[0];

  const handleClick = (e:any) => {
    e.stopPropagation();
    const type = e.target.textContent;
    if(type === 'edit'){
      setInitialString(comment.text)
    } else {
      setInitialString('')
    }
    setOpenInput(!openInput)
  }
  const handleDelete = (e:any) => {
    e.stopPropagation();
    if(comments){
      dispatch(deleteComment({commentToDelete: comment, rootCommentId, comments}))
    }
  }
  


  return(
  <Box sx={{backgroundColor: even ? '#e8e8e8' : 'white',}}>
    <Box sx={{display: 'block'}}>
      <Grid sx={{
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
        },}}
      >
        <Avatar sx={{maxHeight: "25px", maxWidth: "25px", mr: 1}} alt='comment-author-avatar' src={comment.author.avatar }/>
        <Typography component="span" variant="subtitle1">{comment.author.firstName}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography component="span" variant="caption">{getDateFormatted(comment.date)}</Typography>
      </Grid>
      <Grid sx={{zIndex: 1, position:'relative'}} item xs={11}>
        <Typography variant="overline">
          {comment.text}
        </Typography>
      </Grid>
    </Box>
    <Box sx={{position: 'relative', zIndex: 1}}>
      <Typography onClick={handleClick} sx={{mr: 1, fontSize: 12, cursor: 'pointer'}} component='span'>reply</Typography>
      <Typography onClick={handleClick} sx={{mr: 1, fontSize: 12, cursor: 'pointer'}} component='span'>edit</Typography>
      <Typography onClick={handleDelete} sx={{mr: 1, fontSize: 12, cursor: 'pointer'}} component='span'>delete</Typography>
    </Box>
    <a.div
    style={{
      ...trail,
      transform: trail.x.interpolate(x => `translate3d(0,${x}px,0)`)
    }}
    ><CommentInput setOpenInput={setOpenInput} rootCommentId={rootCommentId} parentId={comment.id} initialString={initialString} type={InputEnum.reply} /></a.div>
    
    {comment?.children?.length ? comment.children.map(child => (
      child.parentId ? <Box key={child.id} sx={{pl: 2}}>
          <Comment rootCommentId={rootCommentId} even={!even} comment={child}/>
        </Box> : <Comment rootCommentId={rootCommentId} key={child.id} even={!even} comment={child}/>
    )) : null }
  </Box>)
}