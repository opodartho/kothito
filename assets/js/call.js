$(document).ready(()=>{
  if($(".chat-application").length > 0) {

    let windowWidth = () => {
      if(screen.width > 1490) {
        return 1490
      } else if (screen.width >= 1366) {
        return 1366
      }
    }

    let windowHeight = () => {
      if(screen.height > 940) {
        return 940
      } else if (screen.height >= 768) {
        return 768
      }
    }

    let windowTopPos = () => {
      return (screen.height - windowHeight()) / 2
    }

    let windowLeftPos = () => {
      return (screen.width - windowWidth()) / 2
    }

    let callWindowOptions = () => {
      return `
        width=${windowWidth()},
        height=${windowHeight()},
        top=${ windowTopPos() },
        left=${ windowLeftPos() },
        toolbar=0,
        location=0,
        menubar=0
      `
    }

    $("#call").click((event)=> {
      window.open(
        '/call/' + $(event.target).data('room'),
        '_blank',
        callWindowOptions()
      );
    })
  }
})
