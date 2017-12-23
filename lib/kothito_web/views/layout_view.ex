defmodule KothitoWeb.LayoutView do
  use KothitoWeb, :view
  alias Kothito.AvatarUploader

  def current_avatar(conn, version) do
    user = conn |> current_user
    AvatarUploader.url({user.avatar, user}, version)
  end
end
