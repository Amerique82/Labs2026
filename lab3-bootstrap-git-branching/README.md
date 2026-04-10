# Lab 3 - Bootstrap, HTML Forms, CSS and Git Branching

## What this lab covers
Using the Bootstrap CSS framework, HTML forms with GET/POST, Developer Tools inspection, and Git branching workflow.

## Files

| File | Description |
|------|-------------|
| `index.html` | Home page using Bootstrap layout (navbar, cards, grid) |
| `form-get.html` | Bootstrap-styled form using GET method |
| `form-post.html` | Bootstrap-styled form using POST method |
| `styles.css` | Custom CSS on top of Bootstrap |

## Bootstrap
Bootstrap is loaded via CDN — no installation needed:
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
```
Key classes used: `container`, `row`, `col-md-7`, `form-control`, `btn`, `btn-primary`, `alert`, `navbar`, `card`

## GET vs POST (reminder)
| | GET | POST |
|---|---|---|
| Data location | URL (`?name=value`) | Request body |
| Use for | Search, filters | Passwords, sensitive data |

## Git Branching Workflow

```bash
# Create and switch to a new branch
git checkout -b feature-branch

# Add your file and commit
git add <filename.html>
git commit -m "helpful message"

# Push the branch to GitHub
git push -u origin feature-branch

# See all branches
git branch
git log

# Switch back to main and merge
git checkout main
git merge feature-branch
git push
```

### If there's a merge conflict
Git will mark the conflicting lines in the file like this:
```
<<<<<<< HEAD
your version
=======
partner's version
>>>>>>> feature-branch
```
Edit the file to keep the correct version, then:
```bash
git add .
git commit -m "resolve merge conflict"
git push
```
