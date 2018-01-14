require IEx
defmodule KothitoWeb.ChatController do
  use KothitoWeb, :controller
  import Kothito.Chat, only: [list_rooms: 1]

  def index(conn, _params) do
    rooms = list_rooms(current_user(conn))
    conn
    |> assign(:rooms, rooms)
    |> render("index.html")
  end
end
