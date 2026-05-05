import io from 'socket.io-client';

const socket = io("https://society-backend-om3t.onrender.com", {
    transports: ['websocket', 'polling'],   // both for better reliability
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    secure: true
});

// Optional: Connection status check
socket.on('connect', () => {
    console.log('✅ Socket Connected Successfully');
});

socket.on('connect_error', (err) => {
    console.log('❌ Socket Connection Error:', err.message);
});

export default socket;