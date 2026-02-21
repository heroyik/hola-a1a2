import fs from "fs";
import path from "path";
import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve("secrets/holaa1a2-3b14d0247fc2.json");

const project = "holaa1a2";
const location = 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });

const outDir = path.resolve("images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generate() {
    console.log("Starting generation...");
    const imagenModel = vertexAI.getGenerativeModel({
        model: 'imagen-3.0-generate-001'
    });

    console.log("Model methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(imagenModel)));

    const prompt = `A modern Seinen anime-style educational illustration. [HOLA_STYLE_V2] No text.`;
    const request = {
        instances: [{ prompt: prompt }],
        parameters: { sampleCount: 1, aspectRatio: "16:9" }
    };

    try {
        if (typeof imagenModel.predict === 'function') {
            const [resp] = await imagenModel.predict(request);
            console.log("Predict success!");
        } else if (typeof imagenModel.generateContent === 'function') {
            const [resp] = await imagenModel.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
            console.log("GenerateContent success!");
        } else {
            console.log("Neither predict nor generateContent found.");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

generate();
