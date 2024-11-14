# Use official Node.js image as a base image for building
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY frontend/package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Build the React app
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx will run on
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
