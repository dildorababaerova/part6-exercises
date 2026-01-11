import { useContext } from "react"
import NotificationContext from "../NotificationContext"
import { addNotification, clearNotification } from "../NotificationContext"

const Anecdote = ({anecdote, handleVote}) => {
    const {notificationDispatch} = useContext(NotificationContext)
    const handleClick = () => {
    handleVote(anecdote)
    notificationDispatch(addNotification(`You voted ${anecdote.content}`))
    setTimeout(()=>{
        notificationDispatch(clearNotification())
    }, 5000)
    }
    return (
        <div>
        <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const Anecdotes = ({anecdotes, handleVote}) => {
     const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes-a.votes)
    return (
        <div>
            {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          < Anecdote 
           anecdote = {anecdote}
           handleVote={handleVote}
           />
          
        </div>
      ))}
        </div>
    )
}

export default Anecdotes