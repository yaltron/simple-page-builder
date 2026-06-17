Copy `src/assets/logo.png` to `public/logo.png` so it is served at the domain root (`/logo.png`).

Then update the logo `src` in four components and remove the now-unused asset import:

1. `src/components/navbar.tsx`
   - Remove: `import logoAsset from "@/assets/shubhashree-logo.png.asset.json"` and `const logo = logoAsset.url`
   - Change `<img src={logo} …` to `<img src="/logo.png" …`

2. `src/components/footer.tsx`
   - Remove: `import logoAsset from "@/assets/shubhashree-logo.png.asset.json"` and `const logo = logoAsset.url`
   - Change `<img src={logo} …` to `<img src="/logo.png" …`

3. `src/components/admin/admin-shell.tsx`
   - Remove: `import logoAsset from "@/assets/shubhashree-logo.png.asset.json"` and `const logo = logoAsset.url`
   - Change `<img src={logo} …` to `<img src="/logo.png" …`

4. `src/routes/admin.login.tsx`
   - Remove: `import logoAsset from "@/assets/shubhashree-logo.png.asset.json"` and `const logo = logoAsset.url`
   - Change both `<img src={logo} …` occurrences to `<img src="/logo.png" …`

No other attributes (className, style, width, height, alt, etc.) are touched.