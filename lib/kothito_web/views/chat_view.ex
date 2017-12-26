defmodule KothitoWeb.ChatView do
  use KothitoWeb, :view

  def page(_), do: "chat-application"

  def avatar(user, version \\ :small) do
    Kothito.AvatarUploader.url({user.avatar, user}, version)
    |> img_tag
  end

  def name(user) do
    user.firstname <> " " <> user.lastname
  end
end
