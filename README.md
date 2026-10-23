# Chad Kurt Loza — Portfolio

A lightweight static portfolio website built with plain HTML, CSS, and vanilla JavaScript.
No Node.js, no build step, no backend, no database.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content (hero, about, skills, projects, certification, resume, contact) |
| `style.css` | Design: colors and fonts are at the top in `:root` |
| `script.js` | Mobile menu, resume viewer, mailto contact form, and a `CONFIG` block for screenshots and links |
| `resume.pdf` | Your resume (used for viewing and downloading) |
| `assets/` | Favicon and your project screenshots |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Open it locally

**Option A: double-click.** Open `index.html` in your browser. Everything works except that some
browsers will not show the embedded PDF viewer from a `file://` address. The "Open in new tab" and
"Download PDF" buttons still work.

**Option B: VS Code Live Server (recommended).**
1. Open the `Portfolio` folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

## Add your project screenshots and links

Open `script.js` and edit the `CONFIG` block at the top.

```js
campuscare: {
  image: "campuscare.png",          // file you saved inside assets/
  demo: "https://your-demo-link",   // optional
  code: "https://github.com/you/campuscare" // optional
},
```

- Empty values keep the placeholder or a disabled "link not added yet" button.
- Add a credential link with `certificateUrl` to show a "View credential" button.

## Update your resume

Replace `resume.pdf` with your new file. Keep the same file name.

## Edit text

All text lives in `index.html`. The content comes from your resume. If you add new skills or projects,
copy an existing block and change the text.

## Contact form

The form uses `mailto:`. It opens the visitor's email app with a draft addressed to you.
It cannot send messages by itself and does not show a fake "sent" message.
If you want real form submissions later, connect a service such as Formspree or Web3Forms.

## Deploy for free

### GitHub Pages
1. Create a new repository on GitHub (for example `portfolio`).
2. Upload all files in this folder (including `assets/`, `resume.pdf`, and `.nojekyll`) to the repository root.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site appears at `https://<your-username>.github.io/<repository-name>/` after a minute or two.

### Cloudflare Pages
1. Push the files to a GitHub repository.
2. In Cloudflare, go to **Workers & Pages > Create > Pages > Connect to Git** and pick the repository.
3. Leave **Build command** empty and set **Build output directory** to `/` (or leave it blank).
4. Save and deploy. You get a free `*.pages.dev` address.

All links in the site are relative, so it works from a subfolder address such as GitHub Pages project sites.
