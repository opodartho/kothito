defmodule Kothito.Chat.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Kothito.Chat.Message

  schema "messages" do
    field :body, :string
    belongs_to :room, Kothito.Chat.Room, type: Ecto.UUID
    belongs_to :user, Kothito.Coherence.User, type: Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:body, :user_id, :room_id])
    |> validate_required([:body, :user_id, :room_id])
  end
end
