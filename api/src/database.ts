import { Pool } from 'pg';
import Config from './app-config.model';

export const pool = new Pool(Config.database);