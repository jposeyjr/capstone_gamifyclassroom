import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const TeacherHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CLASSES' });
  }, []);
  return (
    <div>
      <h1>My Classes</h1>
      <button>Add Class</button>
      <button>Edit Class</button>
      <div>
        <h2>Vatti</h2>
        <ul>
          <li>Total Students</li>
          <li>Start Date: 01-02-21</li>
          <li>End Date: 02-21-21</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherHome;
