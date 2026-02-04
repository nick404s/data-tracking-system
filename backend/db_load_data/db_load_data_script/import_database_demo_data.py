import pandas as pd
from sqlalchemy import create_engine, text

from sqlalchemy.orm import sessionmaker


class DB:

    def __init__(self):
        # db = {
        #     'servername': 'cs6400.postgres.database.azure.com',
        #     'database': 'postgres',
        #     'username': 'pgadmin',
        #     'password': '*omH@cfq$KhYgTr@xTchbByDo76!ftY7pS63PuGhoc2f7Ui52AuP*aQZp@U#oBMX',
        # }
        #
        # conn_string = f"postgresql://{db['username']}:{quote(db['password'])}@{db['servername']}:5432/{db['database']}?sslmode=require"
        conn_string = 'postgresql://postgres:postgres@db:5432/cs6400'
        #conn_string = 'postgresql://postgres:password!@localhost:5432/postgres'
        self.engine = create_engine(conn_string)

    def query(self, sql):
        return pd.read_sql(sql, self.engine)

    def write_table(self, table_name, data: pd.DataFrame):
        print(f'writing {table_name}')
        data.to_sql(table_name, self.engine, if_exists='append', index=False)

    def read_table(self, table_name: str):
        sql = f'''
        SELECT * from {table_name}
        '''
        return self.query(sql)

    def reset_tables(self):
        print('Dropping existing tables and loading schema')
        Session = sessionmaker(self.engine)
        with self.engine.connect() as con:
            with Session(bind=con) as session:
                file = '../db_load_data_script/team001_p2_schema.sql'
                # file = 'Phase_2/team001_p2_schema.sql'
                with open(file) as f:

                    query = text(f.read())
                session.execute(query)
                session.commit()
        return query


def seed_locations():
    df = pd.read_excel('../db_load_data_script/Demo Data/locations.xlsx')
    db.write_table(table_name='locations', data=df)
    return df


def seed_manufacturer():
    df = pd.read_csv('../db_load_data_script/Demo Data/Manufacturer.tsv', sep='\t')
    df = df.rename(columns={'manufacturer_name': 'manufacturername'})
    db.write_table(table_name='manufacturer', data=df)
    return df


def seed_households():
    df = pd.read_csv('../db_load_data_script/Demo Data/Household.tsv', sep='\t',
                     dtype={'area_code': str, 'phone_number': str, })
    household_map = {
        'email': 'emailaddress',
        'household_type': 'householdtype',
        'num_occupants': 'occupantscount',
        'bedroom_count': 'bedroomscount',
        'footage': 'squarefootage',
        'postal_code': 'postalcode',
    }
    phone_map = {
        'email': 'householdemail',
        'area_code': 'areacode',
        'phone_number': 'anumber',
        'phone_type': 'phonetype',
    }
    hoseholds = df[household_map.keys()].rename(columns=household_map)
    db.write_table(table_name='household', data=hoseholds)

    phones = df[phone_map.keys()].rename(columns=phone_map)
    phones = phones.dropna(subset='areacode')

    db.write_table(table_name='phone', data=phones)


def seed_households():
    df = pd.read_csv('../db_load_data_script/Demo Data/Household.tsv', sep='\t',
                     dtype={'area_code': str, 'phone_number': str, })
    household_map = {
        'email': 'emailaddress',
        'household_type': 'householdtype',
        'num_occupants': 'occupantscount',
        'bedroom_count': 'bedroomscount',
        'footage': 'squarefootage',
        'postal_code': 'postalcode',
    }
    phone_map = {
        'email': 'householdemail',
        'area_code': 'areacode',
        'phone_number': 'anumber',
        'phone_type': 'phonetype',
    }
    hoseholds = df[household_map.keys()].rename(columns=household_map)
    db.write_table(table_name='household', data=hoseholds)

    phones = df[phone_map.keys()].rename(columns=phone_map)
    phones = phones.dropna(subset='areacode')

    db.write_table(table_name='phone', data=phones)


