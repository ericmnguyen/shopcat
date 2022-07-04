import type { NextPage } from 'next'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { Suspense } from 'react'
import ProductDetails from '../components/ProductDetails'
import { fetchAPI } from '../helpers/fetch.js'

interface ProductItem {
  id: number
  name: string
  data: string
  variantRewards: string
}

interface Response {
  data: ProductItem
}

const client = new ApolloClient({
  uri: 'https://dev-creator-backoffice-api.shopcat.click/graphql',
  cache: new InMemoryCache(),
})

const Home: NextPage = (props: Response) => {
  const { data, variantRewards }: ProductItem = props.data
  const productDetails = JSON.parse(data)
  const variantRewardList = JSON.parse(variantRewards)

  return (
    <ApolloProvider client={client}>
      <Suspense fallback='Loading app...'>
        <div className="flex flex-col justify-center items-center font-mono">
          <Head>
            <title>Shopcat</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div>
            <ProductDetails data={productDetails} variantRewardList={variantRewardList} />
          </div>
        </div>
      </Suspense>
    </ApolloProvider>

  )
}

export default Home

// This function helps to fetch data at pre-render stage and the page is rendered with the data
// so that we don't need to implement loading behaviour.
export async function getStaticProps() {
  const response = await fetchAPI(GET_PRODUCT_ID)
  return {
    props: {
      data: response.data.productById
    },
  }
}

const Gql = String.raw

const GET_PRODUCT_ID = Gql`
query Products {
  productById(productId: 53) {
    id
    name
    data
    variantRewards
  }
}
`
