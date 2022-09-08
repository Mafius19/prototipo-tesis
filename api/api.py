import time
import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('trainedModel.pkl', 'rb'))

# @app.route('/')
# def home():
#     return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    data = request.get_json(force=True)
    print(data["bounceRates"])
    print(float(data["bounceRates"]))
    # obtencion y normalizacion de cada feature
    # int_features = [int(x) for x in request.form.values()]
    newVisitor = int(data["newVisitor"])
    administrativeP= int(data["administrativeP"])
    administrativeTime= float(data["administrativeTime"])
    informational= int(data["informational"])
    productRelated= int(data["productRelated"])
    productRelatedDuration= float(data["productRelatedDuration"])
    bounceRates= float(data["bounceRates"])
    exitRates= float(data["exitRates"])
    pageValues= float(data["pageValues"])
    # pasado los datos a numpy
    final_features = [np.array([newVisitor,administrativeP,administrativeTime, informational, productRelated, productRelatedDuration, bounceRates, exitRates, pageValues])]
    # prediccion
    prediction = model.predict(final_features)
    print(prediction)
    output = str(prediction[0])

    # return render_template('index.html', prediction_text='Salary is {}'.format(output))
    return (output)


@app.route('/predict_api', methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction[0]
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
