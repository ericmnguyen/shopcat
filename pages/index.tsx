import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import ProductDetails from '../components/ProductDetails'
import { fetchAPI } from '../helpers/fetch.js'

interface ProductItem {
  id: number;
  name: string;
  data: string;
  variantRewards: string;
}

interface Response {
  data: ProductItem
}

const Home: NextPage = (props: Response) => {
  const { data, variantRewards }: ProductItem = props.data
  const productDetails = JSON.parse(data)
  const variantRewardList = JSON.parse(variantRewards)
  console.log('variantRewards', JSON.parse(variantRewards))
  console.log('data', JSON.parse(data))

  return (
    <div className="flex flex-col justify-center items-center font-mono">
      <Suspense fallback='Loading app...'>

        <Head>
          <title>Shopcat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <ProductDetails data={productDetails} variantRewardList={variantRewardList} />
        </div>
      </Suspense>
    </div>
  )
}

export default Home

// This function helps to fetch data at pre-render stage and the page is rendered with the data
// so that we don't need to implement loading behaviour.
export async function getStaticProps() {
  const response = await fetchAPI(GET_PRODUCT_ID);
  return {
    props: {
      data: response.data.productById
    },
  }
}

const gql = String.raw

const GET_PRODUCT_ID = gql`
query Products {
  productById(productId: 53) {
    id
    name
    data
    variantRewards
  }
}
`;
