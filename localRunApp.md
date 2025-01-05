# **Guide: Build and Run the Project Locally Using Docker Compose**

This guide provides step-by-step instructions for setting up, building, and running your project locally using Docker Compose.

---

## **Prerequisites**

Before starting, ensure the following are installed on your local machine:

- **Git**: For cloning the project repository.
- **Docker**: Install Docker from [Docker's official website](https://www.docker.com/).
- **Docker Compose**: Included with Docker Desktop (for Windows/Mac) or install it manually for Linux.

---

## **Step-by-Step Instructions**

### **Step 1: Clone the Repository**
1. Open your preferred code editor (e.g., **VS Code**) and launch a terminal.
2. Navigate to the directory where you want to store the project.
3. Clone the repository and navigate into the project folder:
   ```bash
   git clone https://github.com/shivam-goswami5123/coding-blocks-project.git
   cd coding-blocks-project
    ```
### **Step 2: Set Up Environment Variables**
1. Ensure a .env file exists in the project’s root directory. 
2. If it doesn't exist, create it:
```bash
touch .env
```
3. Populate the .env file with the required variables. Example: 
```bash
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=postgres
DB_PORT=5432
JWT_SECRET=your_jwt_secret
#Note: Replace placeholder values (e.g., your_db_user) with actual credentials and secrets.
#Note: Place this env file in the root directory coding-blocks-project where docker-compose.yml file is present
```
### **Step 3: Review the docker-compose.yml File**
1. Open the docker-compose.yml file in your code editor. 
2. Verify it includes the necessary service definitions:  
    Database Service (e.g., PostgreSQL): Defines the configuration for the database container. 

    Application Services: Contains configurations for all microservices (e.g., user-service, blog-service, etc.). 

    NOTE: Complete explanation about docker-compose.yml is provided later

### **Step 4: Build and Start the Containers**

```bash
#Build the Docker images for the services:
docker-compose build
#NOTE: If the env file is not been passed automatically to the containers while building then specify explicitly the env file in the build command
docker-compose --env-file .env build
#Start all containers in detached mode using:
docker-compose up -d
#This command will:
#Spin up the database and application services.
#Attach logs to the terminal.
#Access logs for detailed insights (if needed):
docker-compose logs
```

### **Step 5: Stopping and Restarting Services**
```bash
#To stop all running containers:
docker-compose down
#After making changes to the configuration or code:
#Rebuild the containers:
docker-compose --env-file .env build
#Restart the services:
docker-compose up -d
```

---

# **Docker Compose Configuration Explanation**

This `docker-compose.yml` file defines the setup for a multi-service application using Docker Compose. It includes a PostgreSQL database and three separate services: `user-service`, `blog-service`, and `comment-service`. Below is an explanation of each part:

---

## **Key Sections**

### 1. **Version**
The version `3.8` specifies the version of the Docker Compose syntax being used.  
Version `3.8` is the latest version supported by Docker Compose.

### 2. **Services**

#### a) **PostgreSQL Database Service (`postgres`)**
- **image:** Pulls the PostgreSQL 14 Alpine image from Docker Hub.
- **container_name:** Assigns a fixed name to the database container (`postgres-db`).
- **restart:** Ensures the container always restarts if it stops unexpectedly.
- **environment:** Environment variables like `DB_USER`, `DB_PASSWORD`, and `DB_NAME` are passed to configure the database. These values are loaded from the `.env` file.
- **volumes:** 
  - `postgres_data`: Persists database data on the host to avoid losing data when the container is removed.
  - `init.sql`: Mounts a custom SQL script (e.g., for initializing schemas/tables) at the default PostgreSQL initialization directory.
- **networks:** Assigns the service to the `app-network` for inter-container communication.
- **ports:** Exposes PostgreSQL on port 5432 for local development.

#### b) **User Service (`user-service`)**
- **build:** Specifies the build context and Dockerfile location for the service. 
- **container_name:** Assigns a fixed name (`user-service`) for easier reference.
- **environment:** Passes application-specific environment variables such as `DB_HOST` (PostgreSQL host), `JWT_SECRET` (JWT authentication key), etc., sourced from the `.env` file.
- **ports:** Maps the container’s internal port `3001` to the host’s port `3001`.
- **networks:** Connects the service to the shared `app-network`.
- **depends_on:** Ensures the `postgres` service starts before this service.

#### c) **Blog Service (`blog-service`)**
Similar to the `user-service` configuration but listens on port `3002` and uses a different build context and Dockerfile.

#### d) **Comment Service (`comment-service`)**
Similar to the `user-service` configuration but listens on port `3003` and uses its own build context and Dockerfile.

---

### 3. **Volumes**
- **postgres_data:** A named volume used to persist PostgreSQL data so it is not lost when the container is stopped or removed.

### 4. **Networks**
- **app-network:** A custom bridge network to allow containers to communicate securely with each other. Using a custom network ensures that only containers on this network can interact.

---

## **How the Setup Works**

### **Database Service Initialization:**
1. The `postgres` service starts first.
2. It creates a database using the credentials and database name from `.env` (`DB_USER`, `DB_PASSWORD`, `DB_NAME`).
3. The `init.sql` script is executed to prepopulate the database (e.g., with tables or initial data).

### **Microservices:**
- Each service (`user-service`, `blog-service`, `comment-service`) connects to the same PostgreSQL instance using the shared `app-network`.
- Services access the database via `DB_HOST=postgres` (container name acts as the hostname).

### **Port Mappings:**
Each service exposes its port to the host machine for development and testing:
- `3001 → user-service`
- `3002 → blog-service`
- `3003 → comment-service`
- `5432 → PostgreSQL`

### **Environment Variables:**
The `.env` file is used to configure secrets and credentials dynamically. This ensures sensitive data isn’t hardcoded into the configuration.

### **Dependencies:**
The `depends_on` directive ensures services dependent on the database (`postgres`) start in the correct order.

---

## **Benefits of This Setup**
- **Isolation:** Each service runs in its own container, isolated from the host and other services.
- **Scalability:** Additional services can be added easily.
- **Portability:** Consistent behavior across development, staging, and production environments.
- **Data Persistence:** The PostgreSQL database persists data across container restarts.




