defmodule Kothito.Repo.Migrations.AddCoherenceToUser do
  use Ecto.Migration
  def change do
    alter table(:users) do
      # authenticatable
      add :password_hash, :string
      # recoverable
      add :reset_password_token, :string
      add :reset_password_sent_at, :naive_datetime
      # lockable
      add :failed_attempts, :integer, default: 0
      add :locked_at, :naive_datetime
      # trackable
      add :sign_in_count, :integer, default: 0
      add :current_sign_in_at, :naive_datetime
      add :last_sign_in_at, :naive_datetime
      add :current_sign_in_ip, :string
      add :last_sign_in_ip, :string
      # unlockable_with_token
      add :unlock_token, :string
      # rememberable
      add :remember_created_at, :naive_datetime
    end


  end
end
