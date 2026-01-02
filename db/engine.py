from sqlalchemy import create_engine

# ❓ как поступать со ссылкой? ("sqlite:///:memory:")
# echo=True -> выводит все SQL-запросы в консоль
engine = create_engine("sqlite:///:memory:", echo=True)
