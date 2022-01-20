import React from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../Hooks/UseTypedSelector';
import { generateUUIDV4 } from '../Helpers/functions';
import { postComment, postReply } from '../Slices/NewsSlice';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { InputEnum } from '../Types/NewsTypes';

interface IProps {
  type: InputEnum;
  initialString?: string;
  parentId: string | null;
  rootCommentId: string | null;
  setOpenInput?: Function;
}

export default function CommentInput(props: IProps):JSX.Element{
  const { type, initialString='', parentId, rootCommentId, setOpenInput } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user: {currentUser}, news: {comments} } = useTypedSelector(state => state);
  // const { news: {comments}, user: {currentUser} } = useTypedSelector(state => state);
  const initialValues = {comment: initialString};
  const onSubmit = (values: any):void => {
    if(currentUser && typeof id === 'string' && comments){
      const obj = {
        id: generateUUIDV4(),
        postId: id,
        status: 'posted',
        author: {
          authorId: currentUser.id,
          firstName: currentUser.firstName
        },
        parentId: parentId,
        rootCommentId: rootCommentId,
        text: values.comment,
        date: Date.now(),
        children: []
      }
      console.log(obj, type, rootCommentId)
      switch(type){
        case InputEnum.post:
          dispatch(postComment(obj));
          break;
        case InputEnum.reply:
          if(rootCommentId){
            dispatch(postReply({comment: obj, rootCommentId: rootCommentId, comments}));
          }
          break;
        // case InputEnum.post:
        //   dispatch(postComment(obj))
        default: return alert("Зарегистрируйтесь")
      }
      if(setOpenInput) setOpenInput(false)
    } else {
      alert("Зарегистрируйтесь")
    }
  }
  const validationSchema = yup.object({
    comment: yup
      .string()
      .max(255, "Текст вашего сообщения не может быть длиннее 255 символов")
      .min(1, "Текст вашего сообщения должен быть не менее одного символа")
      .required("Введите текст своего сообщения")
    });

  const formik = useFormik({initialValues, onSubmit, validationSchema, enableReinitialize: true});
  return(
  <>
  <FormControl sx={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline'}} fullWidth onSubmit={(event: any) => formik.handleSubmit(event)} component="form">
      <TextField
      fullWidth={true}
        multiline={true}
        maxRows={3}
        label="...комментарий"
        id="comment"
        name="comment"
        type="text"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.comment ? formik.errors.comment : ""}
        error={
          formik.touched.comment && Boolean(formik.errors.comment)
        }
      />
      <Button type="submit"><SendIcon /></Button>
  </FormControl>
  </>)
}