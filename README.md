# Epargne-Controle

## Description

**Epargne-Controle** is a web application designed to help users track and manage their expenses and savings. It all started because, like many students, I had to keep an eye on my budget if I wanted to eat something other than pasta at the end of the month. And, being lazy, I didn't want to learn how to use an existing solution... so I spent even more time building my own. Classic programmer logic ahah.

**IMPORTANT:** This project NEVER interacted with any banking APIs or services. It is purely for personal budget management and does not handle any real money transactions.

## Features

- Manage multiple accounts (checking, savings)
- Record and categorize operations (income, expenses, transfers)
- Create and manage regular events (recurring transactions)
- Budget tracking and analytics (charts, forecasts, CSV export)
- Transaction history and verification

<img height="300" alt="image" src="https://github.com/user-attachments/assets/9aa273cf-a04b-4c23-be79-20e6be515a96" />

## Technologies Used

- PHP (backend logic)
- MariaDB (database)
- Smarty (template engine) - Will be replaced in future versions
- JavaScript (frontend logic, Chart.js for data visualization)
- Vanilla HTML/CSS

## Installation

1. Clone the repository:
	```sh
	git clone https://github.com/SilvaUnCompte/epargne-controle.git
	```
2. Set up a local web server (e.g., XAMPP) and place the project in the `htdocs` directory.
3. Configure the database with .env file or directly in the code (`database/connexion.php`).
4. Import the database schema (see `database/tables/` for table definitions).
5. Access the app via `http://localhost/epargne-controle` in your browser.

## Usage

1. Register or log in with your email and password.
2. Create accounts (checking/savings) and set initial balances.
3. Add operations (income, expenses, transfers) and categorize them.
4. Set up regular events for recurring transactions (e.g., monthly rent).
5. View analytics and budget charts to monitor your financial health.
6. Export data as CSV if you're crazy about statistics (or just want to analyze your data further).

<img height="300" alt="image" src="https://github.com/user-attachments/assets/2cec5d97-2fc2-4919-8567-406536f8db2e" />

## Folder Structure

- `assets/` - Images and vendor libraries
- `controler/` - PHP controllers for CRUD operations and page rendering
- `database/` - Database connection and table definitions
- `public/` - Frontend assets (JS, CSS, templates)
- `public/templates/` - Smarty templates for UI pages

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. See the [LICENSE](LICENSE) file for details.
