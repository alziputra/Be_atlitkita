# AtlitKita Backend
Aplikasi ini merupakan backend untuk sistem manajemen kompetisi olahraga, di mana terdapat peran Admin dan Judge. Aplikasi ini menggunakan Express.js untuk membangun API, JWT untuk otentikasi, dan Role-Based Access Control (RBAC) untuk mengatur hak akses.

### Role-Based Access Control (RBAC)

1. **Admin** memiliki akses penuh untuk mengelola:
    - Kompetisi
    - Atlet
    - Pengguna
    - Hasil pertandingan
2. **Judge** hanya dapat:
    - Memberikan penilaian terhadap atlet dalam pertandingan.

### 1. **Auth Endpoints**

- **POST** `/api/users/login`
    - **Body**:
	```json
	    {   
		    "usernameOrEmail": "admin@example.com",
		    "password": "adminpassword" 
		}
    ```
        
    - **Response**:
    ```json
	    {
			"accessToken": "<access_token>",
			"refreshToken": "<refresh_token>",   
			"message": "Login berhasil" 
		}
	```

### 2. **Admin Endpoints (Access for Admin Only)**

#### a. **Competitions**
- **GET** `/api/competitions`
- **POST** `/api/competitions`
- **PUT** `/api/competitions/:id`
- **DELETE** `/api/competitions/:id`

#### b. **Athletes**
- **GET** `/api/athletes`
- **POST** `/api/athletes`
- **PUT** `/api/athletes/:id`
- **DELETE** `/api/athletes/:id`

#### c. **Results**
- **GET** `/api/results`
- **POST** `/api/results`
- **PUT** `/api/results/:id`
- **DELETE** `/api/results/:id`

### 3. **Judge Endpoints (Access for Judge Only)**

#### a. **Scores**

- **POST** `/api/scores`
    - Digunakan oleh **Judge** untuk memberikan penilaian.
- **GET** `/api/scores`
    - Melihat semua skor yang diberikan oleh para **Judge**.

## Keamanan API

1. **Autentikasi**: Menggunakan **JWT** untuk autentikasi pengguna.
2. **Otorisasi**: Role-Based Access Control (RBAC) digunakan untuk membatasi akses ke resource tergantung pada peran pengguna (**Admin** atau **Judge**).
3. **Middleware**: Middleware **verifyToken** untuk memverifikasi token dan **verifyRole** untuk memastikan hak akses pengguna.