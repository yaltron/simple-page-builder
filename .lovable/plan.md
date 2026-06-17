Replace the existing logo with the uploaded `shubhashreelogo.png` and update sizing in 4 locations.

Step 1 — Copy uploaded logo to public folder
- Copy `user-uploads://shubhashreelogo.png` to `/public/logo.png`

Step 2 — Update logo img tag dimensions (src already "/logo.png" in all files)

Navbar (`src/components/navbar.tsx`):
- height: 40, width: "auto", maxWidth: 160, objectFit: "contain"

Footer (`src/components/footer.tsx`):
- height: 44, width: "auto", maxWidth: 176, objectFit: "contain"

Admin Sidebar (`src/components/admin/admin-shell.tsx`):
- height: 36, width: "auto", maxWidth: 140, objectFit: "contain"

Admin Login Page (`src/routes/admin.login.tsx`):
- Both logo img tags: height: 44, width: "auto", maxWidth: 176, objectFit: "contain"

No other changes — layout, padding, colors, fonts, navbar height all untouched.