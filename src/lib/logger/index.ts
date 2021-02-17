import { createLogger, format, transports } from 'winston';

const logFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const consoleTransport = () => {
    return new transports.Console();
};

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        logFormat
    ),
    transports: [consoleTransport()]
});

export default logger;