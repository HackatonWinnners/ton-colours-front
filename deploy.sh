#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying colours.042098.xyz${NC}"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker not installed. Installing...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose not installed. Installing...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo -e "${GREEN}1. Creating certbot directories...${NC}"
mkdir -p certbot/conf certbot/www

echo -e "${GREEN}2. Building and starting containers...${NC}"
docker-compose up -d --build

echo -e "${GREEN}3. Waiting for nginx to start...${NC}"
sleep 5

echo -e "${GREEN}4. Obtaining SSL certificate...${NC}"
echo -e "${YELLOW}Make sure DNS record for colours.042098.xyz points to this server!${NC}"
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose run --rm certbot certonly --webroot \
        --webroot-path=/var/www/certbot \
        --email your-email@example.com \
        --agree-tos \
        --no-eff-email \
        -d colours.042098.xyz
    
    echo -e "${GREEN}5. Restarting nginx to apply SSL...${NC}"
    docker-compose restart nginx-proxy
fi

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "Site available at: ${GREEN}https://colours.042098.xyz${NC}"
echo ""
echo "Useful commands:"
echo "  docker-compose logs -f           # View logs"
echo "  docker-compose restart           # Restart"
echo "  docker-compose down              # Stop"
echo "  docker-compose up -d --build     # Rebuild and start"
