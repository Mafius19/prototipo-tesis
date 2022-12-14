# Primer paso instalar los paquetes con pip
# pip install numpy-------------
# pip install pandas
# Para matplotlib dos paquetes: pip install pip, pip install matplotlib
# pip install seaborn
# pip install scikit-learn--------------
# pip install pickle-mixin
# pip install requests
#cuando el proxy en package.json no funciona borrar node modules y el package-lock.json:
#rm -r node_modules
#npm cache clean --force
#npm cache verify
#luego volver a instalar todo con: npm i
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from pandas.plotting import scatter_matrix
from sklearn.model_selection import train_test_split
#algortimos
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
#importar matriz de confusion
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import recall_score
from sklearn.model_selection import GridSearchCV
import pickle


shop=pd.read_csv('dataset/intention.csv')


font = {'size': 12}
plt.rc('font', **font)

# sumammos filas
shop.isna().sum()
#sumamos las columnas
shop.isna().sum(axis=1)
#total de set de datos
shop.isna().sum().sum()

print(shop['VisitorType'].unique())
shop.info()
shop.isna().sum()
shop.describe()
m=shop.describe()
m2=m.rename(columns={'Administrative_Duration':'A Duration','Informational_Duration':'I Duration','ProductRelated_Duration':'P Duration' })
                               
shop.isnull().sum()

x=shop.groupby(['VisitorType', 'Revenue'])['Revenue'].count()
ax=sns.countplot(x='VisitorType', hue='Revenue', palette='Set1', data=shop)
ax.set(title='Estado del pasajero (compro/no compro) dado a la clase a la que pertenecia', 
       xlabel='Nuevo visitador', ylabel='Total')
# plt.show()

shop.groupby(['Month', 'Revenue'])['Revenue'].count()


shop.groupby(['Month', 'Revenue'])['Revenue'].count()
ax=sns.countplot(x='Month', hue='Revenue', palette='Set1', data=shop)
ax.set(title='Mes de compras efectivas', 
       xlabel='Mes', ylabel='Total')
# plt.show()
shop['Revenue'].value_counts(normalize=True)


#CONVERTIR A NUMERICOS VARIABLES BOOLEANAS
shop_numeric=shop.copy()
#CONTAR VALORES FALSOS Y VERDADEROS
shop['Weekend'].value_counts()

#contamos los valores por mes
shop.groupby(['Month']).count()
#remplazamos los valores por verdadesp y falto 
shop_numeric['Weekend'].replace([True,False],[1,0], inplace=True)
shop_numeric['Revenue'].replace([True,False],[1,0], inplace=True)

#CONVERTIR MESES A DATOS NUMERICOS
shop_numeric['Month'].replace([ 'Feb', 'Mar', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
,[2,3,5,6,7,8,9,10,11,12], inplace=True)
# verificamos la cantidad por mes
shop_numeric.groupby(['Month']).count()
shop_numeric.info()
# convertir varible tipo de visitador
date_numeric=shop_numeric.drop(["VisitorType"], axis=1)
# cambiamos nombre para poder visaulizar mejor la tabla
#date_numeric=date_numeric.rename(columns={'Administrative_Duration':'A Duration','Informational_Duration':'I Duration','ProductRelated_Duration':'P Duration' })
date_categorica=shop_numeric.filter(["VisitorType"])
# vamos a usa la variable dummie
cat_numerical=pd.get_dummies(date_categorica.iloc[:,0], drop_first=False)
date=pd.concat([cat_numerical, date_numeric], axis=1)
#guardamos el archivo de lso datos transformados
date.to_csv('shop_total.csv', sep=';')
#leemos el archivo guardado
shop_total=pd.read_csv('shop_total.csv', sep=';')
shop_total=shop_total.drop(['Unnamed: 0'], axis=1)
shop_total.info()
#graficar todas las varibles
shop_total.hist(figsize=(15,13))
corr_s=shop_total.corr(method="spearman")
corr_k=shop_total.corr(method="kendall")
corr_s["Revenue"].sort_values(ascending=False)
corr_k["Revenue"].sort_values(ascending=False)

plt.figure(figsize=(20,10))
# sns.heatmap(corr_s,annot=True,center=1,robust=True)

#Grafica de correlaciones

scatter_matrix(shop_numeric, figsize=(14,10))
# plt.show()

#scaling

y = shop_total['Revenue'].copy()
X = shop_total.drop('Revenue', axis=1)


print('hasta aqui ok')
# DIVIDIR EN ENTRENAR Y TESTEO
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=20)
# scalador 
scaler = StandardScaler()
X_train_escalado= scaler.fit_transform(X_train)

# instaciar
forest_clf = RandomForestClassifier()
knn_clf = KNeighborsClassifier()
lr_clf= LogisticRegression()
nv_clf= GaussianNB()

# entrenamiento
forest_clf.fit(X_train,y_train)
knn_clf.fit(X_train,y_train)
lr_clf.fit(X_train,y_train)
nv_clf.fit(X_train,y_train)

#calcular las predicciones de cada modelo
y_train_prediccion_forest = cross_val_predict(forest_clf, X_train, y_train, cv=5)
y_train_prediccion_knn = cross_val_predict(knn_clf, X_train, y_train, cv=5)
y_train_prediccion_lr = cross_val_predict(lr_clf, X_train, y_train, cv=5)
y_train_prediccion_nv = cross_val_predict(nv_clf, X_train, y_train, cv=5)


#calculamos la matriz de confusion para cada modelo

confusion_matrix(y_train, y_train_prediccion_forest)
confusion_matrix(y_train, y_train_prediccion_knn)
confusion_matrix(y_train, y_train_prediccion_lr)
confusion_matrix(y_train, y_train_prediccion_nv)

recall_score(y_train, y_train_prediccion_forest)
#RESULTADO Out[13]: 0.5613238157040883
recall_score(y_train, y_train_prediccion_knn)
#RESULTADO 0.5587280986372486
recall_score(y_train, y_train_prediccion_lr)
#RESULTADAO0.5619727449707982
recall_score(y_train, y_train_prediccion_nv)
#RESULTADO  0.5606748864373783

# exportamos el algoritmo de random forest
pickle.dump(forest_clf, open('trainedModel.pkl','wb'))
# param_grid ={'n_estimators': [1, 10, 100, 1000], 'criterion': ['gini', 'entropy'], 'max_depth':[None,2,5,50,200],'min_samples_split':[0.1,2,3,4]}

# cuadricula = GridSearchCV(forest_clf, param_grid, return_train_score=True, scoring='recall', cv=5)

# cuadricula.fit(X_train, y_train) 
# cuadricula.best_params_
# cuadricula.best_score_

# lr_clf.get_params()

