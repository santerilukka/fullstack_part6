import { useSelector, useDispatch } from 'react-redux'
import { vote as addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if ( state.filter === '' ) {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
  
    const vote = async (anecdote) => {
      dispatch(addVote(anecdote.id))
      dispatch(showNotification(`You voted for '${anecdote.content}'`))
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
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
      </div>
    )
}

export default AnecdoteList