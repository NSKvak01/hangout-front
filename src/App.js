import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainRouter from './MainRouter'
import Spinner from "./components/Spinner/Spinner"
import AuthContextWrapper from './context/AuthContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <React.Suspense fallback={<Spinner />}>
      <ToastContainer />
      <Router>
        <AuthContextWrapper>
          <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  )
}

export default App
