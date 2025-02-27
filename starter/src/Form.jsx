import { useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import customFetch from './utils'

const Form = ({ items, setItems }) => {
  const [newItemName, setNewItemName] = useState('')

  // For create, delete, edit we use useMutation hook
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: newTitle => customFetch.post('/', { title: newTitle }),
    onSuccess: () => {},
    onError: error => {
      toast.error(error.response.data.msg) // the server error
    }
  })

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
