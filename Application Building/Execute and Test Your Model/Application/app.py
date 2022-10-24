import flask
from flask import request, render_template
from flask_cors import CORS
import joblib
import pandas as pd
from xgboost import XGBRegressor
app = flask.Flask(__name__, static_url_path='')
CORS(app)

@app.route('/', methods=['GET'])
def sendHomePage():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predictSpecies():
    ws = float(request.form['ws'])
    wd = float(request.form['wd'])

    X = [[ws,wd]]
    xgr=XGBRegressor()
    df = pd.DataFrame(X, columns=['WindSpeed(m/s)','WindDirection'])
    xgr.load_model('static/model/test_model.bin')
    result = xgr.predict(df)[0]
    print(result)
    return render_template('predict.html',predict=result)

if __name__ == '__main__':
    app.run()