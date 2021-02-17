import "reflect-metadata";
import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes';
import { Db } from './middleware/DbMongo';
import { MediaModel } from './modules';
import fileUpload from 'express-fileupload';

type TAppConfig = {
    host: string;
    port: string;
}

const AppConfig: TAppConfig = config.get('App');

// Create a new express application instance
const app: Application = express();

const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 20, message: "Too many accounts created from this IP, please try again after an hour" });

/*
** GLOBAL MIDDLEWARES
*/

// Call middleware
app.use(cors());
app.use(helmet());
app.use(fileUpload());

//  apply to all requests
app.use(limiter);

// Sanitize Mongo data
app.use(mongoSanitize());

app.use(bodyParser.json({limit: '10kb'}));
app.use(Db([MediaModel]));

app.use('/api/', routes);

app.listen(AppConfig.port, () => {
    console.log(`Server running on port http://${AppConfig.host}:${AppConfig.port}`);
});
