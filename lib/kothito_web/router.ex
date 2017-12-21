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
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session, protected: true
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
    get "/call", CallController, :index
    get "/", PageController, :index, as: :root
  end
  # Other scopes may use custom stacks.
  # scope "/api", KothitoWeb do
  #   pipe_through :api
  # end
end
