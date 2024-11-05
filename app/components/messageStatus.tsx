'use client';

import { PlayerContextI } from '@/types/context';
import { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';

const MessageStatus = () => {
  const { isError, message, isSuccess } = useContext(
    PlayerContext
  ) as PlayerContextI;

  return (
    <div className='flex w-full items-center justify-center'>
      <p
        data-testid='status-message'
        className={`w-full break-words text-center ${
          isError
            ? 'text-red-500'
            : isSuccess
              ? 'text-green-500'
              : 'text-primary'
        }`}
        role={isError ? 'alert' : isSuccess ? 'status' : 'info'}
        aria-live='polite'
        aria-atomic='true'
      >
        {message}
      </p>
    </div>
  );
};
export default MessageStatus;
