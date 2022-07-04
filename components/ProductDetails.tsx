import React, { useState, useMemo } from 'react'
import adImg from '../public/ad.jpeg'
import Image from 'next/image'
import Header from './Header'
import SelectButton from './SelectButton';

interface IOption {
  id: number;
  name: string;
  position: number;
  product_id: number;
  values: [string];
}

interface Item {
  body_html: string;
  title: string;
  options: [IOption];
  variants: [IVariant];
}
interface ItemObj {
  data: Item
  variantRewardList: any
}

interface IVariant {
  option1: string
  id: number
  option2: string
  option3: string
  price: string
  title: string
}

function ProductDetails({ data, variantRewardList }: ItemObj) {
  const { options, body_html, title, variants } = data

  // only run once when component is rendered
  const preSelectOptions = () => {
    let maxReward = {key: '', value: 0}
    // find the highest reward in variantRewards
    for(const key in variantRewardList) {
      maxReward = maxReward.value < variantRewardList[key] ? {key, value: variantRewardList[key]} : maxReward
    }

    // find the pre-selected variant
    const highestRewardVariant = variants.find((item: IVariant) => {
      return item.id === parseInt(maxReward.key);
    });
    return {0: highestRewardVariant?.option1, 1: highestRewardVariant?.option2};
  }
  
  const [selectOptions, setSelectOptions] = useState<any>(preSelectOptions())

  const displayPriceReward = () => {
    let filteredList: Array<IVariant> = variants
    if (Object.keys(selectOptions).length > 1) {
      for (const k in selectOptions) {
        filteredList = filteredList.filter(p => p.option1 === selectOptions[k] || p.option2 === selectOptions[k])
      }
      if (Object.keys(filteredList).length) {
        return { price: filteredList[0].price, reward: variantRewardList[filteredList[0].id.toString()] }
      }
    }
    return { price: 'Variant Unavailable', reward: null }
  }

  const onClickOptions = (e: { target: { id: any }; }, index: keyof object) => {
    let newObj: any = { ...selectOptions };
    newObj[index] = e.target.id;
    setSelectOptions(newObj)
  }

  return (
    <div className='container'>
      <Header title={title} priceRewardData={displayPriceReward()} />
      <div className='text-center pt-3'>
        <Image
          src={adImg}
          alt="product image"
          height={400}
          objectFit='cover'
          // blurDataURL="data:..." automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <h2 className='py-4 font-bold text-lg'>{title}</h2>
      <div className='text-gray-400 text-sm'>
        <div dangerouslySetInnerHTML={{ __html: body_html }} />
      </div>
      <div className='options'>
        {options.map((option, index) => {
          const type = option.values;
          return (
            <div className='my-6 p-2'>
              <div key={index} className='text-gray-400 mb-2'>{option.name}</div>
              <div className='select-size grid grid-cols-3 grid-rows-1 gap-4 text-center'>
                {type.map(item => <div><SelectButton onClick={(e) => onClickOptions(e, index)} id={item} value={selectOptions[index]}>{item}</SelectButton></div>)}
              </div>
            </div>
          )
        })}
      </div>
      <div className='add-to-store'>
        <button className='p-6 w-full bg-orange-400 text-white'>Add to My Store</button>
      </div>
    </div>
  )
}
export default ProductDetails
