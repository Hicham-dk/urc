import './App.css';
import AppRouter from './principal/AppRouter';
import React, { useEffect } from 'react';
import { Client as PushNotifications } from '@pusher/push-notifications-web';

function App() {
  const userId = 1; // Replace with the actual user ID or retrieve from your auth system

  useEffect(() => {
    const beamsClient = new PushNotifications({
      instanceId: 'd119df2c-f7bd-4788-9562-9bd8ed920f5c'  // Replace with your actual Instance ID from Pusher
    });

    beamsClient.start()
      .then(() => beamsClient.addDeviceInterest(`user-${userId}`))
      .then(() => console.log('Successfully registered and subscribed to notifications'))
      .catch(console.error);

  }, [userId]);

  return (
      <AppRouter/>
  );
}

export default App;
