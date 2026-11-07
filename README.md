# pr6-web-nestjs-validation-online-store

## Практична робота №6

Тема: Обробка запитів у NestJS (Request Pipeline).

Варіант 4: Доставка їжі та ресторани.

Студент: Феделеш Андрій КН-41

## Мета роботи

Ознайомитися з процесом обробки HTTP-запитів у NestJS, навчитися налаштовувати глобальну валідацію вхідних даних за допомогою ValidationPipe, створювати власні Pipe для обробки даних та Middleware для логування HTTP-запитів.

## Встановлені залежності

У процесі розроблення використовувалися:

- **Node.js** — середовище виконання JavaScript.
- **npm** — менеджер пакетів.
- **NestJS** — серверний фреймворк для розроблення застосунків.
- **TypeScript** — мова програмування.
- **class-validator** — бібліотека для перевірки коректності вхідних даних за допомогою декораторів.
- **class-transformer** — бібліотека для перетворення звичайних об'єктів на екземпляри класів.
- **Thunder Client** — інструмент для тестування REST API.

## Структура проєкту

Основні файли та директорії проєкту:

    online-store/
    ├── src/
    │   ├── common/
    │   │   ├── middleware/
    │   │   │   └── http-logger.middleware.ts
    │   │   └── pipes/
    │   │       └── trim.pipe.ts
    │   │
    │     ├── dishes/
    │   │   ├── dto/
    │   │   │   ├── create-dish.dto.ts
    │   │   │   └── update-dish.dto.ts
    │   │   ├── dishes.controller.ts
    │   │   ├── dishes.module.ts
    │   │   └── dishes.service.ts
    │   │
    │   ├── orders/
    │   │   ├── dto/
    │   │   │   └── create-order.dto.ts
    │   │   ├── orders.controller.ts
    │   │   ├── orders.module.ts
    │   │   └── orders.service.ts
    │   │
    │   ├── shared/
    │   │   ├── config/
    │   │   ├── slug/
    │   │   └── shared.module.ts
    │   │
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   └── main.ts
    ├── test/
    ├── package.json
    ├── tsconfig.json
    └── README.md

## Опис реалізації

### 1. Глобальна валідація даних

Для перевірки вхідних даних налаштовано глобальний `ValidationPipe` у файлі `main.ts`.

Під час налаштування використано такі параметри:

- `whitelist: true` — дозволяє залишати лише властивості, для яких визначено декоратори валідації.
- `forbidNonWhitelisted: true` — забороняє передавання властивостей, які не описані в DTO.
- `transform: true` — перетворює звичайні об'єкти запитів на екземпляри відповідних класів DTO.

Завдяки глобальній реєстрації ValidationPipe перевірка виконується автоматично для всіх відповідних запитів застосунку.

### 2. Валідація DTO

Для перевірки даних страв використано бібліотеку `class-validator`.

У класі `CreateDishDto` визначено правила перевірки полів:

- `title` — має бути рядком і не може бути порожнім;
- `price` — має бути числом і додатним значенням;
- `weightGrams` — має бути числом не менше 10;
- `calories` — має бути числом, не меншим за 0;
- `isSpicy` — має бути логічним значенням.

<img width="739" height="431" alt="зображення" src="https://github.com/user-attachments/assets/40245f3f-e3da-48ed-8d70-94a73ab43bb8" />


У класі `UpdateDishDto` використано ті самі правила, але всі поля зроблено необов'язковими за допомогою `@IsOptional()`.

<img width="757" height="555" alt="зображення" src="https://github.com/user-attachments/assets/17c13116-6df6-4923-ab1a-7bd33f4522ec" />


Це дозволяє оновлювати лише окремі властивості страви без необхідності передавати всі поля.

### 3. TrimPipe

Створено власний Pipe `TrimPipe` у файлі `common/pipes/trim.pipe.ts`.

Його призначення — автоматичне очищення текстових значень від зайвих пробілів на початку та в кінці рядків.

Для цього реалізовано метод `transform()`, який:

- перебирає властивості отриманого об'єкта;
- перевіряє тип кожного значення;
- застосовує метод `trim()` до рядків;
- рекурсивно обробляє вкладені об'єкти.

`TrimPipe` зареєстровано глобально в `main.ts` перед `ValidationPipe`, тому очищення текстових значень відбувається до перевірки DTO.

### 4. HttpLoggerMiddleware

Створено власний HTTP Middleware `HttpLoggerMiddleware` у файлі `common/middleware/http-logger.middleware.ts`.

Для виведення повідомлень використовується клас `Logger` із NestJS.

Middleware фіксує такі дані:

- HTTP-метод запиту;
- URL запиту;
- статус HTTP-відповіді;
- IP-адресу клієнта;
- тривалість обробки запиту в мілісекундах.

Для вимірювання часу використовується `Date.now()`. Обробник події `finish` дозволяє отримати інформацію після завершення HTTP-відповіді.

Формат повідомлення:

    [HTTP] GET /dishes 200 +4ms IP: ::ffff:127.0.0.1

### 5. Реєстрація Middleware

Для підключення Middleware використано механізм `NestModule`.

У `AppModule` реалізовано метод `configure()`, у якому за допомогою `MiddlewareConsumer` зареєстровано `HttpLoggerMiddleware`.

Метод `forRoutes('*')` забезпечує застосування Middleware до всіх маршрутів застосунку.

## Тестування API

Тестування виконувалося за допомогою розширення Thunder Client у Visual Studio Code.

### 1. Перевірка валідації даних (PATCH)

Запит:

    PATCH http://localhost:3000/dishes/1

Тіло запиту:

    {
      "price": -50
    }

Результат: сервер відхилив запит, оскільки ціна не може бути від'ємною.

<img width="974" height="309" alt="зображення" src="https://github.com/user-attachments/assets/51731fbf-69de-4e25-b80b-493662712256" />


Статус відповіді — `400 Bad Request`.

### 2. Перевірка TrimPipe (POST)

Запит:

    POST http://localhost:3000/dishes

Тіло запиту:

    {
      "title": "   Піца Маргарита   ",
      "price": 220,
      "weightGrams": 450,
      "calories": 850,
      "isSpicy": false
    }

Результат: зайві пробіли на початку та в кінці назви страви було автоматично видалено.

<img width="974" height="384" alt="зображення" src="https://github.com/user-attachments/assets/da75cd07-cb5b-49eb-9ac7-f63fb572e4ba" />


### 3. Перевірка HttpLoggerMiddleware (GET)

Запит:

    GET http://localhost:3000/dishes

Результат: запит успішно оброблено. У консолі NestJS з'явилося повідомлення:

    [HTTP] GET /dishes 200 +4ms IP: ::ffff:127.0.0.1

<img width="974" height="934" alt="зображення" src="https://github.com/user-attachments/assets/4a050639-b2d2-46d6-b08f-57b735f0c63b" />



## Висновок

Під час виконання практичної роботи було ознайомлено з процесом обробки HTTP-запитів у NestJS. 
