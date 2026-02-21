import { VertexAI } from "@google-cloud/vertexai";
import path from "path";

const project = "holaa1a2";
const location = 'us-central1';
const vertexAI = new VertexAI({ project, location });

const imagenModel = vertexAI.preview.getGenerativeModel({
    model: 'imagen-3.0-generate-001'
});

console.log("Model keys:", Object.keys(imagenModel));
console.log("Model proto keys:", Object.keys(Object.getPrototypeOf(imagenModel)));
