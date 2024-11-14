/*import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};

export default async function handler (request) {
 try {
  

const {senderId, receiverId, senderName, messageContent} = await request.json();


  
const conversationKey = `conversations:${senderId}:${receiverId}`;



  const timestamp = new Date().toISOString();
  const newMessage = { senderId: senderId, receiverId : receiverId, senderName: senderName, messageContent: messageContent, timestamp: timestamp};


  
  await kv.lpush(conversationKey, newMessage);



  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
    
 } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
        status: 500,
        headers: {'content-type': 'application/json'},
    });
}

 
    
}*/
// messageController.js or sendMessage.js

const beamsClient = require('./pusherConfig');

app.post('/send-message', async (req, res) => {
  const { recipientId, messageContent } = req.body;

  // Your existing code to handle saving/sending the message

  const { senderId, receiverId, senderName } = await req.json();



  const conversationKey = `conversations:${senderId}:${receiverId}`;



  const timestamp = new Date().toISOString();
  const newMessage = { senderId: senderId, receiverId: receiverId, senderName: senderName, messageContent: messageContent, timestamp: timestamp };



  await kv.lpush(conversationKey, newMessage);
  // Trigger a Pusher Beams notification
  beamsClient.publishToUsers([recipientId], {
    fcm: {
      notification: {
        title: 'New Message',
        body: `You have a new message: ${messageContent}`,
      },
    },
    apns: {
      aps: {
        alert: {
          title: 'New Message',
          body: `You have a new message: ${messageContent}`,
        },
      },
    },
  })
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch(error => {
      console.error('Error sending notification:', error);
      res.status(500).send({ success: false });
    });
});

