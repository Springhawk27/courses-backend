/* eslint-disable no-undef */
// import winston from 'winston'
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = format;

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  // customize timestamp
  const date = new Date(timestamp);
  // const hours = date.getHours()
  // const minutes = date.getMinutes()
  // const seconds = date.getSeconds()

  // return `${timestamp} [${label}] ${level}: ${message}`
  // return `${date.toString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`
  return `${date.toString()} [${label}] ${level}: ${message}`;
});

const loggerInfo = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Successful!' }),
    timestamp(),
    myFormat,
    prettyPrint(), // with pretty print
  ),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'tm-%DATE%-success.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const loggerError = createLogger({
  level: 'error',
  format: combine(label({ label: 'Unsuccessful!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'tm-%DATE%-error.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { loggerError, loggerInfo };
