import { config as databaseConfig } from '../../db/database';
import * as dotenv from 'dotenv';
dotenv.config();
export const database = process.env.NODE_ENV === 'production' ? databaseConfig.production : databaseConfig.development;


/**
 * Get environment variable value
 * @param {string} envVar
 * @returns {any}
 */
export const getEnv = (envVar:string) => {
    try {
      const envValue = process.env[envVar];
      if (envValue) {
        return envValue;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

