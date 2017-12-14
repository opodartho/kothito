// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import AdapterJS from "adapterjs"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

let channel = socket.channel("call", {})

channel.join()
  .receive("ok", () => { console.log("Successfully joined call channel")})
  .receive("error", () => { console.log("Unable to join")})

let localStream, peerConnection;
let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
let connectButton = document.getElementById("connect");
let callButton = document.getElementById("call");
let hangupButton = document.getElementById("hangup");


AdapterJS.webRTCReady(function(isUsingPlugin) {
  hangupButton.disabled = true;
  callButton.disabled = true;
  hangupButton.onclick = () => {
    console.log("Ending call");
    peerConnection.close();
    peerConnection = null;
    hangupButton.disabled = true;
    connectButton.disabled = false;
    callButton.disabled = true;
  };

  connectButton.onclick = () => {
    console.log("Requesting local stream")
    getUserMedia({audio:true, video: {width: 1280, height: 720}}, gotStream, error => {
      console.log("getUserMedia error: ", error)
    })
  }

  callButton.onclick = () => {
    callButton.disabled = true;
    console.log("Starting call");
    peerConnection.createOffer(gotLocalDescription, (error) => {
      console.log(error.name + ": " + error.message);
    })
  }

  let gotStream = (stream) => {
    console.log("Received local stream")
    attachMediaStream(localVideo, stream)
    localStream = stream;
    setupPeerConnection();
  }

  let gotLocalDescription = (description) => {
    peerConnection.setLocalDescription(description, () => {
      channel.push("message", { body: JSON.stringify({
              "sdp": peerConnection.localDescription
          })});
    }, (error) => {
      console.log(error.name + ": " + error.message);
    });
    console.log("Offer from localPeerConnection: \n" + description.sdp);
  }

  let gotRemoteDescription = (description) => {
    console.log("Answer from remotePeerConnection: \n" + description.sdp);
    peerConnection.setRemoteDescription(new RTCSessionDescription(description.sdp));
    peerConnection.createAnswer(gotLocalDescription, (error) => {
      console.log(error.name + ": " + error.message);
    });
  }

  let setupPeerConnection = () => {
    connectButton.disabled = true;
    callButton.disabled = false;
    hangupButton.disabled = false;
    console.log("Waiting for call");

    let servers = {
      "iceServers": [{
        "url": "stun:stun.example.org"
      }]
    };

    peerConnection = new RTCPeerConnection(servers);
    console.log("Created local peer connection");
    peerConnection.onicecandidate = gotLocalIceCandidate;
    peerConnection.ontrack = gotRemoteStream;
    peerConnection.addStream(localStream);
    console.log("Added localStream to localPeerConnection");
  }

  let gotRemoteStream = (event) => {
    attachMediaStream(remoteVideo, event.stream);
    console.log("Received remote stream");
  }

  let gotLocalIceCandidate = (event) => {
    if (event.candidate) {
      console.log("Local ICE candidate: \n" + event.candidate.candidate);
      channel.push("message", {body: JSON.stringify({
          "candidate": event.candidate
      })});
    }
  }

  let gotRemoteIceCandidate = (event) => {
    callButton.disabled = true;
    if(event.candidate) {
      peerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
      console.log("Remote ICE candidate: \n " + event.candidate.candidate);
    }
  }

  channel.on("message", payload => {
    let message = JSON.parse(payload.body);
    if(message.sdp){
      gotRemoteDescription(message);
    } else {
      gotRemoteIceCandidate(message);
    }
  })

})

