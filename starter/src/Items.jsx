import { useQuery } from '@tanstack/react-query'
import SingleItem from './SingleItem'
import customFetch from './utils'

const Items = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => customFetch.get('/')
  })

  console.log(data)

  if (isError) return <p>Error fetching data!</p>

  if (isLoading) return <p>Loading ...</p>

  return (
    <div className="items">
      {data?.data?.taskList.map(item => {
        return (
          <SingleItem
            key={item.id}
            item={item}
          />
        )
      })}
    </div>
  )
}
export default Items
