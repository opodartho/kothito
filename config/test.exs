use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :kothito, KothitoWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

config :kothito, Kothito.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASS"),
  database: System.get_env("DB_NAME"),
  hostname: System.get_env("DB_HOST"),
  pool_size: System.get_env("DB_POOL_SIZE")
