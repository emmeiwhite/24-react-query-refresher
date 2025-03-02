import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'
import { toast } from 'react-toastify'

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()

  // A)  Edit task (checkbox)
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

  // B) Delete Task
  const { mutate: deleteTask } = useMutation({
    mutationFn: taskId => customFetch.delete(`/${taskId}`),
    onSuccess: () => {
      // 1. Invalidate querykey
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      // 2. success pop-up

      toast.success('Item deleted successfully!')
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
        onClick={() => deleteTask(item.id)}>
        delete
      </button>
    </div>
  )
}
export default SingleItem
