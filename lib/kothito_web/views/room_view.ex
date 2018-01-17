defmodule KothitoWeb.RoomView do
  use KothitoWeb, :view
  alias Kothito.AvatarUploader

  def header(_), do: "Direct Messages"
  def avatar(user, version) do
    AvatarUploader.url({user.avatar, user}, version)
  end

  def name(user) do
    try do
      user.firstname <> " " <> user.lastname
    rescue
      _ -> nil
    end
  end
end
