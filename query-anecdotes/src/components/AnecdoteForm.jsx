import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests/requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      setNotification('Anecdote created successfully!')
    },
    onError: (error) => {
      setNotification(error.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      setNotification('Anecdote must have length 5 or more')
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
