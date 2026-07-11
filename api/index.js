export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;
        
        if (body.message && body.message.text === '/start') {
            const chatId = body.message.chat.id;
            const firstName = body.message.from.first_name || 'there';
            
            const reply = {
                method: 'sendMessage',
                chat_id: chatId,
                text: `✨ Welcome to Spark, ${firstName}! 🎉\n\nFind your perfect friend match based on shared values and interests.\n\nClick the button below to get started! 🚀`,
                reply_markup: {
                    inline_keyboard: [[
                        { 
                            text: '🔥 Open Spark', 
                            web_app: { url: process.env.APP_URL || 'https://your-app.vercel.app' } 
                        }
                    ]]
                }
            };
            
            return res.status(200).json(reply);
        }
        
        if (body.message) {
            return res.status(200).json({
                method: 'sendMessage',
                chat_id: body.message.chat.id,
                text: "👋 Type /start to open Spark and find your perfect friend match! ✨"
            });
        }
        
        return res.status(200).json({ ok: true });
    }
    
    if (req.method === 'GET') {
        return res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head><title>Spark Bot</title></head>
            <body style="font-family: system-ui; background: #050b14; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center;">
                <div>
                    <h1 style="font-size: 48px;">✨</h1>
                    <h2>Spark Bot Webhook</h2>
                    <p style="color: #888;">Status: <span style="color: #22c55e;">✅ Running</span></p>
                    <p style="color: #666; font-size: 14px;">Your bot is connected and ready!</p>
                </div>
            </body>
            </html>
        `);
    }
    
    res.status(405).json({ error: 'Method not allowed' });
}
