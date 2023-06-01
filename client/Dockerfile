# Use the official Node.js 14 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]