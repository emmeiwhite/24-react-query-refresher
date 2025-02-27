import { useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import customFetch from './utils'

const Form = ({ items, setItems }) => {
  const [newItemName, setNewItemName] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const result = useMutation({
    mutationFn: () => customFetch.post('')
  })

  console.log(result)
  const handleSubmit = e => {
    e.preventDefault()

    if (!newItemName) return

    const newItemObj = {
      id: nanoid(),
      title: newItemName,
      isDone: false
    }

    // Make a post request to the server

    setItems([...items, newItemObj]) // updating global state here in the component
    setNewItemName('')

    // Show success toast
    toast.success('Task added successfully!')

    // Disable button for 3 seconds
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled(false)
    }, 3000)
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
          disabled={isDisabled}>
          {isDisabled ? 'wait ...' : 'add task'}
        </button>
      </div>
    </form>
  )
}
export default Form
