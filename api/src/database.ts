import { Pool } from 'pg';
import Config from './app-config.model';
import knex from 'knex';

export const pool = new Pool(Config.database);

export const bd = knex(Config.database_for_knex);
//Refatorar codigo