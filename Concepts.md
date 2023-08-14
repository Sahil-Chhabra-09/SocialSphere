### Packages required for backend

```
npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
```

- meh
- process request body
- password encryption
- cross origin request
- environment variables
- file upload
- upload our files locally
- request safety
- logging
- authentication
- mongodb access

### Packages required for frontend

```
npm install react-redux @reduxjs/toolkit redux-persist react-dropzone dotenv formik yup react-router-dom@6 @mui/material @emotion/react @emotion/styled @mui/icons-material
```

- state management
- easy way to use redux
- to store states locally
- handles file upload /handling to send to backend
- environment variables
- form handling
- validation
- handling routes

### DATA MODELS

[whimsical](https://whimsical.com/social-sphere-models-MTFndWMLYNMFexrzR2EAtG)

Authentication : Identifaction of user when logging in

Autherization : Giving someone authority to do something

### Routes defined

Sign Up route
Login Route
JWT token verification Route
User Route
