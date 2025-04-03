# Use the official Playwright image (includes all dependencies)
FROM mcr.microsoft.com/playwright:v1.43.1-focal

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Start your script
CMD ["node", "index.js"]
