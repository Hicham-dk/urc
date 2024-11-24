import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};
export default async function handler(request) {

  try {

    //const {senderId, receiverId} = await request.json();
    const { senderId, receiverId, receiverType } = await request.json();

    //const conversationKey = `conversations:${senderId}:${receiverId}`;

    const conversationKey = `conversations:${senderId}:${receiverId}`;
    const messages = await kv.lrange(conversationKey, 0, -1);
    // Filtrage des messages en fonction de receiverType
    let filteredMessages = messages;
    if (receiverType) {
      filteredMessages = messages.filter((message) => message.receiverType === receiverType);
    }
    // const messages = await kv.lrange(conversationKey, 0, -1);

    return new Response(JSON.stringify(filteredMessages), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });

  }
}