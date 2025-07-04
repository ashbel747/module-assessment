from fastapi import APIRouter, HTTPException
from app.dto.chat_request_dto import ChatRequest
from app.services.chatbot_service import generate_chat_response

router = APIRouter()

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = generate_chat_response(request.message)
        return {"reply": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
