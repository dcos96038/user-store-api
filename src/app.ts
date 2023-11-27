import { envs } from './config/envs'
import { connect } from './data/mongo/mongo-database'
import { appRoutes } from './presentation/routes'

import { Server } from './presentation/server'

void (async () => {
  await main()
})()

async function main () {
  await connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: appRoutes()
  })

  await server.start()
}
