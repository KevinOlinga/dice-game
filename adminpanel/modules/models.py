from pydantic import BaseModel
from typing import List

class Game(BaseModel):
    id: int
    session_id: str
    player_id: str
    start_date: str
    end_date:str
    score:int

class Session(BaseModel):
    id:int
    start_date: datetime.now()
    end_date: str
    creator: str
    status: str

   
