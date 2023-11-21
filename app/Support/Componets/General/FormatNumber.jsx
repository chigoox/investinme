import React from 'react'
import { formatNumber } from '../../myCodes/Util'

function FormatNumber({ number, before }) {
  return (
    <div className={` trans-slow
    ${(number < 1000) ? 'text-white' :
        (number < 10000) ? 'text-lime-500' :
          (number < 100000) ? 'text-blue-500' :
            (number < 1000000) ? 'text-purple-500' :
              (number < 1000000000) ? ' text-orange-400' :
                (number < 10000000000) ? ' text-rose-700' : 'text-black'
      }`}>{before ? before : ''}{formatNumber(number)}</div>
  )
}

export default FormatNumber