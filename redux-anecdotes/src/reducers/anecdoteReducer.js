import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content, getId())
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      setAnecdotes(anecdotes)
    )
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToUpdate = anecdotes.find(a => a.id === id)

    if (!anecdoteToUpdate) {
      console.error(`Anecdote with id ${id} not found`)
      return
    }

    const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
    
    const savedAnecdote = await anecdoteService.update(updatedAnecdote)
    dispatch(setAnecdotes(anecdotes.map(a => a.id !== id ? a : savedAnecdote)))
  }
}





export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer