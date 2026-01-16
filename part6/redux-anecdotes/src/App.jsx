import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeAnectodes } from './reducers/anecdoteReducer'


//import { setAnecdotes } from './reducers/anecdoteReducer'
//import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()

  // useEffect( () => { //fyi, you can also use async await here
  //   anecdoteService.getAll().then( anecdotes => dispatch(setAnecdotes(anecdotes)) )
  // }, [dispatch] ) //but the examples given use .then. so I use it here too

  useEffect( () => {
    dispatch(initializeAnectodes())
  } )



  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
