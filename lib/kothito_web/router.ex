defmodule KothitoWeb.Router do
  use KothitoWeb, :router
  use Coherence.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session
  end

  pipeline :protected do
    plug :accepts, ["html", "modal"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session, protected: true
    plug :put_current_user
    plug :put_user_token
  end

  scope "/" do
    pipe_through :browser
    coherence_routes()
  end

  scope "/" do
    pipe_through :protected
    coherence_routes :protected
  end

  scope "/", KothitoWeb do
    pipe_through :browser # Use the default browser stack
  end

  scope "/", KothitoWeb do
    pipe_through :protected

    resources "/profile", ProfileController, only: [:edit, :update]
    resources "/users", ProfileController, only: [:index], as: :user
    resources "/chat", ChatController, only: [:index]
    resources "/rooms", RoomController, only: [:new]
    get "/call", CallController, :index
    get "/", ChatController, :index, as: :root
  end
  # Other scopes may use custom stacks.
  # scope "/api", KothitoWeb do
  #   pipe_through :api
  # end

  defp put_current_user(conn, _) do
    current_user = Coherence.current_user(conn)
    conn |> assign(:current_user, current_user)
  end

  defp put_user_token(conn, _) do
    token = Phoenix.Token.sign(conn, "user_id", conn.assigns.current_user.id)
    conn
    |> assign(:user_token, token)
  end
end
