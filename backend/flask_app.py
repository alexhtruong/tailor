import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from supabase import create_client, Client

from form_routes import form_bp
from auth_routes import auth

# load the flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173"])

app.register_blueprint(form_bp)
app.register_blueprint(auth)

app.config.from_object(Config)

jwt = JWTManager(app)

# SUPABASE_URL = os.getenv("SUPABASE_URL")
# SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")

# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

if __name__ == '__main__': 
    app.run(debug=True)