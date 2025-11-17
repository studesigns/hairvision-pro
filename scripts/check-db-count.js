// Check actual count in database
const https = require('https');

const url = 'https://burdztelpeqkbhaevako.supabase.co/rest/v1/hairstyles?select=id';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cmR6dGVscGVxa2JoYWV2YWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NDI3NTMsImV4cCI6MjA0NzMxODc1M30.yh1Gf9VT0gKDt4E-3ikFRwOVe7yx1vRfBsQbG6XgvLE';

const options = {
  headers: {
    'apikey': apiKey,
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const styles = JSON.parse(data);
      console.log(`Total styles in database: ${styles.length}`);
    } catch(e) {
      console.log('Response:', data);
    }
  });
}).on('error', err => console.error('Error:', err));
