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
- GET /user/pendingrequests
- GET /user/feed

PAGINATION

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)    //first 10 users 
/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)  //next 10 users
/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)  //next 10...

.skip() & .limit()

