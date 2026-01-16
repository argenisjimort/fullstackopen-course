const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const result = await fetch(baseUrl)
    if(!result.ok) throw new Error("COULD NOT FETCH NOTES");
    return result.json()
    
}


export const createNewAnecdote = async (content = '') => {
    //if content is missing, it will default to an empty string
    if (content.length < 5) throw new Error(`CONTENT LENGHT NEEDS to be at least 5, and it is: ${content?.length || 0}`);
    // if content is too short, it will throw an error


    const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, votes: 0})
    }

    console.log(config)


    const result = await fetch(baseUrl, config)

    if(!result.ok) throw new Error("COULD NOT CREATE NEW NOTE, server error, (i Think)");
    return result.json()
    
}



export const updateAnecdote = async (anecdote) => {
    const config = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    const result = await fetch(`${baseUrl}/${anecdote.id}`, config)
    if(!result.ok) throw new Error("COULD NOT UPDATE ANECDOTE");
    return result.json()
}


export const getOneAnecdote = async (id) => {
    const result = await fetch(`${baseUrl}/${id}`)
    if (!result.ok) throw new Error("COULD NOT FIND ANECDOTE");
    
    //console.log(data)
    return result.json()
    
}