from flask import Flask, request
from bson.objectid import ObjectId
from json import dumps, loads
from flask_cors import CORS

from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://dbuser:dbuser123@mukeshbudania.yhmxoxn.mongodb.net/?retryWrites=true&w=majority&appName=mukeshbudania"
client = MongoClient(uri)

app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return {'message': 'landing page'}

@app.route('/create-user', methods= ['POST'])
def createUser():
    try:
        data = request.json
        # data = {'name': 'abc', 'email': 'abc@example.com', 'password': 'xyz', 'phone': 1234567890}
        client.db.users.insert_one(data)
        return {'message': 'success'}
    except: 
        return {'message': 'Error! Cannot create user.'}

@app.route('/users')
def getUsers():
    try:
        users = list(client.db.users.find())
        return loads(dumps({'message': 'success', 'users': users}, default=str)) 
    except: 
        return {'message': 'Something went wrong!'}

@app.route('/get-user/<id>')
def getUser(id):
    try:
        user = client.db.users.find_one({'_id': ObjectId(id)})
        return loads(dumps({'message': 'success', 'user': user}, default=str)) 
    except: 
        return {'message': 'Error! Cannot get this user.'}

@app.route('/update-user/<id>',methods=['POST'])
def updateUser(id):
    try:
        user = client.db.users.find_one({'_id': ObjectId(id)})
        data = request.json
        if user:
            client.db.users.update_one(user, {"$set": data})
            return {'message': 'The user is updated if existed.'}
        else:
            return {'message': 'Error! Cannot update.'}

    except: 
        return {'message': 'error'}

@app.route('/delete-user/<id>',methods=['DELETE'])
def deleteUser(id):
    try:
        client.db.users.delete_one({'_id': ObjectId(id)})
        return {'message': 'The user is deleted if existed.'}
    except: 
        return {'message': 'Error! Cannot delete.'}

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')