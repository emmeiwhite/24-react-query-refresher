import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
const app = express()
import morgan from 'morgan'

// Our taskList
let taskList = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false }
]

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(cors())

// To parse JSON
app.use(express.json())

app.get('/', (req, res) => {
  const { passion } = req?.query || 'Never Give up'

  res.send(`<h1>Welcome to Task Manager Backend ${passion}</h1>`)
})

app.get('/:main', (req, res) => {
  const { main } = req?.params

  res.send(`<h1>Goal is to be : ${main} </h1>`)
})

// Send the tasks from BE
app.get('/api/tasks', (req, res) => {
  res.json({ taskList })
})

// Create the resource & add it into the taskList in DB( Currently we are hard-coding it only)
app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  if (!title) {
    res.status(404).json({ success: false, msg: 'please provide a title' })
    return
  }

  const newTask = { id: nanoid(), title, isDone: false }

  const updatedTasks = [...taskList, newTask]
  res.status(200).json({ success: true, taskList: updatedTasks })
})

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  const { isDone } = req.body

  taskList = taskList.map(task => {
    if (task.id === id) {
      return { ...task, isDone }
    }
    return task
  })

  res.json({ msg: 'task updated' })
})

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  taskList = taskList.filter(task => task.id !== id)

  res.json({ msg: 'task removed' })
})

app.use((req, res) => res.status(404).send('Route does not exist'))

const port = process.env.PORT || 3000

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startApp()
