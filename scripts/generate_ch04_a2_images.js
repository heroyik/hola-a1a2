import fs from "fs";
import path from "path";
import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Vertex AI
const project = process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });

const outDir = path.resolve("images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const prompts = [
    {
        filename: "ch04_a2_vocab_friendship_v2_1.png",
        prompt: `A modern Seinen anime-style illustration with clean line art and premium digital painting, warm golden-hour sunlight, and a cheerful, positive mood. Create a wide grid-style infographic layout divided into 10 clearly separated sections. Place a circled number "1" to "10" next to each vignette, perfectly matching the vocabulary. No AR, no holograms, no HUD; keep everything highly readable.

Scene setting: a contemporary rooftop bar terrace in Madrid with Spanish/Mediterranean atmosphere (tiles, wooden furniture, potted plants). Characters are Mediterranean/Caucasian Spanish features, olive skin, dark hair, friendly smiles.

Vignettes:
1) el mejor amigo: two best friends laughing and leaning on each other.
2) la colega: a professional woman colleague smiling with a laptop and coffee.
3) la pandilla: a tight group of friends (about 5 people) posing together.
4) el conocido: a polite acquaintance greeting with a handshake.
5) la pareja: a romantic couple holding hands.
6) discutir: two friends in a mild argument with expressive gestures but still friendly.
7) quedarse: two friends agreeing to meet up, showing a calendar/phone plan.
8) presentar: one person introducing a friend to another.
9) felicitar: someone congratulating another with a warm handshake or hug.
10) sacar una foto: a person taking a photo of friends with a smartphone.

Color palette hints: Spain red and gold accents, soft charcoal, off-white. High resolution, cinematic depth.`,
    },
    {
        filename: "ch04_a2_culture_lifestyle_v2_1.png",
        prompt: `A heartwarming modern Seinen anime-style illustration with clean line art and premium digital paint, warm golden-hour lighting, and a bright, positive atmosphere. Scene: a Spanish neighborhood plaza and terrace café showing tradition and modernity coexisting. Include grandparents caring for grandchildren on a bench, a modern couple walking nearby, and a group of young friends at a terrace table laughing together to symbolize “familia elegida.” Add Spanish architecture cues (stucco walls, wrought-iron balconies, tiled flooring, potted plants). No AR, no holograms, no HUD.

Characters are Mediterranean/Caucasian Spanish features, olive skin, dark hair. Cinematic depth, gentle sun rays, Spain red and gold accents, off-white highlights.`,
    },
];

for (const item of prompts) {
    // Optional: You can adjust the model if needed, 'imagegeneration@006' or similar. 
    // Here we use the latest Imagen 3 model id.
    const imagenModel = vertexAI.preview.getGenerativeModel({
        model: 'imagen-3.0-generate-001'
    });

    const request = {
        instances: [{ prompt: item.prompt }],
        parameters: { sampleCount: 1, aspectRatio: "16:9" }
    };

    const [resp] = await imagenModel.predict(request);

    // The response structure might vary slightly, but generally it contains bytesBase64Encoded
    if (!resp.predictions || resp.predictions.length === 0) {
        console.error("Failed to generate image.");
        continue;
    }

    const b64 = resp.predictions[0].bytesBase64Encoded;
    if (b64) {
        const outPath = path.join(outDir, item.filename);
        fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
        console.log(`Saved: ${outPath}`);
    } else {
        console.error("No base64 data returned.");
    }
}
