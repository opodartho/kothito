require IEx
defmodule KothitoWeb.RoomChannel do
  use KothitoWeb, :channel
  import Kothito.Chat, only: [get_room!: 1, create_message: 1]

  def join("rooms:" <> room_id, _params, socket) do
    room = get_room!(room_id)

    response = %{
      room: "Hello"
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("message:new", payload, socket) do
    params =
      Map.merge(
        payload,
        %{
          "room_id" => socket.assigns.room.id,
          "user_id" => socket.assigns.user
        })

    case create_message(params) do
      {:ok, _message} ->
        broadcast! socket, "message:created", %{payload: payload}
        {:reply, :ok, socket}
      {:error, _changeset} ->
        {:noreply, socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
