# SkillBridge Database Schema

## User
- name: String
- email: String
- password: String
- avatar: String
- bio: String
- location: { city, neighborhood, coordinates }
- matchingRadiusKm: Number
- blockedUsers: [User]
- role: String
- timestamps

## Listing
- owner: User
- type: offer/request
- title: String
- category: String
- tags: [String]
- description: String
- availability: String
- location: { city, neighborhood, coordinates }
- radiusKm: Number
- status: active/closed
- timestamps

## Match
- listing: Listing
- matchedListing: Listing
- users: [User]
- completed: Boolean
- timestamps

## Conversation
- participants: [User]
- listing: Listing
- timestamps

## Message
- conversation: Conversation
- sender: User
- content: String
- readBy: [User]
- timestamps

## Report
- reporter: User
- targetUser: User
- targetListing: Listing
- reason: String
- details: String
- timestamps

## Review
- reviewer: User
- listing: Listing
- rating: Number
- comment: String
- timestamps
