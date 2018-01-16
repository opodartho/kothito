if($(".call-application").length > 0) {
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

  let peerConnection
  let localStream
  let remoteStream
  let localVideo = document.getElementById("remoteVideo")
  let constraints = {
    audio: false,
    video: true
  }

  let createdDescription = (description) => {
    peerConnection.
      setLocalDescription(description).
      then(() => {
        console.log("Sending description to other peer")
      })
  }

  let call = () => {
    let videoTracks = localStream.getVideoTracks()
    if(videoTracks.length > 0) {
      console.log("Using video defice: " + videoTracks[0].label)
    }

    peerConnection = new RTCPeerConnection(peerConnectionConfig)
    peerConnection.onicecandidate = (event) => {
      if(event.candidate != null) {
        console.log("Sending ICE candidate to other peer")
      }
    }
    peerConnection.oniceconnectionstatechange = (event) => {
      // console.log(event)
    }

    peerConnection.
      createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true}).
      then(createdDescription)
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
    call()
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
