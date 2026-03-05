<template>
    <div
        class="min-h-screen bg-bg text-white font-sans px-4 py-16 flex justify-center items-start page-enter"
    >
        <div class="w-full max-w-xl">
            <div class="mb-10">
                <h1
                    class="text-4xl font-bold tracking-tight flex justify-center"
                >
                    Мини-библиотека
                </h1>
            </div>

            <form class="flex gap-2 mb-8" @submit.prevent="createBook">
                <input
                    v-model="newBook.title"
                    type="text"
                    placeholder="Название книги"
                    class="input flex-1"
                    required
                />
                <input
                    v-model.number="newBook.year"
                    type="number"
                    placeholder="Год"
                    class="input w-24"
                    required
                />
                <button type="submit" :disabled="isLoading" class="btn">
                    {{ isLoading ? "..." : "Добавить" }}
                </button>
            </form>

            <div class="flex gap-2 mb-6">
                <div class="flex-1">
                    <p
                        class="text-xs tracking-[0.15em] uppercase text-muted mb-2"
                    >
                        Поиск
                    </p>
                    <input
                        v-model="searchTitleOrYear"
                        type="text"
                        placeholder="По названию или году..."
                        class="input w-full"
                    />
                </div>
                <div>
                    <p
                        class="text-xs tracking-[0.15em] uppercase text-muted mb-2"
                    >
                        Сортировка
                    </p>
                    <select v-model="sort" class="input">
                        <option value="default">По умолчанию</option>
                        <option value="title">По названию А-Я</option>
                        <option value="year_asc">Год по возрастанию</option>
                        <option value="year_desc">Год по убыванию</option>
                    </select>
                </div>
            </div>

            <div class="flex items-center justify-between mb-4">
                <p class="text-xs tracking-[0.15em] uppercase text-muted">
                    Каталог
                </p>
                <span class="text-xs font-mono text-muted"
                    >{{ sortBooks.length }} / {{ books.length }}</span
                >
            </div>

            <div class="flex flex-col gap-2">
                <p
                    v-if="sortBooks.length === 0"
                    class="text-center text-muted italic py-10 text-sm"
                >
                    {{
                        books.length === 0
                            ? "Библиотека пока пуста..."
                            : "Ничего не найдено"
                    }}
                </p>

                <transition-group
                    name="fade-slide"
                    tag="div"
                    class="flex flex-col gap-2"
                >
                    <li
                        v-for="book in sortBooks"
                        :key="book.id"
                        class="book-item"
                    >
                        <div class="flex items-center gap-3">
                            <span class="book-id">{{ book.id }}</span>
                            <span class="text-[15px] font-medium text-white">{{
                                book.title
                            }}</span>
                        </div>
                        <span class="font-mono text-xs text-muted">{{
                            book.year
                        }}</span>
                    </li>
                </transition-group>
            </div>
        </div>

        <transition name="notify">
            <div
                v-if="success"
                class="bg-[#0f1a0f] border border-[#1a4a1a] text-[#4ade80] rounded-lg px-5 py-4 mb-6 text-sm fixed bottom-0 max-w-xl w-full"
            >
                <p class="font-medium">{{ responseServer }}</p>
            </div>
        </transition>
        <transition name="notify">
            <div
                v-if="error"
                class="bg-error-bg border border-error-border text-error-text rounded-lg px-5 py-4 mb-6 text-sm bottom-0 absolute"
            >
                <p>{{ responseServer }}</p>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

let responseServer = ref("");

// книги
const books = ref([
    { title: "111", year: "111" },
    { title: "222", year: "222" },
    { title: "аыаываыв", year: "2020" },
    { title: "аввыаыы", year: "2021" },
]);
onMounted(async () => {
    try {
        const response = await axios.get("/api/books");

        books.value = response.data;
        console.log("Книги загружены");
    } catch (error) {
        responseServer.value = "Ошибка загрузки книг";
        showError();
        console.error("Ошибка загрузки", error);
    }
});

// флаги
let error = ref(false);
let success = ref(false);

// таймеры
const showError = () => {
    error.value = true;
    setTimeout(() => {
        error.value = false;
    }, 3000);
};

const showSucces = () => {
    success.value = true;
    setTimeout(() => {
        success.value = false;
    }, 3000);
};

// загрузка при доб книги
const isLoading = ref(false);

const searchTitleOrYear = ref("");
// фильтр.
const filterBooks = computed(() => {
    let result = [...books.value];

    if (searchTitleOrYear.value.trim()) {
        const lowerText = searchTitleOrYear.value.toLowerCase();
        // создаем новый массив с фильтрованными гнигами
        result = result.filter(
            (books) =>
                books.title.toLowerCase().includes(lowerText) ||
                String(books.year).includes(lowerText),
        );
    }
    return result;
});

// сорт.
const sort = ref("default");

const sortBooks = computed(() => {
    const result = [...filterBooks.value];

    if (sort.value === "title")
        result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort.value === "year_asc") result.sort((a, b) => a.year - b.year);
    else if (sort.value === "year_desc") result.sort((a, b) => b.year - a.year);

    return result;
});

const newBook = ref({ title: "", year: "" });

const createBook = async () => {
    isLoading.value = true;
    try {
        const response = await axios.post("/api/books", newBook.value);
        books.value.push(response.data);

        responseServer.value = `«${response.data.title}» добавлена в библиотеку`;
        showSucces();

        newBook.value = { title: "", year: "" };
    } catch (error) {
        responseServer.value =
            error.response?.data?.message || "Ошибка при добавлении книги";
        showError();
    } finally {
        isLoading.value = false;
    }
};
</script>
