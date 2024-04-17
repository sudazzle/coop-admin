# Use an official Node.js runtime as a parent image
FROM node:20.11-alpine

# Set the working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the 'build' directory from your project folder to the container
COPY build /app/build

# Expose port 5000 (default port for serve)
EXPOSE 3000

# Command to run the serve module
CMD ["serve", "-s", "build", "-l", "3000"]