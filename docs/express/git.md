# Git Notes

## Basic Command
1. ``git init // initialize local git repo``
2. ``git add <file> // add files to index (staging area)``
3. ``git status // check status of working tree (staging area)`` 
4. ``git commit  // commit changes in index``
5. ``git push // push to remote repo``
6. ``git pull // pull latest from remote repo``
7. ``git clone clone a // remote repo to local repo``
8. ``git log // 查看过去提交记录 --oneline会显示单行的提交记录，比较简洁`` 
9. ``git diff // unstaged比对过去staged文件, --cached 会比对 staged和staged有什么区别``
10.

## 基础知识
1. 4个状态：
untracked 未加入版本控制 
unmodified commit之后，最新的版本
modified 修改过但是没add 
staged 修改过而且add了，但是没commit

## More Command
1. ``git branch <branch name> // create a branch called <branch name>``
2. ``git checkout <branch name> // switch current branch to <branch name>, master is the main branch's name``
3. ``git merge <branch name> -m <merge message> // merge target branch to current branch, 子分支之间也可以merge`` // 如何revert merge??
4. ``git remote // to see the remote repo``
5. ``git remote add <remote repo name> <link> // add remote repo to current local repo with name <remote repo name>, origin is used in most case``
6. ``git remote remove <name> // to remove remote repo`` 说明：可以添加多个remote repo，不知道有什么作用
7. ``git reset --hard HEAD // 调整当前HEAD指针到上一次commit的时候``
   ``git reset --hard HEAD^ // 调整当前HEAD指针到上上次commit的时候``
   ``git checkout <commit id> // 也是可以直接将指正跳转到对应commit id的位置的，通过git checkout master可以回到最新的位置``
8. ``git reflog // 查看所做的head操作``
9. ``git log --graph --oneline --all // 可以查看git tree``

## 回到从前
场景一：
从staged到staged 
上次commit忘记commit一些东西，需要重新commit，但是不新开一次commit，我们就需要修改上一次的commit，然后重新提交
假设最近一次提交id为dfaaf40，信息为"change 1"
我们需要重新提交一次，假设我们修改文件app.js，然后``git add app.js``，使用 ``git commit --amend --no-edit``去补提交到上一次提交
执行完之后，我们的提交就会被加到上一次提交中，``--no-edit``会保持上一次的commit message, 所以上一次的提交信息不变，但是commmit id会变化，因为我们补提交了

场景二：
从staged 到 modified
我们改写了一个文件app.js，然后``git add app.js``，把这个文件加入到了staging area，现在想重新修改这个文件，但是不重新add。这时候使用``git status``会发现这个文件
已经加入了stage, 现在是想重新回到modified状态，我们可以使用 ``git reset app.js``, 这个命令会把app.js返回到``git add app.js``之前，而不是最新版本，也就是
modified状态。

场景三：

## Common Workflow
场景： 假设现在只有master分支，现在有若干features, 你被要求再开发一个feature
1. 首先，使用`git pull`拉取最新的代码，然后执行`git branch feature1`, 新建一个分支，然后`git checkout feature1`切换到feature1分支
2. 然后开始编写你这次feature1的代码，使用`git add .`, `git commit -m 'add feature1`
3. 回到master分支，执行`git pull`, 切换到feature1分支 `git checkout feature1`，然后`git merge master`
4. 提交一个pull request，然后等待merge

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
