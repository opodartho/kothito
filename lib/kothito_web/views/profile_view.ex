defmodule KothitoWeb.ProfileView do
  use KothitoWeb, :view

  def fullname(user) do
    try do
      user.firstname <> " " <> user.lastname
    rescue
      _ -> user.username
    end
  end

  def avatar(user, version) do
    Kothito.AvatarUploader.url({user.avatar, user}, version)
  end
end
