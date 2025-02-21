import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const defaultItems = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false }
]

// Create Context
const TodoContext = createContext()

// Provider Component
function TodoContextProvider({ children }) {
  const [items, setItems] = useState(defaultItems)

  // global state & setters
  const value = {
    items,
    setItems
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// Custom hook for easy access
const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider')
  }
  return context
}

export { TodoContextProvider, useTodoContext }
