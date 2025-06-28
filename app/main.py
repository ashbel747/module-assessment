from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.chatbot_controller import router as chatbot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,  # Set specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot_router, prefix="/chat")
