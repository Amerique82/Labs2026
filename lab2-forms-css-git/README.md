# Lab 2 - Version Control, HTML Forms, CSS and Developer Tools

## What this lab covers
Git version control workflow, HTML forms with GET and POST methods, external CSS stylesheets, and using browser Developer Tools to inspect network requests.

## Files

| File | Description |
|------|-------------|
| `index.html` | Home page linking to all exercises |
| `form-get.html` | Form using the GET method — data sent in the URL |
| `form-post.html` | Form using the POST method — data sent in the request body |
| `styles.css` | External CSS stylesheet applied to all pages |

## Key concepts

### GET vs POST
| | GET | POST |
|---|---|---|
| Data location | URL parameters (`?name=value`) | Request body (hidden) |
| Use case | Search, filtering | Login, registration, sensitive data |
| Bookmarkable | Yes | No |

### Git workflow
```bash
git add .                        # Stage all changes
git commit -m "your message"     # Save a checkpoint
git push                         # Upload to GitHub
git pull                         # Download team changes
git status                       # See what has changed
git log                          # See commit history
```

### Git branching
```bash
git checkout -b feature-branch   # Create and switch to a new branch
git push -u origin feature-branch  # Push branch to GitHub
git checkout main                # Switch back to main
git merge feature-branch         # Merge branch into main
```

## How to run
Open any `.html` file in your browser. To inspect GET/POST requests use DevTools → Network tab (F12 or Cmd+Option+I).
