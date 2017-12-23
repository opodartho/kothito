defmodule KothitoWeb.ProfileController do
  use KothitoWeb, :controller
  import Kothito.Coherence.Schemas,
    only: [list_user: 0, get_user: 1, change_profile: 1, update_profile: 2]

  def index(conn, _params) do
    conn
    |> assign(:users, list_user())
    |> render("index.html")
  end

  def edit(conn, %{"id" => id}) do
    user = get_user(id)
    conn
    |> assign(:user, user)
    |> assign(:changeset, change_profile(user))
    |> render("edit.html")
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = get_user(id)
    case update_profile(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Profile updated successfully")
        |> redirect(to: profile_path(conn, :edit, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign(:user, user)
        |> assign(:changeset, changeset)
        |> render("edit.html")
    end
  end
end
