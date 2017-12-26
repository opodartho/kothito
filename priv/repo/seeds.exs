Kothito.Repo.delete_all Kothito.Coherence.User
defmodule Seed do
  def insert_user(email, firstname, lastname) do
    username = username(firstname, lastname)
    Kothito.Coherence.User.changeset(
      %Kothito.Coherence.User{},
      %{
        username: username,
        email: email,
        password: "secret",
        password_confirmation: "secret"}
    )
    |> Kothito.Repo.insert!
    |> update_profile(firstname, lastname)
  end

  defp update_profile(user, firstname, lastname) do
    Kothito.Coherence.Schemas.update_profile(
      user,
      %{
        firstname: firstname,
        lastname: lastname,
        phone: Faker.Phone.EnGb.mobile_number,
        bio: Faker.Lorem.sentence(%Range{first: 1, last: 10})
      }
    )
  end

  defp username(firstname, lastname) do
    firstname <> lastname |> String.downcase
  end

  # TODO: make avatar upload from seed
  defp avatar(username) do
    %Plug.Upload{
      content_type: "image/png",
      filename: "#{username}.png",
      path: Faker.Avatar.image_url(username)
    }
  end
end
Seed.insert_user("testuser@example.com", "Test", "User")

for x <- 0..20 do
  Seed.insert_user(
    Faker.Internet.free_email,
    Faker.Name.first_name,
    Faker.Name.last_name
  )
end
