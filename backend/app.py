from flask import Flask, render_template, json, request
import mysql.connector
import os, json

app = Flask(__name__)

table_name = os.environ["MYSQL_TABLENAME"]

def create_table_if_not_exists():
    
    # Connect without specifying the database
    cnx = getMysqlConnection()
    cursor = cnx.cursor()
    cursor.execute(f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    Id int NOT NULL auto_increment,
                    Title varchar(255),
                    Content TEXT,
                    Author varchar(255),
                    ShortContent TEXT,
                    TimeUploaded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    primary key (id)
                );
                   """)
    print("Database Created")
    cursor.close()
    cnx.close()

def getMysqlConnection():
    return mysql.connector.connect(user=os.environ["MYSQL_USER"], host=os.environ["MYSQL_HOST"], port='3306', password=os.environ["MYSQL_PASSWORD"], database=os.environ["MYSQL_DB"])


@app.route("/api/healthCheck")
def main():
    return {"status":"ok"}


@app.route("/api/getAllBlogs")
def getAllBlogs():
    db=getMysqlConnection()
    cursor = db.cursor()
    cursor.execute(f"SELECT Author, Id, ShortContent, TimeUploaded, Title FROM {table_name} ORDER BY TimeUploaded DESC")
    results = cursor.fetchall()    
    columns = [desc[0] for desc in cursor.description] 
    data = [dict(zip(columns, row)) for row in results]
    db.close()
    return data

@app.route("/api/getBlog/<int:id>",methods=["GET"])
def getBlog(id):
    db=getMysqlConnection()
    cursor = db.cursor()
    cursor.execute(f"SELECT Author, Id, Content, TimeUploaded, Title FROM {table_name} where Id= {id}")
    results = cursor.fetchall()    
    db.close()
    columns = [desc[0] for desc in cursor.description] 
    data = [dict(zip(columns, row)) for row in results]
    return data


@app.route("/api/createBlog", methods=["POST"])
def createblog():
    Title = request.json["Title"]
    Author = request.json["Author"]
    Content = request.json["Content"]
    if not (Title and Author and Content):
        return json.dumps({"error":"SomeError"})
    ShortContent =request.json["Content"][0:255] + "...."
    db=getMysqlConnection()
    cur = db.cursor()
    cur.execute(f"INSERT INTO {table_name} (Title, Author, ShortContent, Content) VALUES ('{Title}', '{Author}', '{ShortContent}', '{Content}')")
    db.commit()
    cur.close()
    db.close()
    return ({'message': 'Blog Created successfully'}) 

@app.route("/api/updateBlog", methods=["POST"])
def updateblog():
    Content = request.json["Content"]
    Id = request.json["Id"]
    if not Content:
        return json.dumps({"error":"SomeError"})
    ShortContent =request.json["Content"][0:255] + "...."
    db=getMysqlConnection()
    cur = db.cursor()
    cur.execute(f"UPDATE {table_name} SET ShortContent='{ShortContent}', Content='{Content}' WHERE Id='{Id}'")
    db.commit()
    cur.close()
    db.close()
    return ({'message': 'Blog updated successfully'}) 


@app.route("/api/deleteBlog/<int:id>", methods=["POST"])
def deleteBlog(id):
    print(id)
    if not id: 
        id=0
    db=getMysqlConnection()
    cur = db.cursor()
    cur.execute(f"DELETE FROM {table_name} where Id={id}")
    db.commit()
    cur.close()
    db.close()
    return ({'message': 'Blog Deleted successfully'}) 

if __name__ == "__main__":
    # print(os.environ)
    # create_database_if_not_exists()
    create_table_if_not_exists()
    app.run(host ='0.0.0.0',port='5000',debug=True)
