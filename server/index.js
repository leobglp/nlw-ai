import cors from "cors"
import express from "express"

import {convert} from "./convert.js"
import {download} from './download.js'
import { transcibe } from "./transcribe.js"
import {summarize} from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try{
    await download(request.params.id)
    const audioConverted = await convert()
    console.log(audioConverted)
    const result = await transcibe(audioConverted)
    return response.json({result})
  }catch(error){
    return response.json({error})
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    return response.json({ error })
  }
})
app.listen(3333, () => console.log("Server is running in port 3333"))
