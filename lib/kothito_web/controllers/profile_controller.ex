defmodule KothitoWeb.ProfileController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas, only: [list_user: 0]

  def index(conn, _params) do
    conn
    |> assign(:users, list_user())
    |> render("index.html")
  end
end
