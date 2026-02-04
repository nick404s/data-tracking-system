from .models import *

# from .main import db
from .database import Database
db = Database()  # todo: initialize Database from sql.py file once all queries migrated

# ###########################    View Queries     ######################################

def query_email_check(email_check: EmailCheck):
    sql = f'''
    SELECT EmailAddress FROM HOUSEHOLD WHERE EmailAddress = '{email_check.email}';
    '''
    return db.get_query(sql)


def query_phone_check(phone_check: PhoneCheck):
    sql = f'''
    SELECT * FROM phone WHERE areacode = '{phone_check.areaCode}' AND anumber = '{phone_check.phoneNumber}';
    '''
    return db.get_query(sql)


def query_post_code(postal_code_check: PostalCodeCheck):
    sql = f'''
      SELECT PostalCode, City, AState
      FROM Locations
      WHERE PostalCode = '{postal_code_check.postalCode}';
    '''
    return db.get_query(sql)


def query_bathrooms(email: EmailCheck):
    sql = f'''
        SELECT b.BathroomOrdinal, 'Half' AS "Bathroom Type", FALSE
        FROM Bathroom b
        INNER JOIN HalfBathroom h
        on b.HouseholdEmail = h.HouseholdEmail and b.BathroomOrdinal = h.BathroomOrdinal
        WHERE b.HouseholdEmail = '{email.email}'
        UNION
        SELECT b.BathroomOrdinal, 'Full' AS "Bathroom Type", PrimaryBathroom
        FROM Bathroom b
        INNER JOIN FullBathroom f
        on b.HouseholdEmail = f.HouseholdEmail and b.BathroomOrdinal = f.BathroomOrdinal
        WHERE b.HouseholdEmail = '{email.email}'
        ORDER BY BathroomOrdinal;
        '''
    return db.get_query(sql)


def query_manufacturers():
    sql = f'''
            SELECT ManufacturerName FROM Manufacturer;
        '''
    return db.get_query(sql)


def query_appliances(email: EmailCheck):
    sql = f'''
        SELECT a.ApplianceOrder, 'Refrigerator/Freezer' AS "Appliance Type", a.ManufacturerName, a.ModelName 
        FROM Appliance a
        INNER JOIN RefrigiratorFreezer r
        on a.HouseholdEmail = r.HouseholdEmail and a.ApplianceOrder = r.ApplianceOrder
        WHERE a.HouseholdEmail = '{email.email}'
        UNION
        SELECT a.ApplianceOrder, 'Cooker' AS "Appliance Type", a.ManufacturerName, a.ModelName 
        FROM Appliance a
        INNER JOIN Cooker c
        on a.HouseholdEmail = c.HouseholdEmail and a.ApplianceOrder = c.ApplianceOrder
        WHERE a.HouseholdEmail = '{email.email}'
        UNION
        SELECT a.ApplianceOrder, 'Washer' AS "Appliance Type", a.ManufacturerName, a.ModelName 
        FROM Appliance a
        INNER JOIN Washer w
        on a.HouseholdEmail = w.HouseholdEmail and a.ApplianceOrder = w.ApplianceOrder
        WHERE a.HouseholdEmail = '{email.email}'
        UNION
        SELECT a.ApplianceOrder, 'Dryer' AS "Appliance Type", a.ManufacturerName, a.ModelName 
        FROM Appliance a
        INNER JOIN Dryer d
        on a.HouseholdEmail = d.HouseholdEmail and a.ApplianceOrder = d.ApplianceOrder
        WHERE a.HouseholdEmail = '{email.email}'
        UNION
        SELECT a.ApplianceOrder, 'TV' AS "Appliance Type", a.ManufacturerName, a.ModelName 
        FROM Appliance a
        INNER JOIN TV t
        on a.HouseholdEmail = t.HouseholdEmail and a.ApplianceOrder = t.ApplianceOrder
        WHERE a.HouseholdEmail = '{email.email}'
        ORDER BY ApplianceOrder;
        '''

    return db.get_query(sql)


# ###########################    Insert Queries     ######################################


