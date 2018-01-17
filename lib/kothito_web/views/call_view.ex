defmodule KothitoWeb.CallView do
  use KothitoWeb, :view

  def header(_), do: nil
  def page(_), do: "call-incoming"
end
