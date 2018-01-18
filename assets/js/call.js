import {Socket} from "phoenix"

if($(".call-application").length > 0) {
  let peerConnection
  let localStream
  let remoteStream
  let localVideo = document.getElementById("localVideo")
  let remoteVideo = document.getElementById("remoteVideo")
  let constraints = {
    audio: true,
    video: {width: {exact: 1280}, height: {exact: 720}}
  }

  let initiator = window.location.hash.substr(1).split("=")[1]
  // websocket for calling

  let socket = new Socket("/socket", {params: {token: window.userToken}})

  socket.connect()

  let channel

  let connectChannel = (roomId) => {
    channel = socket.channel("calls:" + roomId, {})
    channel.join()
      .receive("ok", resp => {
        console.log("Joined call channel successfully") 
      })
      .receive(
        "error",
        resp => {
          console.log("Unable to join the call room", resp)
        }
      )

    channel.on("signal:sdp", payload => {
      if(!peerConnection) call(false)
      if(payload.user === window.user) return

      let sdp = JSON.parse(payload.sdp)

      peerConnection.setRemoteDescription(
        new RTCSessionDescription(sdp)
      ).then(() => {
        if(sdp.type == "offer") {
          peerConnection.
            createAnswer().
            then(createdDescription)
        }
      })
    })

    channel.on("signal:ice", payload => {
      if(!peerConnection) call(false)
      if(payload.user === window.user) return
      peerConnection.addIceCandidate(
        new RTCIceCandidate(JSON.parse(payload.ice))
      ).catch((error)=> console.log("Ice: ", error))
    })

    channel.on("call:start", payload => {
      if(initiator === "true") {
        console.log("starting webrtc")
        call(true)
      }
    })
  }

  // end websocket

  let peerConnectionConfig = {
    "iceServers": [
      {
        "urls": "stun:stun.l.google.com:19302",
        "urls": "stun:stun.services.mozilla.com"
      }
    ]
  }

  let createdDescription = (description) => {
    peerConnection.
      setLocalDescription(description).
      then(() => {
        console.log("Sending description to other peer")
        channel.push(
          "signal:sdp",
          JSON.stringify(peerConnection.localDescription)
        )
      })
  }

  let call = (isCaller) => {
    console.log("calling")
    let videoTracks = localStream.getVideoTracks()
    if(videoTracks.length > 0) {
      console.log("Using video defice: " + videoTracks[0].label)
    }

    peerConnection = new RTCPeerConnection(peerConnectionConfig)

    peerConnection.onicecandidate = (event) => {
      if(event.candidate != null) {
        channel.push("signal:ice", JSON.stringify(event.candidate))
      }
    }

    peerConnection.ontrack = (event) => {
      console.log("streaming")
      remoteVideo.srcObject = event.streams[0]
    }

    peerConnection.oniceconnectionstatechange = (event) => {
      // console.log(event)
    }

    peerConnection.addStream(localStream)

    if(isCaller) {
      peerConnection.
        createOffer().
        then(createdDescription)
    }
  }

  let errorMsg = (msg, _error) => {
    let $alert = $("#alert")
    $alert.html(msg).removeClass('hidden')
    setTimeout(() => {
      $alert.addClass('hidden')
    }, 15000)
  }

  let handleSuccess = (stream) => {
    let videoTracks = stream.getVideoTracks()
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);

    stream.oninactive = () => {
      console.log('Stream inactive')
    }
    localStream = stream
    localVideo.srcObject = stream
    if(initiator == "false") {
      channel.push("call:initiate", {})
    }
  }

  let handleError = (error) => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.')
    } else if (error.name === 'NotAllowedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for video chat to work.')
    } else {
      errorMsg('getUserMedia error: ' + error.name, error);
    }
  }

  navigator.
    mediaDevices.
    getUserMedia(constraints).
    then(handleSuccess).
    catch(handleError)

  connectChannel(window.roomId)
  // send calling signal
  if(initiator === "true") {
    window.userChannel.push("calling", {room: window.roomId, user: window.user})
  }


  // call controls
  let toggleLocalVideoState = () => {
    localVideo.srcObject.getTracks().forEach(t => t.enabled = !t.enabled)
  }

  let toggleRemoteVideoState = () => {
    remoteVideo.srcObject.getTracks().forEach(t => t.enabled = !t.enabled)
  }

  $(document).ready(() => {
    $("#mic").click((event) => {
      $(event.target).find('i').toggleClass('ft-mic ft-mic-off')
    })

    $("#video").click((event) => {
      toggleLocalVideoState()
      $(event.target).find('i').toggleClass('ft-video ft-video-off')
    })

    $("#hangup").click((event) => {
      if(!peerConnection) {
        errorMsg("You are not on call with anyone")
      } else {
        peerConnection.close()
      }
    })
  })
}

$(document).ready(()=>{
  if($(".chat-application").length > 0) {

    let windowWidth = () => {
      if(screen.width >= 1920) {
        return 1490
      } else if (screen.width >= 1366) {
        return 1366
      }
    }

    let windowHeight = () => {
      if(screen.height >=1080) {
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

    let openCallWindow = (event, initiator) => {
      let room = $(event.target).data('room')
      if(room === undefined) {
        room = $(event.target).parent('a').data('room')
      }
      window.open(
        `/call/${room}#initiator=${initiator}`,
        '_blank',
        callWindowOptions()
      );
    }

    $(document).on("click", "#receive", (event) => {
      openCallWindow(event, false)
      Modalize.modal("hide")
    })

    $("#call").click((event)=> {
      openCallWindow(event, true)
    })
  }
})
