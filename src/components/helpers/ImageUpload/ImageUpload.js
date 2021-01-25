//imageReducer.path
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const ImageUpload = () => {
  const [avatar, setAvatar] = useState([{ avatarPath: '' }]);
  const dispatch = useDispatch();

  /**
   *
   * @param {Object} imgFile has file information for picture uploaded to AWS bucket
   */
  const handleUpload = (imgFile) => {
    setAvatar({ avatarPath: imgFile.fileUrl });
    dispatch({ type: 'SET_AWS_AVATAR', payload: avatar });
  };

  const uploadOptions = {
    sever: process.env.WS_ENDPOINT,
  };

  const s3Url = process.env.AWS_URL;

  return (
    <DropzoneS3Uploader
      onFinish={handleUpload}
      s3Url={s3Url}
      maxSize={1200 * 1200 * 5}
      upload={uploadOptions}
    />
  );
};

export default ImageUpload;
