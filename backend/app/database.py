import psycopg2
from urllib.parse import quote
import psycopg2.extras
import traceback


# https://www.psycopg.org/docs/usage.html

class Database:
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
        # conn_string = 'postgresql://postgres:password@host.docker.internal:5432/postgres'
        self.conn = psycopg2.connect(conn_string)

    def __del__(self):
        self.conn.close()

    def get_query(self, sql: str):
        with self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql)
            records = cur.fetchall()
        return records

    def insert_queries(self, sql_queries: list[str]):
        with self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            try:
                for sql in sql_queries:
                    cur.execute(sql)
                self.conn.commit()
            except BaseException:
                print(traceback.format_exc())
                if self.conn:
                    self.conn.rollback()
                raise Exception(traceback.format_exc())

    # def insert_query(self, sql: str):
    #     with self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
    #         try:
    #             cur.execute(sql)
    #             self.conn.commit()
    #         except BaseException as e:
    #             print(traceback.format_exc())
    #             if self.conn:
    #                 self.conn.rollback()
    #             raise Exception(traceback.format_exc())
