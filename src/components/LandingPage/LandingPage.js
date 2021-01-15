import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './LandingPage.css';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className='container'>
        <h2>{this.state.heading}</h2>

        <div className='grid'>
          <div className='grid-col grid-col_8'>
            <p>
              Gamified classrooms allow teachers to easily and quickly reward
              students for participating in the classroom and keep track of all
              students and activity levels throughout one or many classrooms.
              The gamified classroom is aimed to be quick, simple, and easy with
              limited intrusiveness to allow for quick approval by parents and
              school boards
            </p>
          </div>
          <div className='grid-col grid-col_4'>
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className='btn btn_sizeSm' onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
