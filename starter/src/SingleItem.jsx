import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'
import { toast } from 'react-toastify'

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      // 1. invalidate the queryKey
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      // 2. show a success pop-up
      toast.success('Successfully edited the resource')
    },
    onError: error => {
      toast.error(error.response.data.msg)
    }
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
