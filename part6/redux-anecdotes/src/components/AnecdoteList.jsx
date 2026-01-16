import { useDispatch, useSelector } from "react-redux"
import { VoteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationAndTime } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        const filteredAnecdotes = state.anecdotes.filter(
            anecdote => anecdote.content.toUpperCase().includes( state.filter.toUpperCase() )
        )

        return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
    })



    const vote = (id, content) => {
        dispatch(VoteForAnecdote(id))

        
        dispatch(setNotificationAndTime(`YOU VOTED "${content}"`, 5))
    }


    return (
        <div className="">
            {
                anecdotes.map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default AnecdoteList