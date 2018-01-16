require IEx
defmodule KothitoWeb.CallChannel do
  @moduledoc false
  use Phoenix.Channel
  import Kothito.Chat, only: [get_room!: 1]

  def join("calls:" <> room_id, _params, socket) do
    room = get_room!(room_id)
    response = %{}
    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("signal:sdp", params, socket) do
    response = %{ sdp: params, user: socket.assigns.user }
    broadcast! socket, "signal:sdp", response
    {:noreply, socket}
  end

  def handle_in("signal:ice", params, socket) do
    response = %{ ice: params, user: socket.assigns.user }
    broadcast! socket, "signal:ice", response
    {:noreply, socket}
  end
end