def insert_household(household: AddData.AddHousehold):
    sql = f'''
        INSERT INTO Household
        (
        EmailAddress,
        HouseholdType,
        BedroomsCount,
        OccupantsCount,
        SquareFootage,
        PostalCode
        )
        VALUES
        (
        '{household.emailAddress}',
        '{household.homeType}',
        {household.bedrooms},
        {household.occupants},
        {household.squareFootage},
        '{household.postalCode}'
        );
    '''
    # db.insert_query(sql)
    return sql


def insert_phone(phone: AddData.AddPhone, email:str):
    sql = f'''
            INSERT INTO Phone
                (AreaCode, ANumber, HouseholdEmail, PhoneType)
            VALUES
                ('{phone.areaCode}', 
                '{phone.phoneNumber}', 
                '{email}', '
                {phone.phoneType}');
        '''
    # db.insert_query(sql)
    return sql


def insert_bathroom_base(bathroom_base: AddData.AddBathroom.BathroomBase, email: str):
    sql = f'''
          INSERT INTO Bathroom
            (HouseholdEmail, BathroomOrdinal, CommodesCount, SinksCount, BidetsCount)
          VALUES
            (
                '{email}',
                {bathroom_base.bathroomOrdinal},
                {bathroom_base.commodesCount},
                {bathroom_base.sinksCount},
                {bathroom_base.bidetsCount}
            );
        '''
    # db.insert_query(sql)
    return sql


def insert_full_bath(full_bath: AddData.AddBathroom.FullBathroom, email: str, ordinal: int):
    sql = f'''
          INSERT INTO FullBathroom
            (
                HouseholdEmail,
                BathroomOrdinal,
                BathtubCount,
                ShowerCount,
                TubShowerCount,
                PrimaryBathroom
            )
          VALUES
            (
                '{email}',
                {ordinal},
                {full_bath.bathtubCount},
                {full_bath.showerCount},
                {full_bath.tubShowerCount},
                {full_bath.primaryBathroom}
            );
        '''
    # db.insert_query(sql)
    return sql


def insert_half_bath(half_bath: AddData.AddBathroom.HalfBathroom, email: str, ordinal: int):
    sql = f'''
          INSERT INTO HalfBathroom
            (HouseholdEmail, BathroomOrdinal, BathroomName)
          VALUES
            (
                '{email}',
                {ordinal},
                '{half_bath.bathroomName}'
            );
        '''
    # db.insert_query(sql)
    return sql


def insert_appliance_base(appliance_base: AddData.AddAppliance.ApplianceBase, email: str):
    sql = f'''
            INSERT INTO Appliance
            (
              HouseholdEmail,
              ApplianceOrder,
              ModelName,
              ManufacturerName
            )
            VALUES
            (
              '{email}',
              {appliance_base.applianceOrder},
              '{appliance_base.modelName}',
              '{appliance_base.manufacturerName}'
            );
        '''
    # db.insert_query(sql)
    return sql


def insert_fridge(add_refrigerator_freezer: AddData.AddAppliance.AddRefrigeratorFreezer, email: str, ordinal: str):
    sql = f'''
    INSERT INTO
        RefrigiratorFreezer
        (
            HouseholdEmail,
            ApplianceOrder,
            RefrigiratorFreezerType
        )
        VALUES
        (
            '{email}',
            {ordinal},
            '{add_refrigerator_freezer.refrigeratorFreezerType}'
        );
    '''
    # db.insert_query(sql)
    return sql


def insert_washer(add_washer: AddData.AddAppliance.AddWasher, email: str, ordinal: str):
    sql = f'''
        INSERT INTO Washer
        (
          HouseholdEmail,
          ApplianceOrder,
          LoadingType
        )
        VALUES
        (
          '{email}',
          {ordinal},
          '{add_washer.loadingType}'
        );
    '''
    # db.insert_query(sql)
    return sql


def insert_dryer(add_dryer: AddData.AddAppliance.AddDryer, email: str, ordinal: str):
    sql = f'''
        INSERT INTO Dryer
        (
          HouseholdEmail,
          ApplianceOrder,
          HeatSource
        )
        VALUES
        (
          '{email}',
          {ordinal},
          '{add_dryer.heatSource}'
        );
    '''
    # db.insert_query(sql)
    return sql


