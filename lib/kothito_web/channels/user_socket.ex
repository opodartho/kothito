defmodule KothitoWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "rooms:*", KothitoWeb.RoomChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(
      socket,
      "user_id",
      token,
      max_age: 1000000
    ) do
      {:ok, user_id} ->
        {:ok, assign(socket, :user, user_id)}
      {:error, _reason} ->
        {:error}
    end
  end

  def connect(_params, _socket), do: :error

  # Socket id's are topics that allow you to identify
  # all sockets for a given user:
  #
  def id(socket), do: "user_socket:#{socket.assigns.user}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #   KothitoWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  # def id(_socket), do: nil
end
