defmodule KothitoWeb.UserChannel do
  use KothitoWeb, :channel
  import Kothito.Chat, only: [get_room!: 1]
  alias Kothito.Repo

  def join("users", _params, socket) do
    {:ok, socket}
  end

  def handle_in("calling", %{"room" => room_id, "user" => user_id}, socket) do
    room = get_room!(room_id) |> Repo.preload(:users)
    response = %{
      initiator: user_id,
      url: "/call/" <> room_id
    }
    for user <- room.users do
      broadcast! socket, "call:" <> user.id, response
    end
    {:noreply, socket}
  end
end
