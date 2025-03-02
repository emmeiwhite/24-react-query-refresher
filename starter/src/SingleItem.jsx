import { useMutation } from '@tanstack/react-query'
import customFetch from './utils'

const SingleItem = ({ item }) => {
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => customFetch.patch(`/${taskId}`, { isDone })
  })
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through'
        }}>
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => console.log('delete task')}>
        delete
      </button>
    </div>
  )
}
export default SingleItem
