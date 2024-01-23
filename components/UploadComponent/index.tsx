import { Upload, Button } from 'antd';
import { MAX_FILE_SIZE, LIST_FILE_IMG_SUPPORT } from '../../constants/index';
import React, { FC } from 'react';
import showMessage from '../Message';
import TYPE_CONSTANTS from 'constants/type';

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

type UploadType = {
  onChange: any;
  maxSizeMB?: number;
  maxSize?: number;
  listFileTypeSupport?: string[];
  setLoading?: any;
  content?: any;
  className?: any;
};
const UploadComponent: FC<UploadType> = ({
  onChange,
  maxSize = MAX_FILE_SIZE,
  maxSizeMB = 2,
  listFileTypeSupport = LIST_FILE_IMG_SUPPORT,
  setLoading,
  content,
  className,
}) => {
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      onChange(info.file);
    }
    setLoading && setLoading(false);
  };

  const handleBeforeUpload = (file: any) => {
    if (!listFileTypeSupport.includes(file.type)) {
      showMessage(typeOfMessage.ERROR, 'File format is invalid.');
      return Upload.LIST_IGNORE;
    } else if (file.size > maxSize) {
      showMessage(typeOfMessage.ERROR, `File size is exceeding ${maxSizeMB}Mb`);
      return Upload.LIST_IGNORE;
    }
    setLoading && setLoading(true);
    return true;
  };

  return (
    <Upload
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={handleBeforeUpload}
      className={className}
      customRequest={({ onSuccess }: any) => onSuccess('ok')}
    >
      {content || <Button icon={<img src="/upload-icon.svg" alt="icon upload" />}>upload</Button>}
    </Upload>
  );
};

export default UploadComponent;
