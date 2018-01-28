>To make the project run successfully on your computer follow the steps below

>Note that this project uses Lumen for API.To learn about Lumen check https://github.com/laravel/lumen

## Step1:
> Beside this project download Lumen backend in this link: https://github.com/Rolanddoda/Lumen-API-for-vueJS-project

## Step2:
> Navigate to your VueJS project you have donwloaded,by terminal and install dependencies like below:

npm install

## Step3:
> Next,type the below code serve the frontend:

npm run dev

## Step4:
> Now,you have to configure the backend which is the Lumen project you have donwloaded.
> So,change the DB details in the .env file and also in the /config/database.php.
>Then open CMD,Go to the directory where the project is and enter the command like below:

composer install

## Step5:
>Then migrate the Database you have configured and then run:

php artisan migrate

## Step6:
>Next the seed:

php artisan migrate db:seed

## Step7
>Finally in vueJS-project in src\Axios Instances open the lumenRequest.js and in baseURL
you have to type the url that lumen runs.Propably is http://localhost:8080

>Finally run:

php artisan serve

## Enjoy it ##




