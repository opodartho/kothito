import {Socket} from "phoenix"

if($(".call-application").length > 0) {
  let peerConnection
  let localStream
  let remoteStream
  let localVideo = document.getElementById("localVideo")
  let remoteVideo = document.getElementById("remoteVideo")
  let constraints = {
    audio: false,
    video: true
  }

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
      if(payload.user === window.user) return
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(payload.sdp).
          then(() => {
            if(payload.sdp.type == "offer") {
              peerconnection.
                createAnswer().
                then(createdDescription)
            }
          })
      )
    })

    channel.on("signal:ice", payload => {
      if(payload.user === window.user) return
      peerConnection.addIceCandidate(
        new RTCIceCandidate(payload.ice)
      )
    })
  }

  connectChannel(window.roomId)
  // end websocket

  let peerConnectionConfig = {
    "iceServers": [
      {
        "urls": [
          "stun:stun.l.google.com:19302"
        ]
      }
    ],
    "iceTransportPolicy":"all",
    "iceCandidatePoolSize":"3"
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
    let videoTracks = localStream.getVideoTracks()
    if(videoTracks.length > 0) {
      console.log("Using video defice: " + videoTracks[0].label)
    }

    peerConnection = new RTCPeerConnection(peerConnectionConfig)

    peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0]
    }

    peerConnection.onicecandidate = (event) => {
      if(event.candidate != null) {
        channel.push("signal:ice", JSON.stringify(event.candidate))
      }
    }
    peerConnection.oniceconnectionstatechange = (event) => {
      // console.log(event)
    }

    if(isCaller) {
      peerConnection.
        createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true}).
        then(createdDescription)
    }
  }

  let errorMsg = (msg, error) => {
    console.log(msg, error)
  }

  let handleSuccess = (stream) => {
    let videoTracks = stream.getVideoTracks()
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);

    stream.oninactive = () => {
      console.log('Stream inactive')
    }
    localStream = localVideo.srcObject = stream
  }

  let handleError = (error) => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg('getUserMedia error: ' + error.name, error);
  }

  navigator.
    mediaDevices.
    getUserMedia(constraints).
    then(handleSuccess).
    catch(handleError)
}

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
