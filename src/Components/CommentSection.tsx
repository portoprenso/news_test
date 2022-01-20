import React from 'react';
import { Box } from '@mui/material';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { InputEnum } from '../Types/NewsTypes';


export default function CommentSection():JSX.Element {
  const { news: {comments}, user: {currentUser} } = useTypedSelector(state => state);

  return(
  <Box sx={{py: 5}}>
    <CommentInput rootCommentId={null} parentId={null} type={InputEnum.post}/>
    <Box>
      {comments && comments.map(comment => (
        <Comment key={comment.id} rootCommentId={comment.id} comment={comment}/>
      ))}
    </Box>
    
  </Box>)
}