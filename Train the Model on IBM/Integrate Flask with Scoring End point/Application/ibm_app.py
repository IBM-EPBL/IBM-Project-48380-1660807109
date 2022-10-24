import flask
from flask import request, render_template
from flask_cors import CORS
import joblib
import pandas as pd
from xgboost import XGBRegressor
import requests
app = flask.Flask(__name__, static_url_path='')
CORS(app)

#purposely kept API KEY since cuh is very less

API_KEY = "<API_KEY>"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
 API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

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
    payload_scoring = {"input_data": [{"field": [['ws', 'wd']], "values":X}]}

    response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/0644c680-478f-475f-bc23-2a64fc6490a5/predictions?version=2022-10-24', json=payload_scoring,
    headers={'Authorization': 'Bearer ' + mltoken})
    print(response_scoring)
    predictions = response_scoring.json()
    print(predictions)
    predict = predictions['predictions'][0]['values'][0][0]
    print("Final prediction :",predict)
    return render_template('predict.html',predict=predict)

if __name__ == '__main__':
    app.run()