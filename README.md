# Industrial-Project
Team 1 repo

## File Formats
cammelCase for all files

## Languages
### Processing
Node
### Database
Supabase
JSON
### Frontend
React, CSS, JSON

## AI LLM
Gemini API

### API
The API follows a 3 layer approach. 

## GET all Accounts
''' http://localhost:3000/api/accounts '''

## GET Account by email
''' http://localhost:3000/api/accounts/email/{email} '''

## Create New Account
'''
    curl -X POST http://localhost:3000/api/accounts \
        -H "Content-Type: application/json" \
        -d '{
            "email": "newuser@example.com",
            "password": "securepassword123",
            "accountType": "business",
            "balance": 1000
        }'

'''

## Update Account Balance
''' 
    curl -X PUT http://localhost:3000/api/accounts/1/balance \
        -H "Content-Type: application/json" \
        -d '{
            "balance": 2500,
            "balanceComitted": 100
        }'

'''

## Update Account Information
'''
    curl -X PUT http://localhost:3000/api/accounts/1 \
        -H "Content-Type: application/json" \
        -d '{
            "email": "updated@example.com",
            "accountType": "personal",
            "accountNumber": 67890
        }'

'''

## Delete Account

'''
    curl -X DELETE http://localhost:3000/api/accounts/1

'''