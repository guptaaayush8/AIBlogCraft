# Stage 1: Builder
FROM node:23-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy rest of the source code and run the build script
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:23-slim

WORKDIR /usr/src/app

# Copy only package files to install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build artifacts from builder stage (assumes output is in the "dist" folder)
COPY --from=builder /usr/src/app/ .

EXPOSE 3000

# Create .npm directory and adjust permissions
RUN mkdir /.npm && chown -R 1004730000:0 "/.npm"

CMD [ "npm", "start" ]



# FROM node:18

# WORKDIR /usr/src/app
# COPY . .

# RUN npm install --production
# RUN npm run build
# EXPOSE 3000
# RUN mkdir /.npm
# RUN  chown -R 1004730000:0 "/.npm"

# CMD [ "npm","start" ]