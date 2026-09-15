# demo-frontend

## 1. Application purpose
Simple React + TypeScript frontend for a CI/CD learning lab. Displays data
fetched from the User, Product, and Order backend services.

## 2. Technology
- React + TypeScript
- Apache HTTP Server (for serving the production build in Docker)

## 3. Local setup
```bash
npm install
cp .env.example .env   # adjust service URLs if needed
npm start
```

## 4. Test command
```bash
npm test
```

## 5. Build command
```bash
npm run build
```

## 6. Docker build command
```bash
docker build -t demo-frontend .
```

## 7. Docker run command
```bash
docker run -p 8080:80 demo-frontend
```
Then open http://localhost:8080
