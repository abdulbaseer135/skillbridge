# SkillBridge Backend Implementation Audit

## Summary
The backend currently has a solid Express/MongoDB structure and most domain models are present. Core API routes are implemented under `/api/v1` for auth, users, listings, matches, conversations, reports, and reviews.

However, there are several functional gaps and runtime issues that need to be addressed before the backend can be considered complete and production-ready.

## What Exists
- `backend/src/app.js` and `backend/src/server.js`
- JWT-based auth with register/login/logout and protected `/me`
- User profile read/update, avatar upload endpoint, block/unblock user
- Listings CRUD plus search filters and personal listings endpoint
- Match retrieval and completion endpoint
- Conversations and message creation/read endpoints
- Socket.io chat integration with token-based socket auth
- MongoDB models for User, Listing, Match, Conversation, Message, Report, Review
- Basic `zod` validation in controllers
- Security middleware: `helmet`, `cors`, rate limiting, error handling, not-found handling

## Missing / Incomplete Functionality
### Runtime & architecture issues
- `backend/src/app.js` calls `connectDB(process.env.MONGODB_URI)` but does not import `connectDB`.
- `backend/src/server.js` also calls `connectDB(...)`, causing duplicate connection logic if `app.js` is imported.
- `backend/src/routes/userRoutes.js` does not apply multer upload middleware on the avatar route, so `req.file` will always be empty.
- `backend/src/middleware/uploadMiddleware.js` is present but unused.
- `backend/src/utils/ApiError.js` exists but is not used anywhere.

### Business logic gaps
- Match creation is missing. `matchController.getMatches` computes possible matches from listings, but there is no endpoint to save or manage actual `Match` documents besides completion.
- `conversationController.createConversation` allows arbitrary `participantIds` without validation, duplication prevention, or participant membership checks.
- `messageController` does not validate that a conversation exists before creating a message beyond the participant check, and it does not populate the returned message consistently.
- Review and report APIs only support creation. No read/list endpoint exists for moderation or review history.

### Security and authorization gaps
- No role-based authorization middleware is implemented, despite `User.role` existing on the model.
- No authorization checks on reporting and reviewing: any authenticated user can post against any target without protection against self-reporting or duplicate reviews.
- Listing search endpoint accepts raw query params and uses regex without escaping; this is acceptable but should be hardened.

### Testing and quality
- Tests are minimal: only one auth negative test, one listings GET test, and one conversation auth test.
- No integration tests for protected routes, avatar upload, matching logic, or socket auth.
- No seed script exists in `src/seeds`, despite `package.json` exposing `seed`.

## Bugs and Risks
- `app.js` import bug will likely crash the server immediately on startup.
- Duplicate DB initialization may cause unstable behavior in test harnesses and repeated imports.
- Avatar upload endpoint is broken because `req.file` is never populated.
- Socket cookie parsing is naive and may fail with non-ASCII or encoded cookies.
- `createConversation` can create duplicate conversations or invalid participant arrays.

## Recommended Next Steps
1. Fix the Express app/server boot sequence
   - Import `connectDB` in `app.js` if DB connection is expected there, or remove the duplicate call and keep connection in `server.js` only.
   - Ensure `server.js` is the single bootstrap entrypoint.

2. Fix avatar upload flow
   - Apply `upload.single('avatar')` to `PATCH /api/v1/users/profile/avatar`.
   - Add file type and size validation.

3. Implement match persistence
   - Add endpoint(s) to create and list `Match` documents.
   - Ensure matches are stored, deduplicated, and scoped to users.

4. Harden conversation/message logic
   - Validate `participantIds` and prevent duplicates in `createConversation`.
   - Ensure messages are only created for valid conversations and return a populated response.

5. Add role authorization support
   - Add middleware for admin-only routes and protected review/report moderation if needed.

6. Expand API coverage
   - Add listing detail read/update/delete authorization
   - Add report/review retrieval routes if moderation or user history is required
   - Add review duplicate prevention or one-review-per-user policy if business rules dictate

7. Improve tests
   - Add unit/integration tests for auth, profile updates, listing CRUD, search, match logic, conversations, and socket auth.
   - Add tests for error conditions and unauthorized access.

8. Remove or populate unused folders
   - Delete empty `src/seeds`, `src/services`, `src/validators` directories or add intended implementation.
   - Remove unused `ApiError.js` or standardize error handling around it.

## Immediate High Priority Fixes
- `backend/src/app.js`: import `connectDB` or remove invalid call.
- `backend/src/routes/userRoutes.js`: wire avatar upload middleware.
- `backend/src/server.js`: avoid duplicate `connectDB` calls.
- `backend/src/controllers/userController.js`: add validation when blocking/unblocking users.

## Conclusion
The backend is substantially built and has the right model structure and route patterns. The next phase should be an implementation cleanup pass targeting runtime errors, upload flow, match persistence, and authorization. After those fixes, add focused test coverage to lock in behavior.
