import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

// Define scope
const SCOPE = ["https://www.googleapis.com/auth/gmail.send"];

// Credential and token path
const TOKEN_PATH = path.join("C:/Users/dub6m/Desktop/ProjectPal/ProjectPal/src/MyObjects/Gmail/token.json");
const CREDENTIALS_PATH = "C:/Users/dub6m/Desktop/ProjectPal/ProjectPal/src/MyObjects/Gmail/credentials.json";

// Try to read and verify the toke file
async function verToken() {
    try {
        const token = await fs.readFile(TOKEN_PATH, "utf8");
        const tokenJson = JSON.parse(token);
        return google.auth.fromJSON(tokenJson);
    }
    catch(err) {
        return null;
    }
}

async function generateToken(client) {
    const credentials = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(credentials);
    const key = keys.web || keys.installed;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token
    });

    await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    let client = await verToken();
    if(client) {
        return client;
    }
    
    client = await authenticate({
        scopes: SCOPE,
        keyfilePath: CREDENTIALS_PATH
    });

    if(client.credentials) {
        await generateToken(client);
    }
    return client;
}
authorize("yes");
export default authorize;