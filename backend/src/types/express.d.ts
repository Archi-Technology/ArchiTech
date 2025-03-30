// express.d.ts
import * as express from 'express';

// Declare module to augment Express types
declare global {
  namespace Express {
    interface Request {
      user?: any;  // Add the 'user' property to the Request object
    }
  }
}
