To test All API endponts on POSTMAN you can take bellow reference:

# Cinema Booking System Backend
This project is a backend API for a cinema booking system, built using Node.js, Express.js, MongoDB, and various libraries for validation, authentication, and third-party integrations. The project supports user authentication, OTP verification, cinema hall management, movie management, and payment processing using Razorpay.

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [API Endpoints](#api-endpoints)
    - [Authentication & OTP Verification](#authentication--otp-verification)
    - [Cinema Hall Management](#cinema-hall-management)
    - [Movie Management](#movie-management)
    - [Contact Us](#contact-us)
    - [Show Management](#show-management)
    - [Razorpay Payment Integration](#razorpay-payment-integration)
5. [Error Handling](#error-handling)

---

## Requirements

To run this project, you need:

- Node.js (version 14.x or higher)
- MongoDB
- Razorpay account (for payment processing)
- Gmail account for email-based OTP verification

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/cinema-booking-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd cinema-booking-backend
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Set up your `.env` file following the format provided in the next section.

5. Start the server:

    ```bash
    npm start
    ```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

-MONGO_URI=your_mongodb_connection_string
-JWT_SECRET=your_jwt_secret
-RAZORPAY_KEY_ID=your_razorpay_key_id
-RAZORPAY_KEY_SECRET=your_razorpay_key_secret
-EMAIL_USER=your_gmail_address
-EMAIL_PASS=your_gmail_password

## Index.js setUp
-const MONGODB_URI = "--MongoDB connection Link--";
-const DB_NAME = "--Database Name--";

## API Endpoints

### Authentication & OTP Verification

1. **User Registration**
   - **Endpoint**: `/auth/register`
   - **Method**: `POST`
   - **Description**: Registers a new user and sends an OTP for email verification.
   - **Request Body**:
     ```json
     {
         "firstName": "John",
         "lastName": "Doe",
         "username": "johndoe",
         "phoneNumber": "9876543210",
         "email": "johndoe@gmail.com",
         "password": "password123",
         "role": "user"
     }
     ```

2. **OTP Verification**
   - **Endpoint**: `/auth/verify-otp`
   - **Method**: `POST`
   - **Description**: Verifies the OTP sent to the user's email.
   - **Request Body**:
     ```json
     {
         "email": "johndoe@gmail.com",
         "otp": "123456"
     }
     ```

3. **User Login**
   - **Endpoint**: `/auth/login`
   - **Method**: `POST`
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
         "email": "johndoe@gmail.com",
         "password": "password123"
     }
     ```

4. **Logout**
   - **Endpoint**: `/auth/logout`
   - **Method**: `POST`
   - **Description**: Logs out the user.
   - **Request Body**:
     ```json
     {
         "email": "johndoe@gmail.com"
     }
     ```

5. **Resend OTP**
   - **Endpoint**: `/auth/resend-otp`
   - **Method**: `POST`
   - **Description**: Resends an OTP for email verification.
   - **Request Body**:
     ```json
     {
         "email": "johndoe@gmail.com"
     }
     ```

---

### Cinema Hall Management

1. **Add Cinema Hall**
   - **Endpoint**: `/cinema-hall/add-cinema-hall`
   - **Method**: `POST`
   - **Description**: Adds a new cinema hall.
   - **Request Body**:
     ```json
     {
         "hallNumber": 1,
         "filmName": "Inception",
         "numberOfSeats": 150,
         "numberOfSoldTickets": 50,
         "priceOfShow": 300,
         "date": "2024-09-20",
         "time": "18:00"
     }
     ```

2. **Get All Cinema Halls**
   - **Endpoint**: `/cinema-hall/`
   - **Method**: `GET`
   - **Description**: Retrieves all cinema halls.

3. **Get Cinema Hall by ID**
   - **Endpoint**: `/cinema-hall/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a cinema hall by its ID.

4. **Get Cinema Halls by Film Name**
   - **Endpoint**: `/cinema-hall/by-film-name`
   - **Method**: `GET`
   - **Description**: Retrieves cinema halls showing a specific film. Query param: `name`.

5. **Delete Cinema Hall**
   - **Endpoint**: `/cinema-hall/delete-cinema-hall/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a cinema hall by ID.

---

### Movie Management

1. **Add Movie**
   - **Endpoint**: `/movie/add-movie`
   - **Method**: `POST`
   - **Description**: Adds a new movie.
   - **Request Body**:
     ```json
     {
         "title": "Inception",
         "description": "A mind-bending thriller...",
         "genre": "Sci-Fi",
         "releaseDate": "2010-07-16",
         "image": "https://example.com/inception.jpg"
     }
     ```

2. **Get All Movies**
   - **Endpoint**: `/movie/`
   - **Method**: `GET`
   - **Description**: Retrieves all movies.

3. **Update Movie**
   - **Endpoint**: `/movie/update-movie/:id`
   - **Method**: `PUT`
   - **Description**: Updates a movie by ID.

4. **Delete Movie**
   - **Endpoint**: `/movie/delete-movie/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a movie by ID.

5. **Search Movies by Name**
   - **Endpoint**: `/movie/search-by-name?name=Inception`
   - **Method**: `GET`
   - **Description**: Searches for movies by title.

---

### Contact Us

1. **Submit Contact Form**
   - **Endpoint**: `/contact/`
   - **Method**: `POST`
   - **Description**: Submits a contact form.
   - **Request Body**:
     ```json
     {
         "name": "John Doe",
         "email": "johndoe@gmail.com",
         "message": "Hello, I have a query..."
     }
     ```

---

### Show Management

1. **Add Show**
   - **Endpoint**: `/show/add-show`
   - **Method**: `POST`
   - **Description**: Adds a new show for a specific movie.

---

### Razorpay Payment Integration

1. **Create Razorpay Order**
   - **Endpoint**: `/razorpay/create-order`
   - **Method**: `POST`
   - **Description**: Creates a Razorpay order for a ticket payment.
   - **Request Body**:
     ```json
     {
         "ticketId": "ticket_id_here"
     }
     ```

2. **Verify Razorpay Payment**
   - **Endpoint**: `/razorpay/verify-payment`
   - **Method**: `POST`
   - **Description**: Verifies the Razorpay payment and updates the ticket status.
   - **Request Body**:
     ```json
     {
         "order_id": "razorpay_order_id",
         "payment_id": "razorpay_payment_id",
         "signature": "razorpay_signature",
         "ticketId": "ticket_id_here"
     }
     ```

---

### Error Handling

All endpoints return appropriate status codes and error messages. Common status codes include:

- **200 OK**: For successful requests.
- **201 Created**: For successful creation of resources.
- **400 Bad Request**: For invalid or missing data.
- **404 Not Found**: When the requested resource is not found.
- **500 Internal Server Error**: For server-side errors.
