import { useSelector, useDispatch } from 'react-redux'
import { vote as addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if ( state.filter === '' ) {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
  
    const vote = (id) => {
      dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`))
      dispatch(addVote(id))
    }
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)


    return (
      <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
      </div>
    )
}

export default AnecdoteList