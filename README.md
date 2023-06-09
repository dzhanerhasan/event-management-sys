# Event Management System (EMS)

This Event Management System is a full stack application developed using React.js for the frontend and Django Rest Framework for the backend. It allows users to create, view, and manage events.

## Structure

The project is organized into two main directories:

- `ems-front-end/`: Contains the React.js frontend application code.
- `ems_rest_api/`: Contains the Django REST API code for the backend.

## Features

- User Authentication: Register, Login, Logout
- Event Creation: Authorized users can create new events
- Event Listing: Users can view upcoming events
- Event Participation: Users can choose to participate in events
- Event Management: Event creators can delete their events

## Local Development Setup

Here are the steps to setup the project locally:

### Backend

1. Navigate to the `ems_rest_api/` directory.
2. Set up a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Django server:

   ```bash
   python manage.py runserver
   ```

### Frontend

1. Navigate to the `ems-front-end/` directory.
2. Install the required packages:

   ```bash
   npm install
   ```

3. Run the React development server:

   ```bash
   npm start
   ```

Now, you should be able to see the application running at [http://localhost:3000](http://localhost:3000).
