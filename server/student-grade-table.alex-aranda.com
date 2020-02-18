server {

  server_name student-grade-table.alex-aranda.com;

  root /home/ubuntu/student-grade-table.alex-aranda.com/server/public;

  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://localhost:3002;
  }

}