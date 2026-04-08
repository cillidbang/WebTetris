$gitRemotePath = $args[0]
git init -b main
git add .
git commit -m "first commit"
git branch -M main
git remote add origin $gitRemotePath
git push -u origin main