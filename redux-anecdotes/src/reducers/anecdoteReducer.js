import { createSlice } from '@reduxjs/toolkit'


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
    },
    createAnecdote(state, action) {
      return state.concat({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    },
    appendAnecdote(state, action) {
      state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})



export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer