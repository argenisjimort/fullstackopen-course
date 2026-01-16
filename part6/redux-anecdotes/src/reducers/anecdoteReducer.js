import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)


const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVoteToAnecdote (state, action) {
      //console.log(action.payload)
      const anecdoteToEdit = state.find( anecdote => anecdote.id === action.payload.id )
      anecdoteToEdit.votes = anecdoteToEdit.votes + 1
    },

    createAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, addVoteToAnecdote } = anecdotesSlice.actions //you get the actions of the reducer created byb the slice

export const initializeAnectodes = () => { //create an 'action creator' that returns a function
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll() //the function does the asyn operation itself
    dispatch(setAnecdotes(anecdotes)) //then dispatches to the action from the slice
  }
}


export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.createNew(content)
    dispatch(createAnecdote(response))
  }
}


export const VoteForAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getById(id)
    //anecdote.votes = anecdote.votes + 1
    const response = await anecdoteService.updateOne({ ...anecdote, votes: anecdote.votes + 1 })
    // console.log(response)
    dispatch(addVoteToAnecdote(response))

  }
}


export default anecdotesSlice.reducer