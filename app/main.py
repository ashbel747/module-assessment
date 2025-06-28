from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.chatbot_controller import router as chatbot_router

app = FastAPI()

origins = [
     "https://moduleassesment.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Set specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot_router, prefix="/chat")
