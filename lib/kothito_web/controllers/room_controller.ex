require IEx
defmodule KothitoWeb.RoomController do
  use KothitoWeb, :controller

  def new(conn, _params) do
    IEx.pry
    conn
    |> put_layout(:none)
    |> put_status(200)
    |> put_resp_content_type("application/vnd.modal+js")
    |> render("new.modal")
  end
end
