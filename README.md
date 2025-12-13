# Moonrow - Library Management System

A full-stack Library Management System built with Node.js, Express, MySQL and Sequelize that provides a comprehensive solution for cataloging books, managing patrons, tracking loans, and generating reports.

## Features

- **Book Management:** Add/edit/delete books with metadata, author links and copy tracking
- **Multi-Genre Support:** Books can belong to multiple genres via many-to-many relationship
- **Author Management:** CRUD operations for authors with book relationships
- **Genre Management:** Organize books by genre with flexible categorization
- **Borrower Management:** Track library patrons and contact information
- **Loan System:** Complete borrow/return workflow with status tracking
- **Overdue Detection:** Automatic flagging of loans older than 14 days
- **Inventory Tracking:** Monitor total and available copies per book
- **Analytics Dashboard:** KPIs, loan trends, genre distribution and popular titles
- **Search & Filtering:** Search books by title/author/genre with paginated lists
- **Authentication:** Secure user sessions with protected staff routes
- **Responsive UI:** Bootstrap-based interface with Handlebars templating

## Tech Stack

**Backend:**
- Node.js & Express.js
- Sequelize ORM
- MySQL database
- bcryptjs for password hashing
- express-session for session management
- csurf for CSRF protection

**Frontend:**
- Handlebars (express-handlebars)
- Bootstrap 5
- Font Awesome icons
- jQuery

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Codyaxe/moonrow.git
cd moonrow
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=library_db
DB_USER=your_username
DB_PASSWORD=your_password

SESSION_SECRET=your_secure_session_secret
NODE_ENV=development
```

4. **Set up the database:**

Create the MySQL database:
```sql
CREATE DATABASE library_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **Run migrations:**

The application uses Sequelize to auto-create tables. For the many-to-many Books↔Genres relationship, run the provided migration:

```bash
mysql -u your_username -p library_db < migrations/001_create_book_genres_table.sql
```

**Important:** Back up your database before running migrations if you have existing data.

## Running the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Project Structure

```
moonrow/
├── app/
│   ├── controllers/     # Request handlers and business logic
│   ├── middlewares/     # Authentication and middleware functions
│   └── models/          # Sequelize models (Books, Authors, Genres, etc.)
├── config/
│   └── database.js      # Database connection configuration
├── migrations/          # SQL migration scripts
├── public/              # Static assets (CSS, JS, images)
├── routes/
│   └── web.js          # Application routes
├── templates/          # Report templates and documentation
├── views/              # Handlebars templates
│   ├── layouts/        # Page layouts
│   └── partials/       # Reusable components
├── .env                # Environment variables (not in repo)
├── index.js            # Application entry point
└── package.json        # Dependencies and scripts
```

## Database Schema

The system uses a normalized MySQL schema with the following core tables:

- **Books:** BookID (PK), Title, AuthorID (FK), CopiesAvailable, PublishedYear
- **Authors:** AuthorID (PK), FirstName, LastName
- **Genres:** GenreID (PK), GenreName
- **BookGenres:** BookGenreID (PK), BookID (FK), GenreID (FK) — junction table for many-to-many
- **Borrowers:** BorrowerID (PK), Name, Email, Phone
- **Loans:** LoanID (PK), BookID (FK), BorrowerID (FK), BorrowDate, ReturnDate, Status
- **Users:** UserID (PK), Email, Password (hashed), Role
- **Sessions:** Session storage for authentication

**Key relationships:**
- Books ↔ Genres: Many-to-many via BookGenres
- Books → Authors: Many-to-one
- Loans → Books: Many-to-one
- Loans → Borrowers: Many-to-one

## Usage

### First-Time Setup

1. Create an admin user account via the sign-up page
2. Log in to access the dashboard
3. Add genres via the Genres menu
4. Add authors via the Authors menu
5. Add books and assign multiple genres
6. Add borrowers
7. Create loans to track book circulation

### Managing Books with Multiple Genres

When creating or editing a book:
1. Fill in the book details
2. Select one or more genres using the checkboxes
3. Save the book

Books will display with multiple genre badges in the list view.

### Dashboard Analytics

The dashboard provides:
- Total books, borrowers, active loans, available copies
- Loan trends over the last 12 months
- Books by genre distribution
- Recent loans and overdue items

## Development

**Running in development:**
```bash
npm run dev
```

This uses `nodemon` for automatic server restarts on file changes.

**Logging:**

Set `logging: true` in `config/database.js` to see SQL queries in the console.
