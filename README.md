# TestBear AI Study Assistant

This project integrates OpenAI chatbot functionality into the TestBear SAT preparation platform, allowing students to get real-time assistance with SAT questions.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- OpenAI API key

### Environment Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   # OpenAI API configuration
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_ORG_ID=your_organization_id_here  # Optional
   OPENAI_PROJECT_ID=your_project_id_here   # Optional

   # Server configuration
   PORT=3001
   NODE_ENV=development
   ```

### Running the Application Locally

To run the React app locally:
```
npm run start
```

## Deploying to Vercel

### Prerequisites for Vercel Deployment
- A [Vercel](https://vercel.com) account
- Vercel CLI (optional): `npm i -g vercel`

### Deployment Steps

1. **Set up environment variables in Vercel**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the following environment variables:
     ```
     OPENAI_API_KEY=your_openai_api_key
     OPENAI_ORG_ID=your_organization_id (if applicable)
     OPENAI_PROJECT_ID=your_project_id (if applicable)
     ```

2. **Deploy using Vercel CLI**:
   ```
   vercel
   ```
   Or deploy directly from GitHub by connecting your repository in the Vercel dashboard.

3. **Verify API endpoints**:
   After deployment, verify that your API endpoints are working by accessing:
   ```
   https://your-vercel-domain.vercel.app/api/health
   ```

### Project Structure for Vercel

This project is set up with a specific structure for Vercel deployment:

- `/api` - Serverless functions for API endpoints
- `/api/ask-gpt.js` - OpenAI integration endpoint
- `/api/chat.js` - Backward compatibility endpoint
- `/vercel.json` - Vercel configuration file

## Features

- Interactive AI assistant for SAT test preparation
- Real-time question assistance without revealing answers
- Specialized in teaching strategic approaches to test-taking
- Fallback capability between different API providers

## Technologies Used

- React.js + TypeScript for the frontend
- Vercel Serverless Functions for the backend
- OpenAI API for AI assistant functionality

## Architecture

- Frontend: React application serving SAT practice tests and interface
- Backend: Vercel Serverless Functions handling AI API requests
- Communication: REST API between frontend and backend

## Notes for Developers

- The system is designed to prioritize the OpenAI endpoint (`/api/ask-gpt`) but will fall back to the secondary endpoint (`/api/chat`) if needed
- Both endpoints expect similar payload structure for backward compatibility
- No Express server is needed when deploying to Vercel - all API functionality is handled by serverless functions

## License

This project is for demonstration purposes only.

## Contact

If you have any questions or feedback, please open an issue in this repository.
