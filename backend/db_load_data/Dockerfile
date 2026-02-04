FROM python:3.10

WORKDIR /db_seed/db_load_data_script

COPY requirements.txt /db_seed/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /db_seed/requirements.txt

COPY db_load_data_script /db_seed/db_load_data_script

CMD ["python","import_database_demo_data.py"]

