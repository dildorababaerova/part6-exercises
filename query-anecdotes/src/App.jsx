import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateVote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useContext } from "react"
import NotificationContext from "./NotificationContext"
import { addNotification, clearNotification } from "./NotificationContext"
const App = () => {
  const queryClient = useQueryClient()
  const {notificationDispatch} = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: (newAnecdote) =>{
      const anecdotes= queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) =>{
      notificationDispatch(addNotification(error.message))
      setTimeout(()=>{
        notificationDispatch(clearNotification())
      }, 5000)
    }
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateVote, 
    onSuccess: (updated) => {
      const anecdotes= queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes= anecdotes.map(a => a.id === updated.id? {...a, votes:updated.votes}: a)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes )
    }
  })


  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
  }

  const { isPending, isError, data:anecdotes, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify({ isPending, isError, anecdotes, error })))

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>{error.message}</span>
  }
 
 
  

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm  newAnecdoteMutation={newAnecdoteMutation}/>
      < AnecdoteList 
      anecdotes = {anecdotes}
      handleVote = {handleVote}
      /> 
    </div>
  )
}

export default App
