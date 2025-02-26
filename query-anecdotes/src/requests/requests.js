import axios from "axios";

export const getAnecdotes = async () => {
    const response = await axios.get("http://localhost:3001/anecdotes");
    return response.data;
}

export const createAnecdote = async (content) => {
    const anecdote = { content, votes: 0 };
    const response = await axios.post("http://localhost:3001/anecdotes", anecdote);
    return response.data;
}

export const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote);
    return response.data;
}