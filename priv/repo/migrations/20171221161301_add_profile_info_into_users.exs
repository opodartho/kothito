defmodule Kothito.Repo.Migrations.AddProfileInfoIntoUsers do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :firstname, :string, size: 60
      add :lastname, :string, size: 60
      add :nickname, :string, size: 40
      add :phone, :string
      add :bio, :text
      add :facebook, :string
      add :linkedin, :string
      add :github, :string
      add :bitbucket, :string
    end
  end
end