def insert_tv(add_tv: AddData.AddAppliance.AddTV, email: str, ordinal: str):
    sql = f'''
            INSERT INTO TV
            (
              HouseholdEmail,
              ApplianceOrder,
              DisplaySize,
              DisplayType,
              MaxResolution
            )
            VALUES
            (
              '{email}',
              {ordinal},
              {add_tv.displaySize},
              '{add_tv.displayType}',
              '{add_tv.maxResolution}'
            );
    '''
    # db.insert_query(sql)
    return sql


def insert_cooker_base(email: str, ordinal: str):
    sql = f'''
            INSERT INTO Cooker
            (
              HouseholdEmail,
              ApplianceOrder
            )
            VALUES
            (
              '{email}',
              {ordinal}
            );
    '''
    # db.insert_query(sql)
    return sql


def insert_oven(add_oven: AddData.AddAppliance.AddCooker.CookerData.AddOven, email: str, ordinal: str):
    queries = []
    sql = f'''
            INSERT INTO Oven
            (
              HouseholdEmail,
              ApplianceOrder,
              OvenType
            )
            VALUES
            (
              '{email}',
              {ordinal},
              '{add_oven.ovenType}'
            );  
    '''
    # db.insert_query(sql)
    queries.append(sql)

    for heat_source in add_oven.heatSource:
        sql = f'''
            INSERT INTO OvenHeatSource
            (
              HouseholdEmail,
              ApplianceOrder,
              HeatSource
            )
            VALUES
            (
              '{email}',
              {ordinal},
              '{heat_source.heatSource}'
            );
        '''
        # db.insert_query(sql)
        queries.append(sql)
    return queries


def insert_cooktop(add_cooktop: AddData.AddAppliance.AddCooker.CookerData.AddCooktop, email: str, ordinal: str):
    sql = f'''
        INSERT INTO Cooktop
        (
          HouseholdEmail,
          ApplianceOrder,
          HeatSource
        )
        VALUES
        (
          '{email}',
          {ordinal},
          '{add_cooktop.heatSource}'
        );
    '''
    # db.insert_query(sql)
    return sql


# ###########################    Report Queries     ######################################


def report_fridge_count_homes_with_multiple():
    sql = f'''
    SELECT COUNT(FridgeCount) as CountHomesWithMoreThanOneFridge FROM
    (
    SELECT COUNT(*) as FridgeCount
    FROM HouseHold as h
    INNER JOIN RefrigiratorFreezer as r
        ON h.EmailAddress = r.HouseholdEmail
    GROUP BY h.EmailAddress
    ) as sub
    WHERE FridgeCount > 1;
    '''
    return db.get_query(sql)


async def report_fridge_top_10_extra_fridge():
    sql = f'''
    SELECT
        State,
        COUNT(*) as HomeWithMoreThanOneFridge,
        CAST(SUM(CASE WHEN ChestFreezerCount >= 1 THEN 1 ELSE 0 END) AS FLOAT) / CAST(count(*) AS FLOAT) as ChestFreezerPct,
        CAST(SUM(CASE WHEN UprightFreezerCount >= 1 THEN 1 ELSE 0 END) AS FLOAT) / CAST(count(*) AS FLOAT)  as UprightFreezerPct,
        CAST(SUM(CASE WHEN OtherFreezerCount >= 1 THEN 1 ELSE 0 END) AS FLOAT) / CAST(count(*) AS FLOAT)   as OtherFreezerPct
    FROM
    (
        SELECT
            MAX(l.astate) as State,
            COUNT(RefrigiratorFreezerType) as FridgeCount,
            SUM(CASE WHEN refrigiratorfreezertype = 'chest freezer'  THEN 1 ELSE 0 END) as ChestFreezerCount,
            SUM(CASE WHEN refrigiratorfreezertype = 'upright freezer' THEN 1 ELSE 0 END) as UprightFreezerCount,
            SUM(CASE WHEN (refrigiratorfreezertype = 'upright freezer' or refrigiratorfreezertype = 'chest freezer') THEN 0 ELSE 1 END)  as OtherFreezerCount
        FROM HouseHold h
        INNER JOIN RefrigiratorFreezer as r
            ON h.emailaddress = r.HouseholdEmail
        INNER JOIN Locations as l
            ON h.PostalCode = l.PostalCode
        GROUP BY h.emailaddress
    ) as sub
    WHERE FridgeCount > 1
    GROUP BY State
    ORDER BY HomeWithMoreThanOneFridge DESC
    LIMIT 10;
    '''
    return db.get_query(sql)


