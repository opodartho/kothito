defmodule KothitoWeb.CallController do
  use KothitoWeb, :controller

  plug :put_layout, false

  def show(conn, _params) do
    render conn, "show.html"
  end
end
