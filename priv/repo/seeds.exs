Kothito.Repo.delete_all Kothito.Coherence.User

Kothito.Coherence.User.changeset(
  %Kothito.Coherence.User{},
  %{
    username: "testuser",
    email: "testuser@example.com",
    password: "secret",
    password_confirmation: "secret"}
)
|> Kothito.Repo.insert!
