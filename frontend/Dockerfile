
# Use official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose port for the frontend
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]





# # Use official Node.js image as a base image for building
# FROM node:14 AS build

# # Set the working directory
# WORKDIR /app

# # Copy the package.json and package-lock.json
# COPY package*.json ./

# # Install the frontend dependencies
# RUN npm install


# # Copy the rest of the frontend files
# COPY . .



# # Build the React app
# RUN npm run build

# # Use nginx to serve the frontend
# FROM nginx:alpine

# # Copy the build folder from the previous stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose the port nginx will run on
# EXPOSE 80

# # Start nginx server
# CMD ["nginx", "-g", "daemon off;"]
