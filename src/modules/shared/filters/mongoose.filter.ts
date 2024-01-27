import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common'

import * as MongooseError from 'mongoose/lib/error'

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest();

    let error: { statusCode: number; message: string; timestamp?: string }

    switch (exception.name) {
      case 'DocumentNotFoundError': {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not Found',
          timestamp: new Date().toISOString()
        }
        break
      }
      // case 'MongooseError': { break; } // general Mongoose error
      case 'CastError': {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
          timestamp: new Date().toISOString()
        }
        break
      }
      // case 'DisconnectedError': { break; }
      // case 'DivergentArrayError': { break; }
      // case 'MissingSchemaError': { break; }
      // case 'ValidatorError': { break; }
      // case 'ValidationError': { break; }
      // case 'ObjectExpectedError': { break; }
      // case 'ObjectParameterError': { break; }
      // case 'OverwriteModelError': { break; }
      // case 'ParallelSaveError': { break; }
      // case 'StrictModeError': { break; }
      // case 'VersionError': { break; }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Error'
        }
        break
      }
    }

    response.status(error.statusCode).json(error)
  }
}
