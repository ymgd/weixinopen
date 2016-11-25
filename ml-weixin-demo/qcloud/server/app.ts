import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Server } from "./game/server";
import { config } from "./config";

var server = new Server();

server.init(config.rootPath);
server.start();