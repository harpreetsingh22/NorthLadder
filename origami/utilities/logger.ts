import winston from 'winston';
import { log } from '@config';

// eslint-disable-next-line import/prefer-default-export
export const logger = winston.createLogger({
  level: log.level,
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
