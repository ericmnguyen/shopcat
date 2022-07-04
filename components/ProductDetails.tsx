import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import adImg from '../public/ad.jpeg'
import Image from 'next/image'
import Header from './Header'
import SelectButton from './SelectButton'

interface IOption {
  id: number
  name: string
  position: number
  product_id: number
  values: [string]
}

interface Item {
  body_html: string
  title: string
  options: [IOption]
  variants: [IVariant]
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

// Define mutation
const ADD_TO_CART = gql`
  mutation AddToCart($variantId: String!) {
    addToCart(variantId: $variantId)
  }
`

function ProductDetails({ data, variantRewardList }: ItemObj) {
  const { options, body_html, title, variants } = data
  const [addToCart, { data: result, loading, error }] = useMutation(ADD_TO_CART)

  // only run once when component is rendered
  const preSelectOptions = () => {
    let maxReward = {key: '', value: 0}
    // find the highest reward in variantRewards
    for(const key in variantRewardList) {
      maxReward = maxReward.value < variantRewardList[key] ? {key, value: variantRewardList[key]} : maxReward
    }

    // find the pre-selected variant
    const highestRewardVariant = variants.find((item: IVariant) => {
      return item.id === parseInt(maxReward.key)
    })
    return {0: highestRewardVariant?.option1, 1: highestRewardVariant?.option2}
  }
  
  const [selectOptions, setSelectOptions] = useState<any>(preSelectOptions())

  const displayPriceReward = () => {
    let filteredList: Array<IVariant> = variants
    if (Object.keys(selectOptions).length > 1) {
      for (const k in selectOptions) {
        filteredList = filteredList.filter(p => p.option1 === selectOptions[k] || p.option2 === selectOptions[k])
      }
      if (Object.keys(filteredList).length) {
        return { variantId: filteredList[0].id, price: filteredList[0].price, reward: variantRewardList[filteredList[0].id.toString()] }
      }
    }
    return { price: 'Variant Unavailable', reward: null }
  }

  const onClickOptions = (e: { target: { id: any }}, index: keyof object) => {
    let newObj: any = { ...selectOptions }
    newObj[index] = e.target.id
    setSelectOptions(newObj)
  }

  const addToStore = () => {
    addToCart({ variables: { variantId: displayPriceReward().variantId?.toString() } })
  }

  const submitBtnStyles = isNaN(displayPriceReward().price) || loading ? 'p-6 w-full bg-gray-400 text-white' : 'p-6 w-full bg-orange-400 text-white'
  const priceAndReward = displayPriceReward()

  return (
    <div className='container'>
      <Header title={title} priceRewardData={priceAndReward} />
      <div className='text-center pt-3'>
        <Image
          src={adImg}
          alt="product image"
          height={400}
          objectFit='cover'
          placeholder="blur" // blur-up while loading
        />
      </div>
      <h2 className='py-4 font-bold text-lg'>{title}</h2>
      <div className='text-gray-400 text-sm'>
        <div dangerouslySetInnerHTML={{ __html: body_html }} />
      </div>
      <div className='options'>
        {options.map((option, index) => {
          const type = option.values
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
        <button className={submitBtnStyles} onClick={addToStore} disabled={isNaN(displayPriceReward().price) || loading}>Add to My Store</button>
      </div>
    </div>
  )
}
export default ProductDetails
