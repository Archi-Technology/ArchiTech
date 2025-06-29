import appPromise from './app'
import { config } from './config/config';
import express, { Application } from 'express'; // Import Application type
import https from 'https';
import fs from 'fs';

const PORT = config.PORT;

appPromise.then((app:Application) => {
  if(process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });}
  else {
    const prop = {
      key: fs.readFileSync('../../client-key.pem'),
      cert: fs.readFileSync('../../client-cert.pem')
    }
    https.createServer(prop, app).listen(PORT);

  }
})


