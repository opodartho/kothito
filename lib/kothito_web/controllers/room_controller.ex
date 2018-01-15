defmodule KothitoWeb.RoomController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas, only: [list_user_except: 1, get_user: 1]
  import Kothito.Chat, only: [get_or_create_room!: 1]

  def new(%{assigns: %{format: "modal"}} = conn, _params) do
    conn
    |> assign(:users, list_user_except(current_user(conn).id))
    |> render("new.modal")
  end

  #TODO: check if user_id present
  def create(conn, params) do
    users = room_users(conn, params)
    room = get_or_create_room!(users)
    conn |> redirect(to: chat_path(conn, :index) <> "#room=#{room.id}")
  end

  defp room_users(conn, params) do
    [get_user(params["user_id"]), current_user(conn)]
  end
end
