defmodule KothitoWeb.LayoutView do
  use KothitoWeb, :view
  import Phoenix.Controller, only: [view_module: 1, action_name: 1]
  alias Kothito.AvatarUploader

  def current_avatar(conn, version) do
    user = conn |> current_user
    AvatarUploader.url({user.avatar, user}, version)
  end

  def page(conn, default) do
    try do
      apply(view_module(conn), :page, [action_name(conn)])
    rescue
      _ -> default
    end
  end
end
