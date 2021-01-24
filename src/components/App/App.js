import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import StudentPage from '../StudentPage/StudentPage';
import StudentRegister from '../StudentRegister/StudentRegister';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import TeacherHome from '../TeachHome/TeacherHome';
import TeacherList from '../TeacherClass/TeacherList';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from='/' to='/home' />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path='/about'
              component={AboutPage}
            />
            <Route
              exact
              path='/studentregister'
              component={StudentRegister}
              authRedirect='/student'
            />

            <ProtectedRoute
              exact
              path='/student'
              component={StudentPage}
              teacherRedirect='/teacherhome'
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/student"
              // - else shows RegisterPage at "/login"
              exact
              path='/login'
              component={LoginPage}
              teacherRedirect='/teacherhome'
              authRedirect='/student'
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/student"
              // - else shows RegisterPage at "/registration"
              exact
              path='/registration'
              component={RegisterPage}
              teacherRedirect='/teacherhome'
              authRedirect='/student'
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/student"
              // - else shows RegisterPage at "/home"
              exact
              path='/home'
              component={LandingPage}
              teacherRedirect='/teacherhome'
              authRedirect='/student'
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              exact
              path='/teacherclass'
              component={TeacherList}
              authRedirect='/student'
            />

            <ProtectedRoute
              exact
              path='/teacherhome'
              component={TeacherHome}
              authRedirect='/student'
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default connect()(App);
