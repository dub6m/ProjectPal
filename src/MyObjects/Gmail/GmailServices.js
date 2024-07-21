import { google } from "googleapis";

async function sendEmail(auth, content) {
    const gmail = google.gmail({version: "v1", auth});
    const encodedMessage = Buffer.from(content).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage
        }
    });

    console.log(response.data);
    return response.data;
}

export default sendEmail;