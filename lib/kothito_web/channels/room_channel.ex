defmodule KothitoWeb.RoomChannel do
  use KothitoWeb, :channel
  import Kothito.Chat, only: [get_room!: 1]

  def join("rooms:" <> room_id, _params, socket) do
    room = get_room!(room_id)

    response = %{
      room: "Hello"
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("rooms:message", payload, socket) do
    broadcast! socket, "message:new", %{payload: payload}
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
