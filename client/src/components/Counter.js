import React ,{memo} from 'react'

const Counter = ({unit, number}) => {
  return (
    <div className='w-[30%] h-[60px] flex items-center justify-center bg-gray-100 rounded-sm flex-col'>
        <span className='text-[18px] text-gray-800'>{number}</span>
        <span className='text-sm text-gray-700'>{unit} </span>

    </div>
  )
}

export default memo(Counter)