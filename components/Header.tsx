import React from 'react'
import { convertToCurrency } from '../helpers/formatting'

interface HeaderProps {
  title: string
  priceRewardData: IPriceRewardData
}

interface IPriceRewardData {
  price: string
  reward: string
}

const Header = ({ title, priceRewardData }: HeaderProps) => {

  return (
    <div>
      <div className='flex flex-row h-40 w-full p-4 w-100 items-center bg-yellow-200 rounded-b-xl'>
        <div className='title text-left'>
          {title}
        </div>
        <div className='price text-right flex-auto w-64 self-start'>
          <div className='number text-orange-500 font-bold text-xl'>
            {convertToCurrency(priceRewardData.price)}
          </div>
          {priceRewardData.reward &&
            <div>
              You get: {convertToCurrency(priceRewardData.reward)} $
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default Header
