import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, getOneAnecdote, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import {useNotification} from './NotificationContext'

const App = () => {

  const setNotification = useNotification()


  const queryClient = useQueryClient()
  const {notificationDispatch} = useContext(NotificationContext)


  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})
  })



  const handleVote = async (id) => {
    console.log('vote')
    const result = await getOneAnecdote(id)
    //console.log(result)

    if (result.isError) console.log('error')
    
    voteAnecdoteMutation.mutate({...result, votes: result.votes + 1 })
    //notificationDispatch({type: 'SET_MESSAGE', payload: `VOTED ANECDOTE ${result.content}`})
    setNotification( `VOTED ANECDOTE ${result.content}`)
  }










  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
    //retry: 3 //(3 is the default), you can also set to false
  })



  const anecdotes = result.data
  //{
  //     content: 'If it hurts, do it more often',
  //     id: '47145',
  //     votes: 0,
  //}

  //I discovered that this is obligaroty, bc even if the result loads ins less than a second
  //it crashes if it tries to .map anecdotes and its undefined (even for a split second) it crashes
  //and wont reload fine even after anecdotes has the right info
  if (result.isLoading) return <div> LOADING DATA </div>
  ///necessary

  if (result.isError) return <div> ERROR LOADING DATA: {result.error.message} </div>

  if (result.data) return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
