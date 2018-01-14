// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix"

let $chatForm = $("#chat-input");

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

// let channel = socket.channel("chat:init", {})

// channel.join()
//   .receive("ok", resp => { console.log("Joined successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join", resp) })

// channel.on("user:" + window.user, payload => {
//   let subtopic = payload.subtopic
//   let privateChannel = socket.channel("chat:"+subtopic, {})

//   privateChannel.join()
//     .receive("ok", resp => { console.log("Joined successfully", resp) })
//     .receive("error", resp => { console.log("Unable to join", resp) })

//   privateChannel.on("chat:new", payload => {
//     console.log(payload)
//   })

//   $chatForm.on("keypress", event => {
//     if(event.keyCode == 13) {
//       privateChannel.push("chat:new", {message: $chatForm.val()})
//     }
//   })
// })

export default socket
