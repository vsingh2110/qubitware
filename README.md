# My React App

This is a React application built using Vite, TypeScript, and SWC. The project is styled with Tailwind CSS and follows a modular folder structure for better organization and maintainability.

## Project Structure

The project is organized into the following main directories:

- **src/**: Contains all the source code for the application.
  - **components/**: Contains reusable UI components.
    - **common/**: Shared UI components.
    - **layout/**: Layout components (Header, Footer, Sidebar, Navigation).
    - **forms/**: Form components (LoginForm, RegisterForm, ContactForm).
    - **features/**: Feature-specific UI components (auth, jobs, applicants, interviews, analytics).
  - **pages/**: Contains the application's pages.
    - **public/**: Publicly accessible pages (Home, RequestQuote, Login, Register, JobSearch, JobApply, Profile).
    - **protected/**: Protected pages requiring authentication (admin and candidate).
  - **services/**: API integration services.
  - **features/**: Business logic.
  - **context/**: React context providers.
  - **hooks/**: Custom hooks.
  - **types/**: TypeScript types.
  - **utils/**: Utility functions.
  - **constants/**: Static values and enums.
  - **assets/**: Static assets (images, styles).
  - **styles/**: Global styles.
  - **config/**: App configuration files.
  - **tests/**: Integration and unit tests.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-react-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Built With

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **SWC**: A super-fast JavaScript/TypeScript compiler.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.