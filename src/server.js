const app = require('./app');
const initializeDatabase = require('./config/initDb');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize database connection
    const dbConnected = await initializeDatabase();
    
    if (!dbConnected) {
      
      // Start server anyway for testing the API structure
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 API endpoint available at:`);
        console.log(`   - GET  http://localhost:${PORT}/api/accounts`);
      });
      return;
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Accounts API available at: http://localhost:${PORT}/api/accounts`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
