# Use official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the backend code

COPY . .

# Expose the port the backend will run on
EXPOSE 5000

# Run the backend server
CMD ["node", "index.js"]
