import numpy as np
from flask import Flask, request
import pickle

app = Flask(__name__)
# modelo de 10 caracteristicas
# model = pickle.load(open('trainedModel.pkl', 'rb'))
# modelo de 14 variables (mas preciso)
model = pickle.load(open('trainedModel14.pkl', 'rb'))

@app.route('/')
def home():
    return 'app succesfuly running'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # obtencion y normalizacion de cada feature
    # newVisitor = int(data["newVisitor"])
    returningVisitor = int(data["returningVisitor"])
    administrativeP= int(data["administrativeP"])
    administrativeTime= float(data["administrativeTime"])
    informational= int(data["informational"])
    productRelated= int(data["productRelated"])
    productRelatedDuration= float(data["productRelatedDuration"])
    bounceRates= float(data["bounceRates"])
    exitRates= float(data["exitRates"])
    pageValues= float(data["pageValues"])
    specialDay= float(data["specialDay"])
    operatingSystems= int(data["operatingSystems"])
    region= int(data["region"])
    trafficType= float(data["trafficType"])
    # pasado los datos a numpy
    final_features = [np.array([returningVisitor,administrativeP,
    administrativeTime, informational, productRelated, productRelatedDuration,
     bounceRates, exitRates, pageValues, specialDay, operatingSystems, region, trafficType])]
    print(final_features)
    # prediccion
    prediction = model.predict(final_features)
    output = str(prediction[0])
    # enviamos el resultado como respuesta de la petición
    return (output)

if __name__ == "__main__":
    app.run(debug=True)

