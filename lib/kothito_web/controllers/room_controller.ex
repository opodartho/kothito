require IEx
defmodule KothitoWeb.RoomController do
  use KothitoWeb, :controller

  def new(%{assigns: %{format: "modal"}}=conn, _params) do
    render(conn, "new.modal")
  end
end
