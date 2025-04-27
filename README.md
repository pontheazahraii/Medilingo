# [MediLingo](https://medilingo-227943627758.us-central1.run.app)

MediLingo is a web-based educational platform that helps users, including patients, caregivers, and medical students, learn essential medical terminology through interactive flashcards, quizzes, and mini-games. It combines a dynamic frontend with a live database-backed backend for real-time learning experiences.

---

## Contributors
- [Natalie Huante](mailto:huante@chapman.edu)
- [Devyn Miller](mailto:devmiller@chapman.edu)
- [Tiffany Le](mailto:tifle@chapman.edu)
- [Ponthea Zahraii](mailto:zahraii@chapman.edu)

---

## Project Structure Overview

| Layer | Technology Stack |
|:------|:-----------------|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS + Shadcn UI |
| Backend | Node.js + FastAPI serving a RESTful API |
| Database | PostgreSQL (hosted on Google Compute Engine VM) |
| Deployment | Google Cloud Run (backend), Vercel/local (frontend) |
| Authentication | NextAuth.js (Google OAuth sign-in) |
| API Documentation | Swagger UI |

---

## Frontend
The MediLingo frontend is a fully responsive Next.js application designed for scalability and modularity. It features:

- **Dynamic Flashcards**: Live API data is used to render flashcards with real medical terms and definitions.
- **Session-Based Progress Tracking**: Users' progress is tracked per session (resets on refresh) without requiring backend persistence.
- **Accessibility Features**: Text-to-speech integration (via Web Speech API) to support multi-sensory learning.
- **Modern Design System**: Tailwind CSS and Shadcn UI provide a clean, responsive, and mobile-friendly interface.
- **Authentication (in progress)**: OAuth login via Google using NextAuth.js, with plans for full user-specific progress tracking.
- **Performance Optimizations**: Lazy loading, session storage fallback, and responsive grid layouts ensure a smooth user experience.

**Local Frontend Development Instructions:**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 to view the app
```

---

## Backend

### Google Cloud Platform

#### IAM Permissions
The project requires the following IAM roles for deployment and maintenance:
- `Compute Organization Resource Admin`
- `Cloud Run Admin`
- `Secret Manager Secret Accessor`
- `Artifact Registry Writer`
- `Compute Network Admin`

#### Compute Engine Virtual Machine
- The PostgreSQL database is hosted on a dedicated [Compute Engine VM](https://35.239.87.6/).
- This VM acts as a remote database server, which the Node.js and FastAPI backend connects to over the network.
- **Database tables include**: users, terminology, systems, questions, user_progress.

#### Cloud Run
- The Node.js backend API is hosted on Google Cloud Run.
- Automated container builds are triggered from GitHub via CI/CD pipelines.
- API base URL: [https://api-endpoint-227943627758.us-central1.run.app](https://api-endpoint-227943627758.us-central1.run.app)

#### API Documentation
- All endpoints are documented via [Swagger UI](https://api-endpoint-227943627758.us-central1.run.app/docs).

---

### Docker Build Instructions
To build and run the app locally using Docker:
```bash
# Build the Docker image
docker build -t medilingo-app .

# Run the container
docker run -p 3001:3001 medilingo-app
```
To build and run the API locally using Docker:
```bash
# Build the Docker image
docker build -t medilingo-api .

# Run the container
docker run -p 8080:8080 medilingo-api
```
---

## Key Features and Highlights
- Live API-driven flashcard content.
- Responsive grid layout optimized for mobile and desktop.
- Stateless session-based tracking (no login needed yet).
- Multi-sensory learning via text-to-speech support.
- Modular, scalable design across frontend and backend.
