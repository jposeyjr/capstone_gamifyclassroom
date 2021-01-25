import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

//making an array of filenames of images in the avatar folder to prevent importing them one at a time
function importAll(r) {
  return r.keys().map(r);
}

//grabs the images from avatars folder stopping at the top folder (false) and looking for the following file extensions
const avatarImages = importAll(
  require.context('../../../assets/Avatars', false, /\.(png|jpe?g|svg)$/)
);

//used to handle selecting of an avatar image
const AvatarSelector = (props) => {
  const handleListItemClick = (e) => {
    const avatarImg = e.target.src;
    props.handleAvatarClose(avatarImg);
  };

  return (
    <Dialog
      onClose={props.handleAvatarClose}
      aria-labelledby='simple-dialog-title'
      open={props.avatarOpen}
    >
      <DialogTitle id='simple-dialog-title'>Avatar Selector</DialogTitle>
      <List>
        {avatarImages.map((avtImg, i) => (
          <ListItem button onClick={(e) => handleListItemClick(e)} key={i}>
            <img src={avtImg} alt='avatar character'></img>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default AvatarSelector;
