defmodule KothitoWeb.RoomController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas, only: [list_user_except: 1]

  def new(%{assigns: %{format: "modal"}}=conn, _params) do
    conn
    |> assign(:users, list_user_except(current_user(conn).id))
    |> render("new.modal")
  end
end
