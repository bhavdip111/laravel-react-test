## How to run

0. Take clone of project

2. Copy `.env.example` to `.env` and fill out the database credentials
```
cp .env.example .env
```

3. Install composer dependencies
```
composer install
npm install
```

4. Run key generate, migrations and seeders
```
php artisan key:generate
php artisan migrate --seed
```

5. Build frontend asset
```
npm run dev
```

6. Run Laravel server
```
php artisan serve
```
You can access the project at `http://localhost:8000`