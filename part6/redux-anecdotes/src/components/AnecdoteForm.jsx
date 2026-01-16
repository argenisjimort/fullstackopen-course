import { useDispatch } from 'react-redux'
import { setNotificationAndTime } from '../reducers/notificationReducer'

import { appendAnecdote } from '../reducers/anecdoteReducer'

// import { createAnecdote } from '../reducers/anecdoteReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()


    const handleCreation = async (e) => {
        e.preventDefault()
        
        // const response = await anecdoteService.createNew(e.target.anecdote.value)
        // console.log(response)
        // dispatch(createAnecdote(response.content))

        dispatch(appendAnecdote(e.target.anecdote.value))
        e.target.anecdote.value = ''
        dispatch(setNotificationAndTime('NEW ANNECDOTE CREATED', 5))
    }



    return (
        <div className="">
            <h2>create new</h2>
            <form onSubmit={handleCreation}>
                <div>
                    <input name='anecdote' />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm