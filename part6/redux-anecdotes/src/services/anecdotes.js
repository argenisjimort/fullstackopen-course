const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) throw new Error('could not fetch notes')
    return response.json() // await at return its optional, really
}


const createNew = async (content) => {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 }),
    }

    const response = await fetch(baseUrl, config)
    if (!response.ok) throw new Error('FAILED to CREATE ANECDOTE');
    
    return response.json()
}

const updateOne  = async (updatedAnecdote) => {
    const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote),
    }

    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, config)

    if (!response.ok) throw new Error('COULD NOT UPDATE ANECDOTE');
    
    // const data =  await response.json()
    // console.log(data)
    // return data

    return response.json()

}


const getById = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`)
    if (!response.ok) throw new Error('COULD NOT FIND ANECDOTE');
    return response.json()
}


export default { getAll, createNew, updateOne, getById }