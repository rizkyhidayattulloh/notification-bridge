import { ConfigFactory } from '@nestjs/config';
import app from './app';
import database from './database';
import jwt from './jwt';
import queue from './queue';
import storage from './storage';
import throttler from './throttler';

export const config: ConfigFactory[] = [
    app,
    database,
    jwt,
    throttler,
    storage,
    queue
];