async def query_check_postal_code(postal_code: str):
    sql = f'''
      SELECT PostalCode
      FROM Locations
      WHERE PostalCode = '{postal_code}';
    '''
    return db.get_query(sql)


async def query_household_averages_by_radius(postal_code: str, search_radius: int):
    sql = f'''
    WITH HouseholdsInRange AS (
        SELECT *
        FROM Household H
        WHERE H.PostalCode IN (
        SELECT S.PostalCode
        FROM Locations L, Locations S
        WHERE L.PostalCode = '{postal_code}'
            AND 7917.5 * ASIN(
                LEAST(
                1,
                SQRT(
                  POWER(SIN((RADIANS(L.Latitude) - RADIANS(S.Latitude)) / 2), 2) +
                  COS(RADIANS(S.Latitude)) *
                  COS(RADIANS(L.Latitude)) *
                  POWER(SIN((RADIANS(L.Longitude) - RADIANS(S.Longitude)) / 2), 2)
                )
              )
            ) <= {search_radius}
           )
          )
        SELECT
          '{postal_code}'  "Postal Code",
          {search_radius} "Search Radius",
          Round(Avg(BathroomStats.BathroomCount), 1) "Average # Of Bathrooms",
          Round(Avg(H.BedroomsCount), 1) "Average # Of Bedrooms",
          Round(Avg(H.OccupantsCount)) "Average # Of Occupants",
          FORMAT('%s : %s', SUM(BathroomStats.Commode), Round(AVG(BathroomStats.CommodesToOccupants)::numeric, 2)) "Ratio of Commodes to Occupants",
          Round(Avg(ApplianceStats.ApplianceCount), 1) "Average # Of Appliances",
          MAX(HeatsourceStats.heatsource) "Most Common Heat Source"
        FROM HouseholdsInRange H, (
            SELECT 
            MAX(B.BathroomOrdinal) BathroomCount, 
            CASE 
                WHEN SUM(B.CommodesCount) = 0 
                    THEN ROUND(AVG(H.OccupantsCount))
                ELSE
                        (AVG(H.OccupantsCount) / CAST(SUM(B.CommodesCount) AS FLOAT)) 
            END AS CommodesToOccupants, 
			CASE 
                WHEN SUM(B.CommodesCount) = 0 
                    THEN 0
                ELSE
						SUM(B.CommodesCount) / SUM(B.CommodesCount) 
			END AS Commode
        FROM Bathroom B, HouseHoldsInRange H
        WHERE B.HouseholdEmail = H.EmailAddress
        GROUP BY H.EmailAddress
        ) BathroomStats, (
          SELECT MAX(A.ApplianceOrder) ApplianceCount
          FROM Appliance A, HouseHoldsInRange H
          WHERE A.HouseholdEmail = H.EmailAddress
          GROUP BY A.HouseholdEmail
        ) ApplianceStats, (
            SELECT HeatSource
            FROM
            (
                SELECT HeatSource, count(*) as HeatSourceCount FROM
                HouseholdsInRange
                LEFT JOIN
                (
                    SELECT HouseholdEmail, HeatSource FROM Dryer
                    UNION SELECT HouseholdEmail, HeatSource FROM Cooktop
                    UNION SELECT HouseholdEmail, HeatSource FROM Ovenheatsource
                ) as heatsources
                ON HouseholdsInRange.EmailAddress = HeatSources.HouseholdEmail
                GROUP BY HeatSource
            ) as HeatSourceRank
            ORDER BY HeatSourceCount DESC
            LIMIT 1
        ) HeatsourceStats;
    '''
    return db.get_query(sql)



