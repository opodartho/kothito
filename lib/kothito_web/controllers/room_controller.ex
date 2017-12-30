defmodule KothitoWeb.RoomController do
  use KothitoWeb, :controller

  def new(%{assigns: %{format: "modal"}}=conn, _params) do
    conn |> render("new.modal")
  end
end
