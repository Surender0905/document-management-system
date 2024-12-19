# Use a smaller official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application files into the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set the environment variable for production (you can change this if needed)
ENV NODE_ENV=production

# Start the app
CMD ["node", "index.js"]
