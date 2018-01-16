require IEx
defmodule KothitoWeb.CallController do
  use KothitoWeb, :controller
  import Kothito.Chat, only: [get_room!: 1]

  plug :put_layout, false

  def show(conn, %{"id" => room_id}) do
    room = get_room!(room_id) |> Kothito.Repo.preload(:users)
    render conn, "show.html", room: room
  end
end
