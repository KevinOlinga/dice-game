from fastapi import APIRouter, HTTPException
from .models import Session, Game
from .database import get_connection

router = APIRouter()

@router.post("/sessions/", response_model=Session)
def create_session(session: Session):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO sessions (id,start_date, end_date, creator, status) "
            "VALUES (%s, %s, %s, %s, %s)",
            (   session.id,
                session.start_date,
                session.end_date,
                session.creator,
                session.status,
            )
        )
        connection.commit()

        session.id = cursor.lastrowid

        return session

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()

@router.get("/sessions/{session_id}", response_model=Session)
def get_session(session_id: int):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM sessions WHERE id = %s", (session_id,))
        session = cursor.fetchone()

        if session is None:
            raise HTTPException(status_code=404, detail="Session not found")
        session['start_date'] = session['start_date'].strftime('%Y-%m-%dT%H:%M:%S')
        session['end_date'] = session['end_date'].strftime('%Y-%m-%dT%H:%M:%S')
        
        return session

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()

@router.post("/sessions/{session_id}/games/", response_model=Game)
def create_game(session_id: int, game: Game):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO games (id,session_id,player_id,start_date,end_date,score) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (   game.id,
                session_id,
                game.player_id,
                game.start_date,
                game.end_date,
                game.score,
            )
        )
        connection.commit()

        game.id = cursor.lastrowid
      
        return game

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()
