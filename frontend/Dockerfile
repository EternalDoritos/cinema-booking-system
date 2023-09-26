# Use an official Node runtime as parent image
FROM node:18

# set the working directory
WORKDIR /app

#Copy package and package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the next app for production
RUN npm run build

#expose the port
EXPOSE 3000

#start the app
CMD ['npm','start']