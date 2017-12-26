defmodule KothitoWeb.ChatController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas, only: [list_user_except: 1]

  def index(conn, _params) do
    users = list_user_except(current_user(conn).id)
    conn
    |> assign(:users, users)
    |> render("index.html")
  end
end
