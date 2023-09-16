import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"
export async function transcibe(audio){
 try {
  // return transcriptionExample
    console.log("Realizando a transcrição")
    const transcibe = await pipeline("automatic-speech-recognition", "Xenova/whisper-small")

    const transcription = await transcibe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe"
    })
    console.log("Transcrição finalizada")
    return transcription?.text.replace("[Música]", "")
 } catch (error) {
    throw new Error(error)
 }
}