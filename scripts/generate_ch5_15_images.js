import fs from "fs";
import path from "path";
import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Vertex AI
const project = process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });

const chaptersDir = path.resolve("chapters");
const strategyPath = path.resolve("strategy/image.md");
const outDir = path.resolve("images");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const imageStrategy = fs.existsSync(strategyPath) ? fs.readFileSync(strategyPath, "utf-8") : "Use modern anime style, no AR.";

async function generateImagePrompt(content, sectionName, chapterName) {
    // VertexAI Gemini for prompt generation
    const model = vertexAI.preview.getGenerativeModel({
        model: 'gemini-1.5-pro-preview-0409',
        generationConfig: {
            temperature: 0.7,
        },
    });

    const systemInstruction = `You are an expert prompt engineer for Vertex AI Imagen 3.
Your task is to create a SINGLE English image generation prompt based on the provided Spanish textbook chapter content.
Follow these rules strictly:
${imageStrategy}

Output ONLY the raw prompt text, no quotes, no markdown. Ensure you strictly follow the visual style guidelines!`;

    const userPrompt = `Create a prompt for section "${sectionName}" in chapter ${chapterName}.\n\nContent:\n${content}`;

    const request = {
        contents: [
            {
                role: 'user',
                parts: [
                    { text: systemInstruction + '\n\n' + userPrompt }
                ]
            }
        ],
    };

    const response = await model.generateContent(request);
    const result = response.response;
    if (result.candidates && result.candidates.length > 0) {
        return result.candidates[0].content.parts[0].text.trim();
    }
    throw new Error('Failed to generate prompt');
}

async function processChapter(filename) {
    const filepath = path.join(chaptersDir, filename);
    const content = fs.readFileSync(filepath, "utf-8");

    // Look for generic image prompts too
    const vocabRegex = /## 2\. Vocabulario Esencial([\s\S]*?)(?=## 3\.)/;
    const cultureRegex = /## 5\. Cultura Viva([\s\S]*?)(?=## 6\.)/;

    const vocabMatch = content.match(vocabRegex);
    const cultureMatch = content.match(cultureRegex);

    const baseName = filename.replace('.md', ''); // e.g., ch05_a1_a_comer

    const vocabImgName = `${baseName}_vocab.png`;
    const cultureImgName = `${baseName}_culture.png`;

    const vocabImgPath = path.join(outDir, vocabImgName);
    const cultureImgPath = path.join(outDir, cultureImgName);

    const imagenModel = vertexAI.preview.getGenerativeModel({
        model: 'imagen-3.0-generate-001'
    });

    if (vocabMatch && !fs.existsSync(vocabImgPath)) {
        console.log(`Generating vocab prompt for ${baseName}...`);
        try {
            const vocabPrompt = await generateImagePrompt(vocabMatch[1], "2. Vocabulario Esencial", baseName);
            console.log(`\tPrompt: ${vocabPrompt.substring(0, 80).replace(/\n/g, ' ')}...`);

            console.log(`\tGenerating vocab image...`);

            const request = {
                instances: [{ prompt: vocabPrompt }],
                parameters: { sampleCount: 1, aspectRatio: "16:9" }
            };

            const [resp] = await imagenModel.predict(request);
            if (!resp.predictions || resp.predictions.length === 0) {
                console.error(`\t❌ Failed to get predictions for vocab image.`);
            } else {
                const b64 = resp.predictions[0].bytesBase64Encoded;
                if (b64) {
                    fs.writeFileSync(vocabImgPath, Buffer.from(b64, "base64"));
                    console.log(`\t✅ Saved: ${vocabImgPath}`);
                } else {
                    console.error(`\t❌ Failed to get b64_json for vocab image.`);
                }
            }
        } catch (e) {
            console.error(`\t❌ Error processing vocab for ${baseName}:`, e.message);
        }
    } else if (fs.existsSync(vocabImgPath)) {
        console.log(`⏭️ Skipped vocab for ${baseName} (already exists)`);
    } else {
        console.log(`⚠️ No Vocabulario Esencial section found in ${baseName}`);
    }

    if (cultureMatch && !fs.existsSync(cultureImgPath)) {
        console.log(`Generating culture prompt for ${baseName}...`);
        try {
            const culturePrompt = await generateImagePrompt(cultureMatch[1], "5. Cultura Viva", baseName);
            console.log(`\tPrompt: ${culturePrompt.substring(0, 80).replace(/\n/g, ' ')}...`);

            console.log(`\tGenerating culture image...`);

            const request = {
                instances: [{ prompt: culturePrompt }],
                parameters: { sampleCount: 1, aspectRatio: "16:9" }
            };

            const [resp] = await imagenModel.predict(request);

            if (!resp.predictions || resp.predictions.length === 0) {
                console.error(`\t❌ Failed to get predictions for culture image.`);
            } else {
                const b64 = resp.predictions[0].bytesBase64Encoded;
                if (b64) {
                    fs.writeFileSync(cultureImgPath, Buffer.from(b64, "base64"));
                    console.log(`\t✅ Saved: ${cultureImgPath}`);
                } else {
                    console.error(`\t❌ Failed to get bytesBase64Encoded for culture image.`);
                }
            }
        } catch (e) {
            console.error(`\t❌ Error processing culture for ${baseName}:`, e.message);
        }
    } else if (fs.existsSync(cultureImgPath)) {
        console.log(`⏭️ Skipped culture for ${baseName} (already exists)`);
    } else {
        console.log(`⚠️ No Cultura Viva section found in ${baseName}`);
    }
}

async function main() {
    const files = fs.readdirSync(chaptersDir).filter(f => {
        const match = f.match(/^ch(\d{2})_(a1|a2)_.*\.md$/);
        if (match) {
            const chNum = parseInt(match[1], 10);
            // Process chapters 5-15, but also test ch04 since it might be helpful
            return chNum >= 5 && chNum <= 15;
        }
        return false;
    });

    files.sort();
    console.log(`Found ${files.length} chapters to process images for.`);

    for (const file of files) {
        console.log(`\n--- Processing ${file} ---`);
        await processChapter(file);
    }
    console.log(`\n🎉 All done!`);
}

main().catch(console.error);
