import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewAnecdote } from '../requests'
import { useNotification } from "../NotificationContext"


const AnecdoteForm = () => {
  const setNotification = useNotification()
  const queryClient = useQueryClient()


  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']}),
    onError: (error) => setNotification(error.message)
  })
  
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
