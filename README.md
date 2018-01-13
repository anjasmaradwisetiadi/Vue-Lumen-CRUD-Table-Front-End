To make the project run successfully on your computer follow the steps below

Note that this project uses Lumen for API.To learn about Lumen check https://github.com/laravel/lumen

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
>The last step is to migrate the Database you have configured and then run:
php artisan migrate

>Finally run:
>php artisan serve

## Enjoy it ##




