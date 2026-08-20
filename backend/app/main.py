from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data.database import Base, engine
from .routes.employees import router as employee_router

# Automatically create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Employee Management System",
    description="Employee CRUD REST API",
    version="1.0.0"
)


# React frontend access
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


app.include_router(
    employee_router
)


@app.get("/")
def root():

    return {
        "message": "Employee Management System API is running"
    }