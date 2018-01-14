defmodule Kothito.Repo.Migrations.CreateRoomsUsers do
  use Ecto.Migration

  def change do
    create table(:rooms_users, primary_key: false) do
      add :room_id, references(:rooms, type: :uuid)
      add :user_id, references(:users, type: :uuid)
    end
    create unique_index(:rooms_users, [:user_id, :room_id])
  end
end
