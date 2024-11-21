from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from form_routes import form_bp
from auth_routes import auth_bp

# load the flask app
app = Flask(__name__)
CORS(app)

# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

app.register_blueprint(form_bp)
# app.register_blueprint(auth_bp)


if __name__ == '__main__':
    app.run(debug=True)