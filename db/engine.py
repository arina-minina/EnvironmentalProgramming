from sqlalchemy import create_engine

# echo=True -> выводит все SQL-запросы в консоль
engine = create_engine("sqlite:///mybase.db", echo=True)
