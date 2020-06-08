
# demo



How to run application.


Step:1  Create new user in mongodb: 

db.createUser(
{	
    
    user: "admin",
	pwd: "test1234",

	roles:[{role: "userAdmin" , db:"demo"}]})


Step:2 Run application
npm i
node index.js



API collection Description

POSTMAN collection
https://www.getpostman.com/collections/5f041648d2ca6cbd5398



1.  Search list of products purchase by date filter

GET:  /api/product/purchase/filter

Query Param:
filterby=today
filterby=tommorrow
filterby=yesterday
filterby=last2day
filterby=custom&startDate=2020-03-03T00:00:00.010Z&endDate=2020-08-03T00:00:00.010Z

sample response:
[
    {
        "count": 15,
        "dates": [
            "2020-08-03T00:00:00.010Z",
            "2020-05-03T00:00:00.010Z",
            "2020-05-03T02:00:00.010Z",
            "2020-05-03T02:50:00.010Z",
            "2020-05-04T00:50:00.010Z",
            "2020-05-04T00:00:00.000Z",
            "2020-05-04T04:00:00.000Z",
            "2020-05-04T04:00:00.000Z",
            "2020-05-04T04:00:00.000Z",
            "2020-06-07T04:00:00.000Z",
            "2020-06-07T04:07:00.000Z",
            "2020-06-08T09:07:00.000Z",
            "2020-06-06T22:24:00.901Z",
            "2020-06-06T22:25:00.076Z",
            "2020-06-06T22:28:43.793Z"
        ],
        "product_id": "5edbe9890ce7e20c10485811"
    },
    {
        "count": 1,
        "dates": [
            "2020-06-06T23:05:08.910Z"
        ],
        "product_id": "5edc211d183854651c573a45"
    }
]


2. Signup new user
POST /user/signup

3. Get details of user
POST /user/login

4.  Create new product
POST /api/product/create

5. Insert new product purchase
POST /api/product/purchase/create
 
6. Get product by id
GET /api/product/:product_id

7. Get product purchase by id
GET /api/product/purchase/:purchase_id

8. Get list of all product
GET /api/product/purchase/list

9. Get list of product view

GET api/product/view/filter
productId=5edbe9890ce7e20c10485811
filterby=daily
filterby=monthly
filterby=monthly
filterby=yearly
filterby=custom&startDate=2020-08-03&endDate=2021-08-03


