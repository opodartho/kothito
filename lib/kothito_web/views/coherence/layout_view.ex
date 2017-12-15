defmodule KothitoWeb.Coherence.LayoutView do
  use KothitoWeb.Coherence, :view

  def show_flash(conn) do
    conn |> get_flash |> flash_msg
  end

  def flash_msg(%{"info" => msg}) do
    ~E"<div class='alert alert-info alert-icon-left'><%= msg %></div>"
  end

  def flash_msg(%{"error" => msg}) do
    ~E"<div class='alert alert-danger alert-icon-left'><%= msg %></div>"
  end

  def flash_msg(_) do
    nil
  end
end
