import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("users", {})
channel.join()
  .receive("ok", resp => {
    console.log("Joined users channel successfully") 
  })
  .receive(
    "error",
    resp => {
      console.log("Unable to join the users room", resp)
    }
  )

channel.on("call:" + window.user, payload => {
  if(payload.initiator == window.user) return
  Modalize.modal(payload.url)
})

window.userChannel = channel
