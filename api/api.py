import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('trainedModel.pkl', 'rb'))

@app.route('/')
def home():
    return 'app succesfuly running'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    print(data["bounceRates"])
    print(float(data["bounceRates"]))
    # obtencion y normalizacion de cada feature
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
    output = str(prediction[0])
    # enviamos el resultado como respuesta de la petición
    return (output)

if __name__ == "__main__":
    app.run(debug=True)