async def query_bathroom_report_stats():
    bathroom_report = {}

    sql_total_bathroom_stats = f'''
        SELECT 
            MIN(B.MinBathOrdinal) "Min Total Bathrooms", 
            ROUND(AVG(B.AvgBathOrdinal), 1) "Avg Total Bathrooms", 
            MAX(B.MaxBathOrdinal) "Max Total Bathrooms"
        FROM
            (SELECT 
                MIN(BathroomOrdinal) MinBathOrdinal, 
                ROUND(AVG(BathroomOrdinal), 1) AvgBathOrdinal, 
                MAX(BathroomOrdinal) MaxBathOrdinal
            FROM Bathroom 
            GROUP BY HouseholdEmail) AS B;
    '''

    total_bathroom_stats = db.get_query(sql_total_bathroom_stats)

    bathroom_report['TotalBathrooms'] = total_bathroom_stats

    sql_half_bathroom_stats = f'''    
        SELECT 
            MIN(B.BathroomOrdinal) "Min Half Bathrooms",
            ROUND(AVG(B.BathroomOrdinal), 1) "Avg Half Bathrooms",
            MAX(B.BathroomOrdinal) "Max Half Bathrooms"
        FROM Household H, HalfBathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    half_bathroom_stats = db.get_query(sql_half_bathroom_stats)

    bathroom_report['HalfBathrooms'] = half_bathroom_stats

    sql_full_bathroom_stats = f'''    
        SELECT
            MIN(B.BathroomOrdinal) "Min Full Bathrooms",
            ROUND(AVG(B.BathroomOrdinal), 1) "Avg Full Bathrooms",
            MAX(B.BathroomOrdinal) "Max Full Bathrooms"
        FROM Household H, FullBathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    full_bathroom_stats = db.get_query(sql_full_bathroom_stats)

    bathroom_report['FullBathrooms'] = full_bathroom_stats

    sql_commode_stats = f'''    
        SELECT 
            MIN(B.CommodesCount) "Min Commodes Count",
            ROUND(AVG(B.CommodesCount), 1) "Avg Commodes Count",
            MAX(B.CommodesCount) "Max Commodes Count"
        FROM Household H, Bathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    commodes_stats = db.get_query(sql_commode_stats)

    bathroom_report['Commodes'] = commodes_stats

    sql_sink_stats = f'''    
        SELECT
            MIN(B.SinksCount) "Min Sinks Count",
            ROUND(AVG(B.SinksCount), 1) "Avg Sinks Count",
            MAX(B.SinksCount) "Max Sinks Count"
        FROM Household H, Bathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    sink_stats = db.get_query(sql_sink_stats)

    bathroom_report['Sinks'] = sink_stats

    sql_bidet_stats = f'''    
        SELECT
          MIN(B.BidetsCount) "Min Bidets Count",
          ROUND(AVG(B.BidetsCount), 1) "Avg Bidets Count",
          MAX(B.BidetsCount) "Max Bidets Count"
        FROM Household H, Bathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    bidet_stats = db.get_query(sql_bidet_stats)

    bathroom_report['Bidets'] = bidet_stats

    sql_bathtub_stats = f'''    
        SELECT
          MIN(B.BathtubCount) "Min Bathtub Count",
          ROUND(AVG(B.BathtubCount), 1) "Avg Bathtub Count",
          MAX(B.BathtubCount) "Max Bathtub Count"
        FROM Household H, FullBathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    bathtub_stats = db.get_query(sql_bathtub_stats)

    bathroom_report['Bathtubs'] = bathtub_stats

    sql_shower_stats = f'''    
        SELECT
          MIN(B.ShowerCount) "Min Shower Count",
          ROUND(AVG(B.ShowerCount), 1) "Avg Shower Count",
          MAX(B.ShowerCount) "Max Shower Count"
        FROM Household H, FullBathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    shower_stats = db.get_query(sql_shower_stats)

    bathroom_report['Showers'] = shower_stats

    sql_tub_shower_stats = f'''    
        SELECT
          MIN(B.TubShowerCount) "Min TubShower Count",
          ROUND(AVG(B.TubShowerCount), 1) "Avg TubShower Count",
          MAX(B.TubShowerCount) "Max TubShower Count"
        FROM Household H, FullBathroom B
        WHERE H.EmailAddress = B.HouseholdEmail;
        '''
    tub_shower_stats = db.get_query(sql_tub_shower_stats)

    bathroom_report['TubShowers'] = tub_shower_stats

    sql_state_bidets_stats = f'''    
        SELECT
          L.AState State,
          SUM(B.BidetsCount) "Total Bidets"
        FROM Locations L, Household H, Bathroom B
        WHERE L.PostalCode = H.PostalCode AND H.EmailAddress = B.HouseholdEmail
        GROUP BY L.AState
        ORDER BY "Total Bidets" DESC
        LIMIT 1;
        '''
    state_bidets_stats = db.get_query(sql_state_bidets_stats)

    bathroom_report['StateBidets'] = state_bidets_stats

    sql_postal_code_bidets_stats = f'''    
        SELECT
          L.PostalCode "Postal Code",
          SUM(B.BidetsCount) "Total Bidets"
        FROM Locations L, Household H, Bathroom B
        WHERE L.PostalCode = H.PostalCode AND H.EmailAddress = B.HouseholdEmail
        GROUP BY L.PostalCode
        ORDER BY "Total Bidets" DESC
        LIMIT 1;
        '''
    postal_code_bidets_stats = db.get_query(sql_postal_code_bidets_stats)

    bathroom_report['PostalCodeBidets'] = postal_code_bidets_stats

    sql_household_one_primary_bathroom_stats = f'''    
        SELECT COUNT(DISTINCT F.HouseholdEmail)
        FROM FullBathroom F
        WHERE F.PrimaryBathroom = TRUE
        AND NOT EXISTS (
          SELECT *
          FROM Bathroom B
          WHERE F.HouseholdEmail = B.HouseholdEmail
          AND F.BathroomOrdinal !=  B.BathroomOrdinal
        );
        '''
    household_one_primary_bathroom_stats = db.get_query(sql_household_one_primary_bathroom_stats)

    bathroom_report['HouseholdWithOnePrimaryBathroom'] = household_one_primary_bathroom_stats

    return bathroom_report


async def query_laundry_report():
    laundry_report = {}

    sql_most_common_washer_dryer_by_state = f'''
    SELECT MostCommonLoadingType.AState, LoadingType, HeatSource
    FROM
    (
        SELECT AState, LoadingType
        FROM
        (
            SELECT
                AState,
                LoadingType,
                row_number () OVER (
                    PARTITION BY AState
                    ORDER BY count DESC
                ) LoadingTypeRank
            FROM (
                SELECT L.AState, W.LoadingType, count(*) as count
                      FROM Locations L
                           JOIN Household H on L.PostalCode = H.PostalCode
                           JOIN Washer W on W.HouseholdEmail = H.EmailAddress
                      GROUP BY LoadingType, AState
                      ORDER BY count(*) desc
                ) as LosgingTypeCountByState
        )  as LoadingTypeCountByStateWithRank
        WHERE LoadingTypeRank = 1
    ) as MostCommonLoadingType,
    (
        SELECT AState, HeatSource
        FROM
        (
            SELECT
                AState,
                HeatSource,
                row_number () OVER (
                    PARTITION BY AState
                    ORDER BY count DESC
                ) heatSourceRank
            FROM (
                SELECT L.AState, D.HeatSource, count(*) as count
                      FROM Locations L
                           JOIN Household h on L.PostalCode = h.PostalCode
                           JOIN Dryer d on d.HouseholdEmail = h.EmailAddress
                      GROUP BY HeatSource, AState
                      ORDER BY count(*) desc
                ) as HeatSourceCountByState
        )  as HeatSourceCountByStateWithRank
        WHERE heatSourceRank = 1
    ) as MostCommonHeatSource
    WHERE MostCommonHeatSource.AState = MostCommonLoadingType.AState
    ORDER BY MostCommonLoadingType.AState;
    '''

    most_common_washer_dryer_by_state = db.get_query(sql_most_common_washer_dryer_by_state)

    laundry_report['MostCommonWasherDryerByState'] = most_common_washer_dryer_by_state

    sql_households_with_a_washer_no_dryer_by_state_desc = f'''
    SELECT
      L.AState "State",
      COUNT(*) "Count"
    FROM Household H, Locations L
    WHERE H.PostalCode = L.PostalCode
    AND EXISTS (
      SELECT *
      FROM Washer W
      WHERE W.HouseHoldEmail = H.EmailAddress
    )
    AND NOT EXISTS (
      SELECT *
      FROM Dryer D
      WHERE D.HouseHoldEmail = H.EmailAddress
    )
    GROUP BY L.AState
    ORDER BY "Count" DESC;
    '''

    households_with_a_washer_no_dryer_by_state_desc = db.get_query(sql_households_with_a_washer_no_dryer_by_state_desc)

    laundry_report['HouseholdsWithWasherNoDryerByState'] = households_with_a_washer_no_dryer_by_state_desc

    return laundry_report


async def query_manufacturer_model_search(search_query: str):
    # todo: should we add limit to this.
    sql = f'''
        SELECT DISTINCT ManufacturerName, ModelName FROM Appliance WHERE LOWER(ManufacturerName) LIKE LOWER('%{search_query}%')
        OR LOWER(ModelName) LIKE LOWER('%{search_query}%') ORDER BY ManufacturerName ASC, ModelName ASC;
        '''
    return db.get_query(sql)


async def query_top_25_manufacturers():
    sql_top_25_manufacturers = f'''
    SELECT ManufacturerName, count(*) AS ApplianceCount FROM APPLIANCE
    GROUP BY ManufacturerName
    ORDER BY ApplianceCount DESC
    LIMIT 25;
    '''
    return db.get_query(sql_top_25_manufacturers)


async def query_manufacturers_appliances_count(manufacturer_name: str):
    sql = f'''
    SELECT
    (SELECT count(*) FROM Appliance a, TV x
    WHERE a.HouseholdEmail = x.HouseholdEmail AND a.ApplianceOrder = x.ApplianceOrder 
    AND a.ManufacturerName LIKE '{manufacturer_name}%') as TVCount,
    (SELECT count(*) FROM Appliance a, RefrigiratorFreezer x
    WHERE a.HouseholdEmail = x.HouseholdEmail AND a.ApplianceOrder = x.ApplianceOrder 
    AND a.ManufacturerName LIKE '{manufacturer_name}%') as RefrigeratorFreezerCount,
    (SELECT count(*) FROM Appliance a, Dryer x
    WHERE a.HouseholdEmail = x.HouseholdEmail AND a.ApplianceOrder = x.ApplianceOrder 
    AND a.ManufacturerName LIKE '{manufacturer_name}%') as DryerCount,
    (SELECT count(*) FROM Appliance a, Washer x
    WHERE a.HouseholdEmail = x.HouseholdEmail AND a.ApplianceOrder = x.ApplianceOrder 
    AND a.ManufacturerName LIKE '{manufacturer_name}%') as WasherCount,
    (SELECT count(*) FROM Appliance a, Cooker x
    WHERE a.HouseholdEmail = x.HouseholdEmail AND a.ApplianceOrder = x.ApplianceOrder 
    AND a.ManufacturerName LIKE '{manufacturer_name}%') as CookerCount
    FROM Appliance LIMIT 1;
    '''
    return db.get_query(sql)



async def query_average_tv_display_by_state():
    sql = f'''
    SELECT  AState, ROUND(AVG(DisplaySize), 1) as AvgTvSize
    FROM Household h
    INNER JOIN TV t
        ON h.EmailAddress = t.HouseholdEmail
    INNER JOIN Locations  l
        ON h.PostalCode = l.PostalCode
    GROUP BY AState
    ORDER BY AState ASC;
    '''
    return db.get_query(sql)


async def query_tv_data_drill_down(state: str):
    sql = f'''
    SELECT
        DisplayType,
        MaxResolution,
        ROUND(AVG(DisplaySize),1) as AvgTvSize
    FROM Household h
    INNER JOIN TV t
        ON h.EmailAddress = t.HouseholdEmail
    INNER JOIN Locations  l
        ON h.PostalCode = l.PostalCode
    WHERE l.AState = '{state}'
    GROUP BY DisplayType, MaxResolution
    ORDER BY AvgTvSize DESC;
    '''
    return db.get_query(sql)

