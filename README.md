# ThisNow!

## Project Description

ThisNow! is a web platform where you can explore posts from users all around the map! See custom markers for each post, click to get details, and interact with other users.

Create your own posts, check out what others are sharing, and chat in real-time. Everything you upload is safely stored in PostgreSQL, with images and files in Firebase.

Explore, share, and connect — all in one interactive map experience!

# https://thetaggers.netlify.app/

---



### Technologies
- **Frontend**
  - React
  - Zustand for global state
  - React Router for navigation
  - TailwindCSS for styling
  - React-Leaflet for interactive maps and custom markers
  - Firebase for file storage (used as a bucket)
- **Backend**
  - Node.js + Express
  - PostgreSQL + Sequelize for database
  - bcrypt for password hashing
  - jsonwebtoken for JWT authentication
  - Supertest for backend API tests

---

### Main Features

#### Authentication
- User registration and login with credentials
- Automatic login via stored cookies
- Clean logout flow, removing cookies and resetting state

#### Map
- Interactive map displaying posts with custom markers
- Popups with post details and user info
- Exploration mode ("Check Around") to find nearby posts
- Dynamic marker styling based on active post

#### Posts
- Create, view, and interact with posts
- Retrieve all posts or user-specific posts
- Filter posts by user in profile view

#### Chats
- Create chats between users
- List existing chats and view messages

#### State Management
- Global state with Zustand
- Separate stores: `userStore`, `postStore`, `chatStore`, `mapStore`, `appStore`

#### Navigation
- React Router for page navigation

