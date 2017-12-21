defmodule Kothito.Coherence.User do
  @moduledoc false
  use Ecto.Schema
  use Coherence.Schema
  use Arc.Ecto.Schema

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  @foreign_key_type Ecto.UUID

  schema "users" do
    field :firstname, :string
    field :lastname, :string
    field :username, :string
    field :nickname, :string
    field :email, :string
    field :phone, :string
    field :bio, :string
    field :facebook, :string
    field :linkedin, :string
    field :github, :string
    field :bitbucket, :string
    field :avatar, Kothito.AvatarUploader.Type
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

  def changeset(model, params, :profile) do
    model
    |> personal_changeset(params)
    |> info_changeset(params)
    |> social_changeset(params)
  end

  defp personal_changeset(model, params) do
    model
    |> cast(params, ~w(firstname lastname nickname))
    |> cast_attachments(params, [:avatar])
    |> validate_required([:firstname, :lastname])
  end

  defp info_changeset(model, params) do
    model
    |> cast(params, ~w(phone bio))
    |> validate_required([:phone, :bio])
  end

  defp social_changeset(model, params) do
    model
    |> cast(params, ~w(facebook linkedin github bitbucket))
  end
end
