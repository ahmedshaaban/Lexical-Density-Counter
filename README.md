Lexical Density Counter
=============

Lexical density is defined as the number of lexical words​ (or content words) divided by the
total number of words. In the following sentence the green words are lexical words and the
density is 66,67%.
Kim loves going to the cinema
For the sake of simplicity, we define a lexical word​ as all words not contained in the
provided list of non lexical words in the Appendix. Case sensitivity should be ignored.


● Route: GET /complexity
○ Description:
    Return the lexical density of the inputted text. The text should be provided via the body.
○ output :
    ```{ “data”:{
    overall_ld: 0.42
    }
    }```

● Route: GET /complexity?mode=verbose
○ Description:
    Return the lexical density of the text broken down into sentences. The text should be provided via the body.
○ output :
    ```{ “data”:{
    sentence_ld: [ 0.23, 0.1, 1.0, 0.0],
    overall_ld: 0.42
    }
    }```


#### to run app native:

The base url is localhost:3000 

1. open .env.example and edit your env variables then remove .example from the extenstion file        
2. `npm i`
4. `node init-db.js`
5. `npm start`
6. To send a word please do as follow:
    1. send a word via post request the body must contain text field for ex:
        ```{"text":"This is a test sentance"}```
    2. send more than one sentance:
        ```{"text":"This is first test sentance. this is a second sentance"}```
7. To add a new non lexical word do as follow:
    1. signin using the email and password you had just added them in the .env file by sending
        a post request to this endpoint `/login` with a body like this ```{"email":"xxx@xxx.com", "password":"xxx"}```  
    2. you will receive a jwt token add this token to the Authorization header of the post request of adding a new word
        for example the curl request will look something like this 
        ```curl -X POST \
        http://localhost:8080/complexity/add \
        -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFobWVkaGFueV81QGhvdG1haWwuY29tIiwiaWQiOiI1YjViMTczOTI4OGY4MzAwMDYyMmM4OTIiLCJzdGFsZXMiOjE1MzI2OTgwMTI4NDQsImlhdCI6MTUzMjY5NzExMn0.ZibYbPjC1ehZp3BzSTmsb2Lr1xOH_gGzUfKdSZQgbcY' \
        -H 'Cache-Control: no-cache' \
        -H 'Content-Type: application/json' \
        -H 'Postman-Token: 071e5507-fe96-447a-b0ff-9160f5a682db' \
        -d '{
            "word":"test"
        }'```

----

#### to run app via docker-compose:

The base url is localhost:8080 

1. open the docker-compose file and add your env in the environment section but leave the DB_HOST as it is
2. `docker-compose build`
3. `docker-compose up`

#### to test app:

1. `npm test`
       
