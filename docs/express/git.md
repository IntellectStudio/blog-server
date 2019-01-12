# Git Notes

## Basic Command
1. ``git init // initialize local git repo``
2. ``git add <file> // add files to index (staging area)``
3. ``git status // check status of working tree (staging area)`` 
4. ``git commit  // commit changes in index``
5. ``git push // push to remote repo``
6. ``git pull // pull latest from remote repo``
7. ``git clone clone a // remote repo to local repo``
8. ``git log // 查看过去提交记录``
9. ``git diff // unstaged比对过去staged文件, --cached 会比对 staged和staged有什么区别``

## 基础知识
1. 4个状态：untracked unmodified modified staged
2. 

## More Command
1. ``git branch <branch name> // create a branch called <branch name>``
2. ``git checkout <branch name> // switch current branch to <branch name>, master is the main branch's name``
3. ``git merge <branch name> -m <merge message> // merge target branch to current branch, 子分支之间也可以merge`` // 如何revert merge??
4. ``git remote // to see the remote repo``
5. ``git remote add <remote repo name> <link> // add remote repo to current local repo with name <remote repo name>, origin is used in most case``
6. ``git remote remove <name> // to remove remote repo`` 说明：可以添加多个remote repo，不知道有什么作用



## Get Started

1. Download and install git
2. create a folder with certain files in it. (e.g index.html and app.js)
3. open it with git bash
4. ``git init`` init this repo which add .git folder to it
5. ``git config --global user.name 'Hao Peng'`` set git user name
6. ``git config --global user.name 'phshy0607@outlook.com'`` set git user email
7. ``git config --global --get user.name`` check the user name is set up, user.email for email
8. ``git add index.html`` add index.html to stage
9. ``git status``  check status on current stage, we will see index.html is added to stage, and app.js is untracked
10. ``git rm --cached index.html`` use this command to remove files from current stage
11. ``git add .`` add all files to stage
12. now we go modify some code in index.html and do ``git status`` again
13. we can see the file is not staged for commit, we can use git add to update this file to staging area
14. we add it by ``git add .``, now use ``git status``, we can see all files are in staging area again
15. now use ``git commit`` to commit files in staging area.
16. it opens up a editor (vim), you can insert some commit messages, lines that starts with a # will be ignored.
    After editing, just save and exit, the files will be committed after that.
17. now using a ``git status``, it will say nothing to commmit, working tree clean, which means nothing in staging area
18. type something in app.js, add it with ``git add .``, and commit it with ``git commit -m 'add app.js'``, this will skip you for editting commit messages
    and it takes whatever argument after the ``-m`` as a commit message.
19. Now we try use ``.gitignore``, use ``touch .gitignore`` to create a git ignore file. create a file that we want to ignore. (log.txt)
20. add ``log.txt`` to ``.gitignore`` file. After that, do a ``git add .``, do ``git status``, you won't see log.txt in staging area
21. for ignore folders, add ``/folderName`` to ignore file

## Branches
1. ``git status`` will tell you which branch you're at.
2. ``git branch login`` will create a branch called ``login``. This command won't switch current branch to ``login``, we're still at master branch
3. ``git checkout login`` will switch to ``login`` branch.
4. add a login.html file to workspace, and ``git add .``, then ``git commit -m 'changes'``.
5. 说明：branch上文件是独立的，文件都是独立的，在master上面有.gitignore文件，切到login分支就没了, 在login分支上的提交都不见了。切换分支本地文件都会变化。
6. we can merge changes now at master branch. ``git merge login``, it will still pop a editor for merge message, after doing that, we successfully merged login
    branch to master branch.

## publish
1. ``git remote`` to see remote repo, which has nothing currently
2. ``git remote add origin <git repo link>``. e.g ``git remote add origin https://github.com/phshy0607/learngit.git``
3. do ``git remote`` to check remote repo again， we will see a ``origin`` shows up
4. do ``git push -u origin master`` to push all the files to github, origin is the remote repo name, master is the branch name
