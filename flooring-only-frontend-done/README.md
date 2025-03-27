# Flooring Website with Admin Dashboard

A modern flooring business website with a secure admin dashboard for managing products.

## Features

- Modern, responsive design using Tailwind CSS
- Secure admin authentication
- Product management (CRUD operations)
- Dynamic product display on the frontend
- Real-time updates when products are modified

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
flooring-only-frontend-done/
├── inance-html/           # Frontend files
│   ├── admin.html        # Admin dashboard
│   ├── service.html      # Products page
│   ├── index.html        # Home page
│   ├── about.html        # About page
│   ├── contact.html      # Contact page
│   ├── css/             # CSS files
│   ├── js/              # JavaScript files
│   └── images/          # Image assets
├── server/              # Backend server
│   ├── server.js        # Main server file
│   ├── data/           # JSON data files
│   └── .env            # Environment variables
└── package.json        # Frontend dependencies
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd flooring-only-frontend-done
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Create a `.env` file in the server directory:
```env
PORT=3001
JWT_SECRET=your-super-secret-key-change-this-in-production
```

5. Start the backend server:
```bash
cd server
npm run dev
```

6. Open the website in your browser:
- Frontend: `http://localhost:3001`
- Admin Dashboard: `http://localhost:3001/admin.html`
- Products Page: `http://localhost:3001/service.html`

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**Important**: Change these credentials in production!

## API Endpoints

- `POST /api/login` - Admin login
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

## Security Notes

1. The admin dashboard is protected by JWT authentication
2. All admin routes require a valid JWT token
3. Passwords are hashed using bcrypt
4. CORS is enabled for development
5. Environment variables are used for sensitive data

## Development Notes

- The frontend uses Tailwind CSS for styling
- The backend uses Express.js with JSON file storage
- All API requests are made to `http://localhost:3001/api`
- The admin token is stored in localStorage

## Production Considerations

1. Change the JWT secret in the `.env` file
2. Update the default admin credentials
3. Set up proper CORS configuration
4. Consider using a proper database instead of JSON files
5. Implement rate limiting
6. Add input sanitization
7. Set up proper error logging
8. Configure HTTPS

## License

MIT License 