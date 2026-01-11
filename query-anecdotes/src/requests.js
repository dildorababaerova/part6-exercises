const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
    try {
        const response = await fetch(baseUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return await response.json()
        } catch (error) {
            throw new Error('Anecdote server is not available due to problems in server.') 
        }
    }
  
export const createAnecdote = async (anecdote) => {
  const options = {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(anecdote)
  }
      const response = await fetch(baseUrl, options)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      return await response.json()
    }

export const updateVote = async (updatedVote) => {
  const options = {
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(updatedVote)
  }
      const response = await fetch(`${baseUrl}/${updatedVote.id}`, options)
      if (!response.ok) {
        throw new Error('Failed to update votes')
      }
      return await response.json()
    }
  
