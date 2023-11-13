---
title: How to fix "syntax error, unexpected '|'" error in Symfony Polyfill in Wordpress plugins
date: 2022-03-04 08:00:00 +0000
categories:
  - wordpress
  - development
  - php
  - svn
layout: post
---

I experienced a quite troublesome problem when trying to upload a plugin to the Wordpress repository with SVN. The issue was some files of the Symfony Polyfill libraries. They contain code that is only compatible with PHP 8. The code is not supposed to run on older versions of PHP, but the Wordpress SVN validator will check all uploaded files whether they run or not. Since the Wordpress server doesn't have PHP 8 yet, it will raise an error.

```
Committing transaction...
svn: E165001: Commit blocked by pre-commit hook (exit code 1) with output:

***********************************
PHP error in: simple-social-media-preview/tags/1.0.0/vendor/psr/log/src/LoggerInterface.php:

Parse error: syntax error, unexpected '|', expecting variable (T_VARIABLE) in Standard input code on line 30
Errors parsing Standard input code
***********************************
```

I debugged alot and in the end I found no other solution than to delete the files that caused the problem, and prevent them from being loaded at all.

This can be done with a quite simple bash script.

```bash
# remove_bootstrap80.sh
# !/bin/bash

find ./vendor/symfony/polyfill -name "*.php" -type f | xargs sed -i -e "/return require __DIR__\.'\/bootstrap80\.php';/d"
find ./vendor/symfony/polyfill -name "bootstrap80.php" -delete
```

This will first remove the line that loads `bootstrap80.php` in all files, then delete all the `bootstrap80.php` files.
Doing this before uploading your plugin to the Wordpress SVN repository will make the problem to go away.
