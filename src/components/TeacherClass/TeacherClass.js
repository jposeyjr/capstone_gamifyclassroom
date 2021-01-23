import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';

const TeacherClass = (props) => {
  const classes = useStyles();
  const [colorChange, setColorChange] = useState(false);

  useEffect(() => {
    if (props.multi === false) setColorChange(false);
  }, [props.multi]);

  //changes date to a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  const handleColor = () => {
    //only change the color if in multi select mode
    if (props.multi) {
      setColorChange(!colorChange);
    }
  };

  return (
    <Card
      id={props.student.student_id}
      className={classes.card}
      onClick={() => handleColor()}
      style={{
        backgroundColor: colorChange && props.multi ? '#944545' : '#0f3057',
      }}
    >
      <CardActionArea
        id={props.student.student_id}
        onClick={(e) => props.handleClick(e, props.student)}
        classes={{
          root: classes.atnArea,
          focusHighlight: classes.focusHighlight,
        }}
      >
        {/* for now this will render an avatar if they have it if not a blank image,
        TODO better placeholder image */}
        {props.student.avatar ? (
          <CardMedia
            component='img'
            className={classes.avatar}
            image={props.student.avatar}
            title='avatar'
            aria-label='an avatar character'
          />
        ) : (
          <CardMedia
            className={classes.media}
            image={'https://via.placeholder.com/150'}
            title='avatar'
            aria-label='blank place holder'
          />
        )}
        <Grid container justify='flex-end'>
          <CardContent>
            <Typography variant='h5' color='textPrimary' component='h2'>
              {props.student.first_name} {props.student.last_name.slice(0, 1)}
            </Typography>
            <Typography variant='h6' color='textPrimary' component='p'>
              Points: {props.student.points}
            </Typography>
            <Typography variant='body1' color='textPrimary' component='p'>
              Last Point Earned: {handleDate(props.student.last_point_date)}
            </Typography>
          </CardContent>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default TeacherClass;
