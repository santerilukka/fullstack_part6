import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if ( state.filter === '' ) {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
  
    const vote = (id) => {
      dispatch(addVote(id))
    }
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)


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