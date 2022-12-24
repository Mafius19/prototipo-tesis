import panda as pd

def transform( raw_data, init_date, final_date):
    data =[]
    for r in raw_data["user_sessions"]:
        data.append(
            {
                "administrative": r["admin_type_site"]["number_of_visit"],
                "informational": r["info_type_site"]["number_of_visit"],
                "product_related": r["product_site"]["number_of_visit"],
                "exit_rate": r["exit_rate"],#obtenida por google analytics
                #...
                # demás variables de interes
                #...
            }
        )
    df = pd.DataFrame(data)

    #Remover de la data df aquellos datos no necesarios (fuera del rango de fechas)
    #Donde por ej init_date = '1/01/2021' y final_date='31/12/2021'
    clean_df = df[pd.date_range(start = init_date, end = final_date)]

    #Data validation
    #en caso de que algun valor dentro del dataframe filtrado haya venido vacio
    #nos indica de que ese dato en especifico esta dañado y no sirve para almacenarse
    if df.isnull().values.any():
        raise Exception ("A value in df is null")

    return clean_df

  # if not df["played_at"].is_unique:
    #     raise Exception("A value from played_at is not unique")
