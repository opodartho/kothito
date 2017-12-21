defmodule KothitoWeb.LayoutView do
  use KothitoWeb, :view

  def current_avatar(conn, version) do
    user = conn |> current_user
    Kothito.AvatarUploader.url({user.avatar, user}, version)
  end
end
