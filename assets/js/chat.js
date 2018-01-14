let $users = $("#users-list > a")

let hightlightActiveChat = ($user) => {
  $("#users-list > a").addClass("border-0")
    .removeClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
  $user.removeClass("border-0")
    .addClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2")
}

$users.on("click", event => {
  let $user = $(event.target).parents('a')
  hightlightActiveChat($user)
})

$(document).ready(() => {
  let selectedRoom = window.location.hash.substr(1).split("=")[1]
  if(selectedRoom !== undefined) {
    $users.each((index) => {
      let $user = $($users[index])
      if($user.data('room') === selectedRoom) {
        hightlightActiveChat($user)
      }
    })
  }
})
