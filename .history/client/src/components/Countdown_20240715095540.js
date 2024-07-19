import React,{memo} from 'react';

const Countdown = ({unit, number}) => {
    return (
        <div className='w-[30%] h-[60px] flex justify-center items-center bg-gray-100 rounded-md'>
          <span > {number}</span>
          <span className = 'text-xs '> {unit}</span>
        </div>
    );
};

export default memo (Countdown);
