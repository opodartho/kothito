$(document).ready(()=>{
  if($(".chat-application").length > 0) {

    let windowWidth = () => {
      return 1490
    }

    let windowHeight = () => {
      return 940
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
