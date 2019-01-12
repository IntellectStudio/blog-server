# PM2 Process Manager 2

## Folder Structures
Once PM2 is started, it will automatically create these folders:
  * `$HOME/.pm2` will contain all PM2 related files
  * `$HOME/.pm2/logs` will contain all applications logs
  * `$HOME/.pm2/pids` will contain all applications pids
  * `$HOME/.pm2/pm2.log` PM2 logs
  * `$HOME/.pm2/pm2.pid` PM2 pid
  * `$HOME/.pm2/rpc.sock` Socket file for remote commands
  * `$HOME/.pm2/pub.sock` Socket file for publishable events
  * `$HOME/.pm2/conf.js` PM2 Configuration

## Command
`pm2 start ./is-express/build/index.js --name express --node-args "-r dotenv/config"`

`pm2 show express`

`pm2 delete express`

`pm2 list`

`pm2 deploy ecosystem.config.js production update`