import {NextFunction, Request, Response, Router} from 'express'

const testRouter: Router = Router()

testRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
})

export = testRouter
