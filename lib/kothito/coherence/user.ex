defmodule Kothito.Coherence.User do
  @moduledoc false
  use Ecto.Schema
  use Coherence.Schema

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  @foreign_key_type Ecto.UUID

  schema "users" do
    field :username, :string
    field :email, :string
    coherence_schema()

    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:username, :email] ++ coherence_fields())
    |> validate_required([:username, :email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_coherence(params)
  end

  def changeset(model, params, :password) do
    model
    |> cast(params, ~w(password password_confirmation reset_password_token reset_password_sent_at))
    |> validate_coherence_password_reset(params)
  end
end
