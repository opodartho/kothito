defmodule KothitoWeb.CallView do
  use KothitoWeb, :view

  def header(_), do: nil
  def page(_), do: "call-incoming"

  def avatar_url(user, version \\ :small) do
    Kothito.AvatarUploader.url({user.avatar, user}, version)
  end

  def caller(conn, room) do
    room.users
    |> Enum.reject(fn(e) -> e.id === current_user(conn).id end)
    |> List.first
  end

  def caller_name(conn, room) do
    user = caller(conn, room)
    fullname(user)
  end

  def fullname(user) do
    try do
      user.firstname <> " " <> user.lastname
    rescue
      _ -> user.username
    end
  end
end
