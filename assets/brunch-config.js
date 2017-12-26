exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^js/,
        "js/vendor.js": /^(vendor|deps|node_modules).*/,
        "js/auth.js": /^js\/auth/
      }
    },
    stylesheets: {
      joinTo: "css/app.css",
      order: {
        after: ["priv/static/css/app.scss"]
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    assets: /^(static)/
  },

  // Phoenix paths configuration
  paths: {
    watched: ["static", "css", "js", "vendor"],
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/]
    },
    copycat: {
      "fonts": ["node_modules/font-awesome/fonts"]
    },
    sass: {
      options: {
        includePaths: ["node_modules/font-awesome/scss"],
        precision: 8
      }
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/menu", "js/app"],
      "js/auth.js": ["js/auth/index"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether',
      bootstrap: 'bootstrap/dist/js/bootstrap.bundle.js',
      icheck: 'icheck'
    }
  }
};
