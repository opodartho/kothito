defmodule Kothito.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  alias Kothito.Chat


  schema "messages" do
    field :body, :string
    field :room_id, :id
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Chat{} = chat, attrs) do
    chat
    |> cast(attrs, [:body])
    |> validate_required([:body])
  end
end
