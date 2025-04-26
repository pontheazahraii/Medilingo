
# Use an official Node.js image
FROM node:18

# Create and set the app directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching npm install)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app files
COPY . .

# Expose the port your app runs on (optional, change if needed)
EXPOSE 3000

# Start your app
CMD ["node", "start-dev.js"]

