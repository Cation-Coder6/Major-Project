FROM node:14

# Set the working directory inside the Docker container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files to the Docker container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn

# Copy the rest of the application to the Docker container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "run", "dev"]
