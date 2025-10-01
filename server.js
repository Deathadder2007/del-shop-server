const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de base
app.use(express.json());
app.use(express.static('public'));

// Route principale - Page d'accueil simple
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Del-Shop.com - En Ligne</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .container {
                background: rgba(255,255,255,0.1);
                padding: 3rem;
                border-radius: 15px;
                backdrop-filter: blur(10px);
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .status {
                background: #00d26a;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                display: inline-block;
                margin: 1rem 0;
            }
            .info {
                background: rgba(255,255,255,0.2);
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Del-Shop.com</h1>
            <div class="status">✅ SERVEUR EN LIGNE</div>
            <p>Votre domaine est maintenant fonctionnel et accessible sur internet</p>
            
            <div class="info">
                <strong>Informations techniques :</strong><br>
                Domaine: del-shop.com<br>
                Port: ${PORT}<br>
                Environnement: ${process.env.NODE_ENV || 'production'}<br>
                Timestamp: ${new Date().toISOString()}
            </div>
            
            <div style="margin-top: 2rem;">
                <a href="/health" style="color: white; margin-right: 1rem;">🔍 Health Check</a>
                <a href="/api" style="color: white;">⚙️ API</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Health Check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Del-Shop Server is healthy 🟢',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    domain: 'del-shop.com'
  });
});

// Endpoint API basique
app.get('/api', (req, res) => {
  res.json({
    service: 'Del-Shop API',
    version: '1.0.0',
    domain: 'del-shop.com',
    endpoints: {
      health: '/health',
      api: '/api'
    },
    status: 'operational'
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.originalUrl,
    domain: 'del-shop.com'
  });
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`📍 Serveur Del-Shop démarré:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Domaine: http://del-shop.com`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Environnement: ${process.env.NODE_ENV || 'production'}`);
});
