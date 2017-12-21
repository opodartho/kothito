defmodule KothitoWeb.ProfileController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas, only: [list_user: 0, get_user: 1]

  def index(conn, _params) do
    conn
    |> assign(:users, list_user())
    |> render("index.html")
  end

  def edit(conn, %{"id" => id}) do
    conn
    |> assign(:user, get_user(id))
    |> render("edit.html")
  end
end
