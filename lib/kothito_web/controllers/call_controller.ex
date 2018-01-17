require IEx
defmodule KothitoWeb.CallController do
  use KothitoWeb, :controller
  import Kothito.Chat, only: [get_room!: 1]

  def show(%{assigns: %{format: "modal"}} = conn, %{"id" => room_id}) do
    room = get_room!(room_id) |> Kothito.Repo.preload(:users)
    conn
    |> assign(:room, room)
    |> render("show.modal")
  end

  def show(conn, %{"id" => room_id}) do
    room = get_room!(room_id) |> Kothito.Repo.preload(:users)
    render conn, "show.html", room: room, layout: false
  end
end
