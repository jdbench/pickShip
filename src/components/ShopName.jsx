
import { gql, useQuery } from "@apollo/client";

const SHOP_NAME_QUERY = gql`
query {
  shop { 
    name
  }
}
`;
export function ShopName(){
  const { loading, error, data } = useQuery(SHOP_NAME_QUERY);
  let i = 0;

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.error(error);
  }

  for (i in data){
    i = data.shop.name;
  }
  return(i)
}