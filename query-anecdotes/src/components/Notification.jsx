import { useContext } from "react"
import NoificationContext from "../NotificationContext"

const Notification = () => {
  const {notification} = useContext(NoificationContext)
    
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    background: "grey",
    color: "green",
    opacity: notification ? 1 : 0,         // показываем/скрываем
    transform: notification ? "translateY(0)" : "translateY(-10px)",
    transition: "opacity 0.5s ease, transform 0.3s ease",     // плавный переход
    height: 30,                             // фиксированная высота для плавности
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
