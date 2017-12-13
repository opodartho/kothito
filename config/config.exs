# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :kothito,
  ecto_repos: [Kothito.Repo]

# Configures the endpoint
config :kothito, KothitoWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "l9jfy2F554QSofI6+aUlcYfSYfWeecSVLzxwONh/gVtHjPtPjGysj3HxKiZLaSyE",
  render_errors: [view: KothitoWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Kothito.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Slime template engines for phoenix
config :phoenix, :template_engines,
  slim: PhoenixSlime.Engine,
  slime: PhoenixSlime.Engine

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
