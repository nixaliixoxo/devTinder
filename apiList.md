DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

sender
- dynamic: POST /request/send/:status/:userId
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId

receiver
- dynamic: POST /request/review/:status/:requestId
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed

