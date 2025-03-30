import appPromise from './app'
import { config } from './config/config';
import express, { Application } from 'express'; // Import Application type


const PORT = config.PORT;

appPromise.then((app:Application) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})


