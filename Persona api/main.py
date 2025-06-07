from fastapi import FastAPI
from persona_based_prompt import generate_response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatRequest(BaseModel):
    message: str

# Response model
class ChatResponse(BaseModel):
    reply: str
@app.post("/chat", response_model=ChatResponse)
def chat_api(request: ChatRequest):
    print("Received request:", request)
    print("User message:", request.message)
    user_message = request.message
    result=generate_response(user_message)
    return {"reply":result}
