# note-it

A website that helps you take notes online for easy access from any device.

![example](https://user-images.githubusercontent.com/124545488/217486465-454efdb8-f951-4f2f-bbce-d5ddcdb3ea51.png)

## Built With

* React
* Express.js
* MongoDB
* Bootstrap

## Installation

1. Clone the repo and cd into the directory:

```sh
git clone https://github.com/jonathan-ndcg/note-it.git
cd note-it
```

2. Install dependencies:

```sh
cd frontend
npm install
cd ../backend
npm install
```

3. [Install MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

4. [Create a MongoDB database](https://www.mongodb.com/basics/create-database)

4. Create a `.env` file in backend directory:

```dosini
PORT=SERVER_PORT
MONGODB_HOST=mongodb://localhost:27017/my_database
SECRET=JWT_SECRET_KEY
```

## Usage

1. [Run MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

2. Run the frontend:

```sh
cd frontend
npm start
```

3. Run the backend:

```sh
cd ../backend
node server
```

4. In a browser, go to [http://localhost:3000/](http://localhost:3000/)
