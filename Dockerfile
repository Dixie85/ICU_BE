# Official Node.js runtime as a parent image
FROM node:14-alpine

# Setting working directory to be /app
WORKDIR /app

# Copying package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the Express app
EXPOSE 3000

# Define command to run the application
CMD ["node", "app.js"]