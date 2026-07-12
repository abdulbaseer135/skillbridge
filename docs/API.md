# SkillBridge API

## Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET /api/v1/auth/me

## Users
- GET /api/v1/users/profile
- PATCH /api/v1/users/profile
- PATCH /api/v1/users/profile/avatar
- POST /api/v1/users/:userId/block
- DELETE /api/v1/users/:userId/block

## Listings
- GET /api/v1/listings
- POST /api/v1/listings
- GET /api/v1/listings/:id
- PATCH /api/v1/listings/:id
- DELETE /api/v1/listings/:id
- GET /api/v1/listings/me
- GET /api/v1/listings/search

## Matches
- GET /api/v1/matches
- POST /api/v1/matches/:id/complete

## Conversations & Messages
- GET /api/v1/conversations
- POST /api/v1/conversations
- GET /api/v1/conversations/:id/messages
- POST /api/v1/conversations/:id/messages

## Reports
- POST /api/v1/reports

## Reviews
- POST /api/v1/reviews
