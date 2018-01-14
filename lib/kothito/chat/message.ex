defmodule Kothito.Chat.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Kothito.Chat.Message

  schema "messages" do
    field :text, :string
    belongs_to :room, Kothito.Chat.Room
    belongs_to :user, Kothito.Coherence.User

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
