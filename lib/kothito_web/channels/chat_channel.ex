defmodule KothitoWeb.ChatChannel do
  use Phoenix.Channel

  def join("chat:init", _payload, socket) do
    {:ok, socket}
  end

  def join("chat:" <> _room_id, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("chat:start", payload, socket) do
    current_user = socket.assigns.user
    fellow = payload["fellow"]
    subtopic = current_user <> "-" <> fellow
    broadcast! socket, "user:#{current_user}", %{subtopic: subtopic}
    broadcast! socket, "user:#{fellow}", %{subtopic: subtopic}
    {:noreply, socket}
  end

  def handle_in("chat:" <> room_id, payload, socket) do
    broadcast! socket, "chat:new", %{payload: payload, room_id: room_id}
    {:noreply, socket}
  end
end
