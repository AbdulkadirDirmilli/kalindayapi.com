#!/bin/bash
set -e
echo "🚀 kalindayapi.com deploy başlıyor..."
cd /root/kalindayapi.com
git pull origin main
docker compose up -d --build
echo "✅ Deploy tamamlandı!"
