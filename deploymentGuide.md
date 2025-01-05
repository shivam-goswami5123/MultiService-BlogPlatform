# Step 1: Launch EC2 Instance

## Choose an Instance Type:
- Use **Ubuntu 20.04/22.04** as the AMI.
- Select an instance type (e.g., **t2.micro** for basic requirements).

## Configure Security Groups:
Allow the following ports in your security group:
- **80 (HTTP)**: For web traffic.
- **443 (HTTPS)**: For secure traffic.
- **22 (SSH)**: For managing the server. 
- **3001,3002,3003,5432**: For the three services and database

## SSH into Your Instance:
```bash
#Open an SSH client.
#Locate your private key file. The key used to launch this instance
#Run this command, if necessary, to ensure your key is not publicly viewable.
chmod 400 "your-key.pem"
ssh -i "your-key.pem" ubuntu@ec2-your-public-ip.ap-south-1.compute.amazonaws.com
#Replace key-value pair generated while creating EC2 instance and replace with the public IP of the instance
```

# Step 2: Install Docker and Docker Compose

## Run these commands in the terminal after SSH:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
newgrp docker

sudo curl -L "https://github.com/docker/compose/releases/download/2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version #Verify Docker Compose Installation
```

# Step 3. Clone and Configure Your Application
   ```bash
#1. Clone the repository and navigate into the project folder:
git clone https://github.com/shivam-goswami5123/coding-blocks-project.git
cd coding-blocks-project
#2. Ensure a .env file exists in the project’s root directory. 
#3. If it doesn't exist, create it:
touch .env
#4. Populate the .env file with the required variables. Example: 
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=postgres
DB_PORT=5432
JWT_SECRET=your_jwt_secret
#Note: Replace placeholder values (e.g., your_db_user) with actual credentials and secrets.
#Note: Place this env file in the root directory coding-blocks-project where docker-compose.yml file is present
```

```bash
#Build the Docker images for the services:
docker-compose build
#NOTE: If the env file is not been passed automatically to the containers while building then specify explicitly the env file in the build command
docker-compose  build
#Start all containers in detached mode using:
docker-compose up -d
#This command will:
#Spin up the database and application services.
#Attach logs to the terminal.
#Access logs for detailed insights (if needed):
docker-compose logs
```

# Step 4. Install and Configure SSL Certificate (HTTPS) and Nginx

```bash
#Install Nginx
sudo apt install nginx -y
#Install and Configure SSL Using Let’s Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com 
#I have taken a proxy domain (blog-app.host2go.net (testing purpose); replace with your domain in the command)

#Open the default Nginx configuration
sudo vim /etc/nginx/sites-available/default
#Replace the configuration with the following
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
   listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    server_name yourdomain.com;

    location /api/users/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/blogs/ {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/comments/ {
        proxy_pass http://localhost:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

#Test and Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

#Stop, Rebuild and Restart the containers
docker-compose down
docker-compose build
docker-compose up -d
```


