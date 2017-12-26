// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix"

let $chatForm = $("#chat-input");

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:init", {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("user:" + window.user, payload => {
  let subtopic = payload.subtopic
  let privateChannel = socket.channel("chat:"+subtopic, {})

  privateChannel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  privateChannel.on("chat:new", payload => {
    console.log(payload)
  })

  $chatForm.on("keypress", event => {
    if(event.keyCode == 13) {
      privateChannel.push("chat:new", {message: $chatForm.val()})
    }
  })
})
let $users = $("#users-list > a > .media-body")

let hightlightActiveChat = ($user) => {
  $("#users-list > a").addClass("border-0")
    .removeClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
  $user.removeClass("border-0")
    .addClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
}

$users.on("click", event => {
  let $user = $(event.target).parents('a')
  let user_id = $user.data('user')
  channel.push("chat:start", {fellow: user_id})
  hightlightActiveChat($user)
})

export default socket
