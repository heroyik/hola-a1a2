import fs from "fs";
import path from "path";
import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

// Use the service account from secrets
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve("secrets/holaa1a2-3b14d0247fc2.json");

const project = "holaa1a2"; // From the filename and common project ID
const location = 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });

const outDir = path.resolve("images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const prompts = [
    {
        filename: "ch03_a1_vocab_identity_v10.png",
        prompt: `A modern Seinen anime-style educational illustration with clean line art and premium digital painting, warm golden-hour sunlight, and a bright, positive mood. Create a wide grid-style infographic layout divided into 10 clearly separated sections. Place a circled number "1" to "10" next to each vignette, perfectly matching the vocabulary. No AR, no holograms, no HUD; keep everything highly readable. Scene: A well-lit desk in Spain with various documents. 
Vignettes: 1) el DNI: a Spanish national ID card. 2) el pasaporte: a Spanish passport. 3) el carné de conducir: a driver's license. 4) el carné de estudiante: a university ID card. 5) el certificado: an official paper with a stamp. 6) la firma: a hand signing a document. 7) la direction: an address written on an envelope. 8) la fecha de nacimiento: a calendar with a circled birth date. 9) la nacionalidad: a small icon of a Spanish flag. 10) la profesión: a professional tool (e.g., a stethoscope or architect's pen). [HOLA_STYLE_V2] No text.`,
    },
    {
        filename: "ch03_a1_culture_dni_v10.png",
        prompt: `A high-quality modern Seinen anime-style illustration. A polite Spanish police officer at a modern police station desk assisting a cheerful young person. The focus is on the significance of the DNI card being used in a real-world scenario. Warm natural lighting, Spanish architectural cues (police station insignia), and a bright, welcoming atmosphere. No AR, no holograms. [HOLA_STYLE_V2] No text.`,
    },
    {
        filename: "ch03_a2_vocab_multicultural_v10.png",
        prompt: `A modern Seinen anime-style educational illustration with clean line art and premium digital painting, warm golden-hour sunlight. Create a grid-style infographic layout divided into 10 sections with numbered labels "1" to "10". 
Vignettes: 1) español/a: a person of Spanish origin. 2) latinoamericano/a: a person of Latin American descent. 3) asiático/a: a person of Asian descent. 4) africano/a: a person of African descent. 5) europeo/a: a person of European descent. 6) el mapa del world: a stylized world map. 7) las racines mixtas: two different tree roots merging into one strong trunk. 8) la diversidad: hands of different skin tones joining together. 9) el respeto: a gesture of bow or handshake showing respect. 10) la integración: a puzzle where different pieces fit perfectly. [HOLA_STYLE_V2] No text.`,
    },
    {
        filename: "ch03_a2_culture_expats_v10.png",
        prompt: `A high-quality modern Seinen anime-style illustration. A vibrant, multicultural co-working space or garden cafe in Madrid. Diverse people (expats and locals) working together on laptops, laughing, and sharing coffee. Modern Spanish architecture with traditional touches (tiled walls, large windows). Bright, hopeful, and inclusive atmosphere. [HOLA_STYLE_V2] No text.`,
    },
];

async function generate() {
    for (const item of prompts) {
        console.log(`Generating: ${item.filename}...`);
        try {
            const imagenModel = vertexAI.preview.getGenerativeModel({
                model: 'imagen-3.0-generate-001'
            });

            const request = {
                instances: [{ prompt: item.prompt }],
                parameters: { sampleCount: 1, aspectRatio: "16:9" }
            };

            const [resp] = await imagenModel.predict(request);

            if (!resp.predictions || resp.predictions.length === 0) {
                console.error(`Failed to generate: ${item.filename}`);
                continue;
            }

            const b64 = resp.predictions[0].bytesBase64Encoded;
            if (b64) {
                const outPath = path.join(outDir, item.filename);
                fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
                console.log(`Saved: ${outPath}`);
            } else {
                console.error(`No base64 data for: ${item.filename}`);
            }
        } catch (error) {
            console.error(`Error generating ${item.filename}:`, error.message);
        }
    }
}

generate();
