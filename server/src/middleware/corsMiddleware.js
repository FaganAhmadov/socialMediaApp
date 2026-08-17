const config = require('../config');
const allowedOrigins = [config.corsOrigin1];
const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;

    // Postman və server-to-server requestlər üçün
    if (!origin) return next();

    const isAllowed = allowedOrigins.includes(origin);

    // İcazə verilməyən origin
    if (!isAllowed) {
        return res.status(403).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Access Denied</title>
        <style>
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            font-family: Arial, sans-serif;
            color: white;
          }

          .card {
            background: rgba(255, 255, 255, 0.12);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-width: 420px;
          }

          h1 {
            margin-bottom: 10px;
            font-size: 32px;
          }

          p {
            opacity: 0.9;
            line-height: 1.5;
          }

          code {
            background: rgba(0, 0, 0, 0.25);
            padding: 3px 8px;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚫 Access Denied</h1>
          <p>This origin is not allowed by the server CORS policy.</p>
          <p>Origin: <code>${origin}</code></p>
        </div>
      </body>
      </html>
    `);
    }

    // CORS headerləri
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

    // Preflight request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
};

module.exports = corsMiddleware;