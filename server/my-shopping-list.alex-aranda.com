server {

  server_name my-shopping-list.alex-aranda.com;

  root /home/ubuntu/my-shopping-list.alex-aranda.com/server/public;

  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://localhost:3003;
  }

}