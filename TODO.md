# TODO: Fix Username/Email Confusion

- [x] Add fetchuserByUsername function in actions/useractions.js
- [x] Update createRazorpayOrder in actions/useractions.js to find user by {username: to_username}
- [x] Update app/[username]/page.js to pass username (part before @) to PaymentPage instead of full email
- [x] Update PaymentPage.js to receive username, use fetchuserByUsername for user data, and use username for fetchpayment and createRazorpayOrder
- [x] Update PaymentPage.js router.replace to use username directly