def seed_bathroom():
    df = pd.read_csv('../db_load_data_script/Demo Data/Bathrooms.tsv', sep='\t',
                     dtype={'tub_count': pd.Int64Dtype(),
                            'shower_count': pd.Int64Dtype(),
                            'tub_shower_count': pd.Int64Dtype(),
                            'primary_bathroom': pd.Int64Dtype()})

    bathroom_base_map = {
        'household_email': 'householdemail',
        'bathroom_number': 'bathroomordinal',
        'commode_count': 'commodescount',
        'sink_count': 'sinkscount',
        'bidet_count': 'bidetscount'
    }
    half_bath_map = {
        'household_email': 'householdemail',
        'bathroom_number': 'bathroomordinal',
        'bathroom_name': 'bathroomname',
    }
    full_bath_map = {
        'household_email': 'householdemail',
        'bathroom_number': 'bathroomordinal',
        'tub_count': 'bathtubcount',
        'shower_count': 'showercount',
        'tub_shower_count': 'tubshowercount',
        'primary_bathroom': 'primarybathroom',
    }
    bathroom = df[bathroom_base_map.keys()].rename(columns=bathroom_base_map)
    db.write_table(table_name='bathroom', data=bathroom)

    halfbathroom = df[half_bath_map.keys()].rename(columns=half_bath_map)
    halfbathroom = halfbathroom.dropna(subset='bathroomname')
    db.write_table(table_name='halfbathroom', data=halfbathroom)

    fullbathroom = df[full_bath_map.keys()].rename(columns=full_bath_map)
    fullbathroom = fullbathroom.dropna(subset='showercount')
    fullbathroom['primarybathroom'] = fullbathroom['primarybathroom'].apply(bool)
    db.write_table(table_name='fullbathroom', data=fullbathroom)


def seed_appliances():
    df = pd.read_csv('../db_load_data_script/Demo Data/Appliance.tsv', sep='\t',
                     dtype={'display_size': pd.Int64Dtype(), })

    base_map = {
        'household_email': 'householdemail',
        'appliance_number': 'applianceorder'
    }

    def remap_columns_and_write_to_db(df, maper, db_name, drop_col=None):
        data = df[maper.keys()].rename(columns=maper)
        if drop_col:
            data = data.dropna(subset=drop_col)
        db.write_table(table_name=db_name, data=data)
        return data

    appliance_map = {
        **base_map,
        'manufacturer_name': 'manufacturername',
        'model': 'modelname'
    }
    remap_columns_and_write_to_db(df, appliance_map, 'appliance')

    dryer_map = {
        **base_map,
        'dryer_heat_source': 'heatsource'
    }

    remap_columns_and_write_to_db(df, dryer_map, 'dryer', drop_col='heatsource')

    washer_map = {
        **base_map,
        'washer_load_type': 'loadingtype'
    }

    remap_columns_and_write_to_db(df, washer_map, 'washer', drop_col='loadingtype')

    fridge_map = {
        **base_map,
        'refrigerator_type': 'refrigiratorfreezertype'
    }
    remap_columns_and_write_to_db(df, fridge_map, 'refrigiratorfreezer', drop_col='refrigiratorfreezertype')

    tv_map = {
        **base_map,
        'display_size': 'displaysize',
        'display_type': 'displaytype',
        'resolution': 'maxresolution'
    }

    remap_columns_and_write_to_db(df, tv_map, 'tv', drop_col='displaysize')

    cooker = df.dropna(subset=['cooktop_heat_source', 'oven_heat_sources'], thresh=1)
    cooker = cooker[base_map.keys()].rename(columns=base_map)
    db.write_table(table_name='cooker', data=cooker)

    cooktop_map = {
        **base_map,
        'cooktop_heat_source': 'heatsource',
    }
    remap_columns_and_write_to_db(df, cooktop_map, 'cooktop', drop_col='heatsource')

    oven_map = {
        **base_map,
        'oven_type': 'oventype',
    }
    remap_columns_and_write_to_db(df, oven_map, 'oven', drop_col='oventype')

    oven_heat_source_map = {
        **base_map,
        'oven_heat_sources': 'heatsource',
    }
    ovens = df.dropna(subset='oven_heat_sources')
    ovens = ovens[oven_heat_source_map.keys()].rename(columns=oven_heat_source_map)
    output = []
    for _, row in ovens.iterrows():
        heatsources = row['heatsource'].split(';')
        for heatsource in heatsources:
            row['heatsource'] = heatsource
            output.append(pd.Series(data={'householdemail': row['householdemail'],
                                          'applianceorder': row['applianceorder'],
                                          'heatsource': heatsource,
                                          }))

    ovens = pd.concat(output, axis=1).T
    db.write_table(table_name='ovenheatsource', data=ovens)


# if __name__ == '__main__':
db = DB()
db.reset_tables()

seed_locations()
seed_manufacturer()
seed_households()
seed_bathroom()
seed_appliances()

    #%%
