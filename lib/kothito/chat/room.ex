defmodule Kothito.Chat.Room do
  use Ecto.Schema
  import Ecto.Changeset
  alias Kothito.Chat.Room

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  @foreign_key_type Ecto.UUID

  schema "rooms" do
    field :name, :string

    many_to_many :users, Kothito.Coherence.User, join_through: "rooms_users"
    timestamps()
  end

  @doc false
  def changeset(%Room{} = room, attrs) do
    room
    |> cast(attrs, [:name])
  end
end
