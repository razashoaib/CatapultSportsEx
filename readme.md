## CatapultSportsEx [Laravel(v5.6) with React(v16.4.1)]

The goal of this project is to create an API and simple Front-end to demonstrate the CRUD operations using RESTful Web Services. The API is developed using Laravel Framework (v5.6) and the Front-end was developed using React (v16.4.1). Thus, this project is a perfect example to demonstrate that how can we use React with Laravel Framework.

## API Documentation
[Click here](https://documenter.getpostman.com/view/4947249/RWMLKmKt) to see the API documentation v1.

### Instructions to Run

- Make sure you are using XAMPP, WAMPP or any other Web Server with MySQL enabled for this application to work, the Server should be up and running.
- Clone the project and put it inside htdocs (or whatever directory your server is using).
- Create a .env file in the root of your project.
  - The .env file should look similar to this:
    ```
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=base64:BjPCb2fTQJlvccOQpwRp2UfBwEpBd7yHH0NcMbNzGX4=
    APP_DEBUG=true
    APP_URL=http://localhost

    LOG_CHANNEL=stack

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=CatapultSportsDB
    DB_USERNAME=shoaib
    DB_PASSWORD=shoaib

    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    SESSION_DRIVER=file
    SESSION_LIFETIME=120
    QUEUE_DRIVER=sync

    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_DRIVER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null

    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1

    MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

    ```
    - Make sure to change DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD with respect to your DB credentials.
    - The database configuration should be same in the `config\database.php` file.
    
- Now run the following command:
  - `npm run build-project` if this command doesn't work successfully, run the below commands in sequence and try to fix the        problem manually:
      ```
      composer install
      composer update
      php artisan key:generate
      php artisan preset react
      npm install && npm run dev
      php artisan migrate:install
      php artisan migrate
      php artisan passport:install
      php artisan db:seed
      
      ```
- After running the commands successfully, if your server is not running on `localhost`, goto `/resources/assets/js/Utilities/Constants.js` and change the `export const BASE_URL = "http://localhost";` variable to your server's base URL.

- Run `npm run dev` and go to http://localhost from your browser to see the app in action.

### Screenshots

![Screenshot1](/AthletesView.png?raw=true "Athletes View")

![Screenshot2](/SportsView.png?raw=true "Sports View")

![Screenshot3](/TeamsView.png?raw=true "Teams View")

![Screenshot4](/AddAthleteView.png?raw=true "Add Athlete View")

![Screenshot5](/UpdateAthleteView.png?raw=true "Update Athlete View")

![Screenshot6](/RegisterUserView.png?raw=true "Register User View")

![Screenshot7](/LoginView.png?raw=true "Login View")

### Project Built Using

- git
- Node v8.11.3
- NPM v6.2.0
- Composer v1.6.3
- Laravel v5.6
- React v16.4.1
- Laradock (optional)

### Acknowledgements

- [W3Schools](https://www.w3schools.com/)
- [Laravel Documentation](https://laravel.com/docs/5.6/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Stack Overflow](https://stackoverflow.com/)
- [CRUD in React and Express (MySQL)](https://medium.com/@avanthikameenakshi/crud-react-express-99025f03f06e)
