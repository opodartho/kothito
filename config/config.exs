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

# %% Coherence Configuration %%   Don't remove this line
config :coherence,
  user_schema: Kothito.Coherence.User,
  repo: Kothito.Repo,
  module: Kothito,
  web_module: KothitoWeb,
  router: KothitoWeb.Router,
  messages_backend: KothitoWeb.Coherence.Messages,
  layout: {KothitoWeb.Coherence.LayoutView, :app},
  logged_out_url: "/",
  email_from_name: "Your Name",
  email_from_email: "yourname@example.com",
  opts: [
    :authenticatable,
    :recoverable,
    :rememberable,
    :lockable,
    :trackable,
    :unlockable_with_token,
    :registerable
  ]

config :coherence, KothitoWeb.Coherence.Mailer,
  adapter: Swoosh.Adapters.Sendgrid,
  api_key: "your api key here"
# %% End Coherence Configuration %%
