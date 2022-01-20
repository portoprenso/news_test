import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// const { Alert, Snackbar } = React.lazy(() => import('@mui/material'));
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useTypedSelector } from './../Hooks/UseTypedSelector';
import { useDispatch } from 'react-redux';
import { closeSnackbar } from '../Slices/NewsSlice';
const HomePage = React.lazy(() => import('./../Pages/HomePage'));
const ViewPage = React.lazy(() => import('./../Pages/ViewPage'));
const Navbar = React.lazy(() => import('./../Components/Navbar'));


function PublicRoutes() {
  const { snackbar, snackbarStatus } = useTypedSelector(state => state.news);
  const dispatch = useDispatch()
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>}>
      <Navbar />
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => dispatch(closeSnackbar())}>
        <Alert onClose={() => dispatch(closeSnackbar())} severity={snackbarStatus.severity} sx={{ width: '100%' }}>
          {snackbarStatus.text}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/:id/view" element={<ViewPage />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default PublicRoutes;