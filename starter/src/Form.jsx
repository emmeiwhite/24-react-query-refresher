import { useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'

const Form = ({ items, setItems }) => {
  const [newItemName, setNewItemName] = useState('')

  const queryClient = useQueryClient()

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: item => customFetch.post('/', { title: item }),
    onSuccess: () => {
      // 1. invalidate the queryKey: To make sure ReactQuery re-fetches the updated state
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      // 2. toast success message
      toast.success('item added successfully!')
      // 3. reset the newItemName (the input field)
      setNewItemName('')
    },
    onError: error => {
      toast.error(error.response.data.msg)
    }
  })

  // // Accessing the queryClient with useQueryClient
  // const queryClient = useQueryClient()

  // // For create, delete, edit we use useMutation hook
  // const { mutate: createTask, isLoading } = useMutation({
  //   mutationFn: newTitle => customFetch.post('/', { title: newTitle }),
  //   onSuccess: () => {
  //     // 1. invalidates the tasks which will trigger a new request to fetch the updated items in the background to keep FE & BE in sync
  //     queryClient.invalidateQueries({
  //       queryKey: ['tasks']
  //     })

  //     // 2. toast for success message
  //     toast.success('Item added successfully!')

  //     // 3. reset the title
  //     setNewItemName('')
  //   },
  //   onError: error => {
  //     toast.error(error.response.data.msg) // the server error
  //   }
  // })

  const handleSubmit = e => {
    e.preventDefault()

    createTask(newItemName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={event => setNewItemName(event.target.value)}
        />
        <button
          type="submit"
          className="btn"
          disabled={isLoading}>
          {isLoading ? 'wait ...' : 'add task'}
        </button>
      </div>
    </form>
  )
}
export default Form
