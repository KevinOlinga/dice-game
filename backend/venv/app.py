from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///dice_game.db'
db = SQLAlchemy(app)

class Configuration(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  num_players = db.Column(db.Integer, nullable=False)
  num_dice = db.Column(db.Integer, nullable=False)
  num_games = db.Column(db.Integer, nullable=False)
  wait_time = db.Column(db.Integer, nullable=False)
  
class Session(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  start_date = db.Column(db.DateTime, nullable=False)
  end_date = db.Column(db.DateTime)
  creator = db.Column(db.String(40), nullable=False)
  challengers = db.Column(db.String(40))

class Game(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=False)
  start_date = db.Column(db.DateTime, nullable=False)
  end_date = db.Column(db.DateTime)
  player = db.Column(db.String(40), nullable=False)
  score = db.Column(db.Integer, nullable=False)

class Player(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)

@app.route('/')
def home():
  return "Hello, Flask!"

if __name__ == '__main__':
  with app.app_context():
    db.create_all()
  app.run(debug=True)
  
  
  
  