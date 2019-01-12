module.exports = {
  apps : [{
    name: 'express',
    script: './is-express/build/index.js',

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
      "user" : "phshy0607",
      "host" : ["deuslux.org"],
      "ref"  : "origin/master",
      "repo" : "git@github.com:IntellectStudio/blog-server.git",
      "path" : "/home/phshy0607/express",
      'pre-setup': 'rm -rf express; echo \'Setting up repo on server.\'',
      "post-setup": "echo 'commands or a script path to be run on the host after cloning the repo'",
      "post-deploy" : "pwd; echo 'doing it'; yarn; yarn compile:prod; pm2 start /home/phshy0607/ecosystem.config.js --env production"
     },
  }
};
