<h1 align='center'>Mount Pizza</h1>

<p align='center'>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/github/license/k99sharma/OIBSIP"/>
  </a>
  
  <a href="https://app.netlify.com/sites/mountpizza/deploys">
    <img alt="deploy" src="https://img.shields.io/netlify/72c40fed-3dfa-42ad-9c2b-b2d954ec4ba9" />
  </a>
 
  <a>
    <img alt="tag" src="https://img.shields.io/github/v/tag/k99sharma/OIBSIP" />
  </a>
</p>

<p align='center'>
  🍕 Mount Pizza is a pizza ordering application created using the MERN stack. User can create an account and add pizzas to cart from menu and proceed to checkout. Admin can add new toppings and create new pizzas for users. Admin can also access all user information.
</p>

![Screenshot (55)](https://user-images.githubusercontent.com/54969439/160991711-50dcdc64-411d-4ac6-b138-637844164a7f.png)

## Tech Stack & Open-source libraries
- [ReactJs](https://reactjs.org/) library is used to create the web application.
- [TailwindCSS](https://tailwindcss.com/) library is used for CSS framework.
- [Razorpay](https://razorpay.com/) is used for payment method integration.

## How to setup locally
- Clone the github repo
  ```
  git clone https://github.com/k99sharma/OIBSIP.git
  ```
- Move into the directory
  ```
  cd OIBSIP
  ```
- Install dependecies
  ```
  npm install
  ```
- Create an environment variable file name `.env`
- Copy all the keys from `.env.sample` and put it in `.env` and all required values.
- Run the application
  ```
  npm run start
  ```
 - Now you are good to go!



## Features
- Login and Signup Feature using JSON Web Token authentication.
- Responsive Design for mobile devices.

### USER
- Cart System is based on shopping cart system in an e-commerce website.
- Menu for displaying pizza where user can add pizzas to the cart. Price is automatically calculated in the cart.
- User can also remove pizzas from cart.
- Payment method is integrated in application using Razorpay.

### ADMIN
- Admin Dashboard is created to keep track of items on the website.
- Only the admin can convert users to admin.
- Create and delete the topping for pizza.
- Can create and delete pizzas.
- Pizza price is automatically calculated based on pizza base and toppings.

You can checkout API [here](https://github.com/k99sharma/mount-pizza-api).

## Find this repository userful? :heart:
Star the repository. 🌟
<br>Also, __[Follow me](https://github.com/k99sharma)__ on GitHub for my next creations! 😎

# LICENSE
```xml
Designed and developed by 2022 (Kalash Sharma)

Licensed under the MIT License, (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
