import React from 'react';
import Spinner from './Spinner';
import UserCard from './UserCard';
import { API_STATUS } from '../../constants/github';

function StatusContent({ status, userInfo, onClose }) {
  switch (status) {
    case API_STATUS.PENDING:
      return <Spinner />;
      
    case API_STATUS.REJECTED:
      return (
        <div className="mt-6 text-center text-red-500">
          결과를 찾을 수 없습니다. 다시 시도해 주세요!
        </div>
      );
      
    case API_STATUS.RESOLVED:
      return <UserCard userInfo={userInfo} onClose={onClose} />;
      
    case API_STATUS.IDLE:
    default:
      return null;
  }
}

export default StatusContent;