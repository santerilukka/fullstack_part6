import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter = event.target.value
        dispatch({ type: 'SET_FILTER', filter })
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter: <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter