# DevTinder APIs
# DEVELOPER TINDER APLICATION  ALL USE APLICATION PROGRAM INTERFACE----------------->>>

## authRouter handle this 3 api
- POST /signup
- POST /login
- POST /logout

## profileRouter handle this 3 api
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter handle this 3 api
- POST /request/send/:status/:userId 
- POST /request/review/:status/:requestId

## userRouter handle this 3 api
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform
## Status:->
-- ignored, interested, accepeted, rejected
