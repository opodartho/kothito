import {Socket} from "phoenix"

let isMessageOwned = (payload) => {
  let currentUser = $("#chats").data("current-user")
  return currentUser === payload.user.id
}

let isLastMessageBySameUser = (payload) => {
  let $lastChat = $("#chats .chat:last")
  return $lastChat.data('user') === payload.user.id
}

let messageWithoutAvatar = (payload) => {
  return `
    <div class="chat-content">
      <p>${payload.body}</p>
    </div>
  `
}

let messageWithAvatar = (payload) => {
  return `
    <div class="chat ${!isMessageOwned(payload) ? 'chat-left' : ''}"
      data-user="${payload.user.id}">
      <div class="chat-avatar">
        <a class="avatar" href="javascript:void(0);" data-placement="left">
          <img src="${payload.user.avatar}" />
        </a>
      </div>
      <div class="chat-body">
        ${messageWithoutAvatar(payload)}
      </div>
    </div>
  `
}

let displayMessage = (payload) => {
  let $chats = $("#chats")
  if(isLastMessageBySameUser(payload)) {
    let $lastChatBody = $("#chats .chat:last .chat-body")
    $lastChatBody.append(messageWithoutAvatar(payload))
  } else {
    $chats.append(messageWithAvatar(payload))
  }
}

let $chatForm = $("#chat-input");

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel

let connectChannel = (roomId) => {
  console.log(roomId)
  channel = socket.channel("rooms:" + roomId, {})
  channel.join()
    .receive("ok", resp => { console.log("Joined room successfully", resp) })
    .receive("error", resp => { console.log("Unable to join the room", resp) })

  channel.on("message:created", payload => {
    displayMessage(payload)
  })
}

$chatForm.on("keypress", event => {
  if(event.keyCode == 13 && $chatForm.val() !== '') {
    channel.push("message:new", {body: $chatForm.val()})
    $chatForm.val('')
  }
})

let $users = $("#users-list > a")

let hightlightActiveChat = ($user) => {
  $("#users-list > a").addClass("border-0")
    .removeClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
  $user.removeClass("border-0")
    .addClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
}

$users.on("click", event => {
  let $user = $(event.target).parents('a')
  let roomId = $user.data('room')
  connectChannel(roomId)
  hightlightActiveChat($user)
})

$(document).ready(() => {
  let selectedRoom = window.location.hash.substr(1).split("=")[1]
  if(selectedRoom !== undefined) {
    $users.each((index) => {
      let $user = $($users[index])
      let roomId = $user.data('room')
      if(roomId === selectedRoom) {
        connectChannel(roomId)
        hightlightActiveChat($user)
      }
    })
  }
})
