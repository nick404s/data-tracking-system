from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import traceback
from .sql import *
from .database import Database

db = Database()  # todo: initialize Database from sql.py file once all queries migrated

app = FastAPI()

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# docs = http://127.0.0.1:9000/docs or http://127.0.0.1:9000/redoc

@app.get("/")
async def root():
    return {"message": "CS 6400 - Team 001 - Hemkraft Project"}


# ###########################    View Queries     ######################################


@app.post("/email-check")
async def email_check(email_check: EmailCheck):
    result = query_email_check(email_check)
    if len(result) != 0:
        raise HTTPException(status_code=409, detail="email already exists")
    return {'message': 'OK! Email address is not taken'}


@app.post("/phone-check")
async def phone_check(phone_check: PhoneCheck):
    result = query_phone_check(phone_check)
    if len(result) != 0:
        raise HTTPException(status_code=409, detail="email already exists")
    return {'message': 'OK! Email address is not taken'}


@app.post("/postal-code")
async def postal_code(postal_code_check: PostalCodeCheck):
    result = query_post_code(postal_code_check)
    if len(result) == 0:
        raise HTTPException(status_code=409, detail="Postal code not found")
    return result[0]


@app.post("/view-bathrooms")
async def view_bathrooms(email: EmailCheck):
    result = query_bathrooms(email)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No matching appliances for the email")
    return result


@app.get("/appliance-manufacturers")
async def view_appliance_manufacturers():
    result = query_manufacturers()
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No matching appliances for the email")
    manufacturers = [item['manufacturername'] for item in result]
    return manufacturers


@app.post("/view-appliance")
async def view_appliance(email: EmailCheck):
    result = query_appliances(email)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No matching appliances for the email")
    return result


# ###########################    Insert Queries     ######################################


@app.post("/add-data")
async def insert_data(data: AddData):
    sql = []
    try:
        email = data.household.emailAddress
        sql.append(insert_household(data.household))

        if data.phone:
            sql.append(insert_phone(data.phone, email))

        for bathroom in data.bathroom:
            sql.append(insert_bathroom_base(bathroom.bathroomBase, email))
            ordinal = bathroom.bathroomBase.bathroomOrdinal
            if bathroom.bathroomType == AddData.AddBathroom.BathroomType.full:
                sql.append(insert_full_bath(bathroom.bathroomOther, email, ordinal))
            elif bathroom.bathroomType == AddData.AddBathroom.BathroomType.half:
                sql.append(insert_half_bath(bathroom.bathroomOther, email, ordinal))

        for appliance in data.appliance:
            sql.append(insert_appliance_base(appliance.applianceBaseData, email))
            ordinal = appliance.applianceBaseData.applianceOrder
            match appliance.applianceType:
                case AddData.AddAppliance.ApplianceType.RefrigiratorFreezer:
                    sql.append(insert_fridge(appliance.applianceOtherData, email, ordinal))
                case AddData.AddAppliance.ApplianceType.Washer:
                    sql.append(insert_washer(appliance.applianceOtherData, email, ordinal))
                case AddData.AddAppliance.ApplianceType.Dryer:
                    sql.append(insert_dryer(appliance.applianceOtherData, email, ordinal))
                case AddData.AddAppliance.ApplianceType.TV:
                    sql.append(insert_tv(appliance.applianceOtherData, email, ordinal))
                case AddData.AddAppliance.ApplianceType.Cooker:
                    sql.append(insert_cooker_base(email, ordinal))
                    for cooker_data in appliance.applianceOtherData.cookerData:
                        if cooker_data.cookerType == AddData.AddAppliance.AddCooker.CookerData.CookerType.Oven:
                            sql.extend(insert_oven(cooker_data.cookerItemData, email, ordinal))
                        elif cooker_data.cookerType == AddData.AddAppliance.AddCooker.CookerData.CookerType.Cooktop:
                            sql.append(insert_cooktop(cooker_data.cookerItemData, email, ordinal))
        db.insert_queries(sql)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=traceback.format_exc())
    return {'message': f'Successfully added {data.household.emailAddress}'}


# ###########################    Report Queries     ######################################


@app.get("/reports/extra-fridge/")
async def extra_fridge_report():
    count_homes_with_multiple_fridge = report_fridge_count_homes_with_multiple()
    top_10_extra_fridges = await report_fridge_top_10_extra_fridge()
    if len(top_10_extra_fridges) == 0:
        raise HTTPException(status_code=400, detail="No Matching Data")
    return {'extra_fridge_count': count_homes_with_multiple_fridge[0]['counthomeswithmorethanonefridge'],
            'top_10': top_10_extra_fridges}


@app.get("/reports/household-averages-by-radius/")
async def view_household_averages_by_radius_report(postal_code: str, search_radius: int):

    postal_code_result = await query_check_postal_code(postal_code)

    if len(postal_code_result) == 0:
        raise HTTPException(status_code=400, detail="No matching postal code")

    report = await query_household_averages_by_radius(postal_code, search_radius)

    if len(report) == 0:
        raise HTTPException(status_code=400, detail="No matching data for the postal code and radius")

    return report


@app.get("/reports/bathroom-stats/")
async def bathroom_stats_report():

    result = await query_bathroom_report_stats()

    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No bathrooms data found")

    return result


@app.get("/reports/laundry/")
async def view_laundry_report():

    result = await query_laundry_report()

    if len(result) == 0:
        raise HTTPException(status_code=400, detail='No laundry data found')

    return result


@app.get("/report/manufacturer-model-search/")
async def view_manufacturer_model_search_report(search_query: str):

    result = await query_manufacturer_model_search(search_query)

    # if len(result) == 0:
        # raise HTTPException(status_code=400, detail="No matching data for the search query")
    return result


@app.get("/report/top25-manufacturers/")
async def view_top_25_manufacturers_report():

    result = await query_top_25_manufacturers()

    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No matching data for the top 25 manufacturers")

    return result


@app.get("/report/manufacturer-drill-down/")
async def view_manufacturer_drill_down_report(manufacturer_name: str):

    result = await query_manufacturers_appliances_count(manufacturer_name)

    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No matching data for the manufacturer")

    return result


@app.get("/report/average-tv-display-by-state/")
async def view_tv_display_report():

    result = await query_average_tv_display_by_state()

    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No data for the average TV display")

    return result


@app.get("/report/tv-state-drill-down/")
async def view_tv_state_drill_down_report(state: str):

    result = await query_tv_data_drill_down(state)

    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No data for the average TV display")

    return result
