module.exports = {
  apps : [{
    name: 'express',
    script: './app/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  "deploy" : {
    "production" : {
      "user" : "root",
      "host" : ["127.0.0.1"],
      "ref"  : "origin/master",
      "repo" : "git@github.com:<user>/<repo>.git",
      "path" : "/home/root/path/to/deploy",
      'pre-setup': 'echo \'Setting up repo on server.\'',
      "post-setup": 'echo \'commands or a script path to be run on the host after cloning the repo\'',
      "post-deploy" : "pwd; echo 'commands is going to executed'; yarn; yarn build; pm2 start app.js"
     },
  }
};
