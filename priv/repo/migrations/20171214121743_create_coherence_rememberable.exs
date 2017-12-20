defmodule Kothito.Repo.Migrations.CreateCoherenceRememberable do
  use Ecto.Migration
  def change do
    create table(:rememberables, primary_key: false) do
      add :id, :uuid, primary_key: false

      add :series_hash, :string
      add :token_hash, :string
      add :token_created_at, :naive_datetime
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all)

      timestamps()
    end
    create index(:rememberables, [:user_id])
    create index(:rememberables, [:series_hash])
    create index(:rememberables, [:token_hash])
    create unique_index(:rememberables, [:user_id, :series_hash, :token_hash])

  end
end
