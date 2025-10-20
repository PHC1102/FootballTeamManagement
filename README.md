# Football Team Management Application

This is a full-stack web application for managing football teams and players, built with React on the frontend and Node.js/Express on the backend, following Object-Oriented Programming principles.

## Project Structure

```
FootballTeamManagement/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/                # Source code
│       ├── models/         # Data models (OOP classes)
│       ├── services/       # API services
│       ├── components/     # React components
│       └── App.js          # Main application component
├── src/                    # Backend source code
│   ├── controllers/        # Request handlers (OOP classes)
│   ├── models/             # Data models (OOP classes)
│   ├── routes/             # API routes
│   └── services/           # Business logic services (OOP classes)
├── server.js               # Entry point for the backend
├── package.json            # Backend dependencies
└── .env                    # Environment variables
```

## Technologies Used

- **Frontend**: React, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Architecture**: RESTful API, Object-Oriented Programming

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install backend dependencies:
   ```
   cd FootballTeamManagement
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd client
   npm install
   cd ..
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run client
   ```

3. Or start both concurrently:
   ```
   npm run dev:all
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get a specific player
- `POST /api/players` - Create a new player
- `PUT /api/players/:id` - Update a player
- `DELETE /api/players/:id` - Delete a player

## OOP Principles Implemented

1. **Encapsulation**: Classes encapsulate data and methods that operate on that data
2. **Inheritance**: Controller classes extend a base controller
3. **Abstraction**: Complex operations are hidden behind simple interfaces
4. **Polymorphism**: Methods can be overridden in child classes

## Development

To run the application in development mode:

```bash
# Run backend only
npm run server

# Run frontend only
npm run client

# Run both concurrently
npm run dev:all
```

## Building for Production

```bash
# Build the React frontend
npm run build

# Start the production server
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please open an issue on the repository.