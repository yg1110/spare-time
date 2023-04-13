import * as express from 'express'

function createResponse(res: express.Response, data = {}, status = 200) {
  const success = status == 200
  res.status(status)
  return { success, status, data }
}

export default createResponse
