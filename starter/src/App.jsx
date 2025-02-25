import { ToastContainer } from 'react-toastify'
import Form from './Form'
import Items from './Items'
import { useState } from 'react'

import { nanoid } from 'nanoid'

const defaultItems = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false }
]

const App = () => {
  const [items, setItems] = useState(defaultItems)
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form
        items={items}
        setItems={setItems}
      />
      <Items />
    </section>
  )
}
export default App
