import crypto from 'crypto';

// создание уник. id и таймера для каждого запроса
export const timer = (req, res, next) => {
    req.requestId = crypto.randomUUID();
    req.startTime = Date.now();
    next();
};

// логирование каждого запроса 
export const requestLogger = (req, res, next) => {
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        console.log(`[${req.requestId}] ${req.method} ${req.url} - ${res.statusCode} (${duration}мс)`);
    });
    next();
};

// глобальный обработчик ошибок
export const errorHandler = (error, req, res, next) => {
    console.log(`${req.requestId} Ошибка:`, error.message);

    res.status(500).json({
        code: 'Internal Server Error',
        message: 'Внутренняя ошибка сервера',
        requestId: req.requestId
    });
    next();
};