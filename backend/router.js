import express from 'express';
const router = express.Router();

const books = [];
let nextId = 0;

router.get('/', (req, res) => {
    res.status(200).json(books);
});

// поиск книги по id
router.get('/:id', (req, res) => {
    const book = books.find(book => book.id === Number(req.params.id));
    
    if (!book) {
        return res.status(404).json({
            code: 'NOT_FOUND',
            message: 'Книга не найдена',
            requestId: req.requestId
        });
    }

    res.status(200).json(book);


});

// создание книг
router.post('/', (req, res) => {

    const { title, year } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            code: 'INVALID_TITLE',
            message: 'Некорректное название книги',
            requestId: req.requestId
        });
    }

    if (!year || isNaN(year) || year < 1 || year > new Date().getFullYear()) {
        return res.status(400).json({
            code: 'INVALID_YEAR',
            message: 'Некорректный год (от 1 до текущего)',
            requestId: req.requestId
        });
    }

    // проверка дубликата при созд новой книги 
    const duplicate = books.find(book => book.title.toLowerCase() === title.trim().toLowerCase() && book.year === Number(year));

    if (duplicate) {
        return res.status(409).json({
            code: 'DUPLICATE',
            message: `Книга ${title.trim()} (${year})г. уже существует`,
            requestId: req.requestId
        });
    }

    const newBook = { id: nextId++, title: title.trim(), year: Number(year) };
    books.push(newBook);

    res.status(201).json(newBook);
});

export default router;