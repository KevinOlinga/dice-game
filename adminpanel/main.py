from fastapi import FastAPI
from modules.routes import router as modules_router

app = FastAPI()

app.include_router(modules_router, prefix="/modules")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3002)
