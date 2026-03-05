import express from "express";
import router from "./router.js";
import { requestLogger, errorHandler, timer } from "./middleware.js";

const app = express();

app.use(express.json());


app.use(timer);
app.use(requestLogger);
app.use('/api/books', router);
app.use(errorHandler);

app.listen(5000, () => console.log("Сервер запущен на http://localhost:5000"));