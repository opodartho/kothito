defmodule KothitoWeb.ModalView do
  use KothitoWeb, :view
  import Phoenix.Controller, only: [view_module: 1, action_name: 1]

  def header(conn, default) do
    try do
      apply(view_module(conn), :header, [action_name(conn)])
    rescue
      _ -> default
    end
  end

  def page(conn, default) do
    try do
      apply(view_module(conn), :page, [action_name(conn)])
    rescue
      _ -> default
    end
  end
end
