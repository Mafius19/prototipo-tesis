
import pickle
# El método pickle.load() carga el método y guarda los bytes deserializados 
# en el modelo. 
model = pickle.load(open('trainedModel14.pkl','rb'))

print(model.best_params_)

print("la sensibilidad es de")
print(model.best_score_)

#orden de valores en X_test(Returning_Visitor, Administrative, Administrative_Duration, Informational, ProductRelated, ProductRelated_Duration, BounceRates, ExitRates, PageValues, SpecialDay, OperatingSystems, Region, TrafficType)
print(model.predict([[1,3,82.53333333,1,19,668.7,0.022727273,0.032424242,11.5952257,0,1,3,2]]))
print(model.predict([[1.00000000e+00, 3.00000000e+00, 8.25333333e+01, 1.00000000e+00,
       1.90000000e+01, 6.68700000e+02, 2.27272730e-02, 3.24242420e-02,
       1.15952257e+01, 0.00000000e+00, 1.00000000e+00, 3.00000000e+00,
       2.00000000e+00]]))
# Administrative,Administrative_Duration,Informational,Informational_Duration,ProductRelated,ProductRelated_Duration,BounceRates,ExitRates,PageValues,SpecialDay,Month,OperatingSystems,Browser,Region,TrafficType,VisitorType,Weekend,Revenue
#3,82.53333333,1,0,19,668.7,0.022727273,0.032424242,11.5952257,0,Nov,1,1,3,2,Returning_Visitor,FALSE,FALSE
