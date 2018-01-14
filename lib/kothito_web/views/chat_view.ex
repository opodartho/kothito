require IEx
defmodule KothitoWeb.ChatView do
  use KothitoWeb, :view

  def page(_), do: "chat-application"

  def avatar(user, version \\ :small) do
    Kothito.AvatarUploader.url({user.avatar, user}, version)
    |> img_tag
  end

  def name(user) do
    try do
      user.firstname <> " " <> user.lastname
    rescue
      _-> user.username
    end
  end

  def chat_with(conn, room) do
    room.users
    |> Enum.reject(fn(e) -> e.id === current_user(conn).id end)
    |> List.first
  end
end
