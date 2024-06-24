#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const tmpFolder = 'workspace_deps_copy';

(async () => {
  try {

    if (fs.existsSync(path.join(__dirname, '..', tmpFolder))) {
      await fs.promises.rm(path.join(__dirname, '..', tmpFolder), { recursive: true })
      await fs.promises.mkdir(path.join(__dirname, '..', tmpFolder));
    } else {
      await fs.promises.mkdir(path.join(__dirname, '..', tmpFolder));
    }

    await Promise.all([
      fs.promises.copyFile(
        path.join(__dirname, '..', 'package.json'),
        path.join(__dirname, '..', tmpFolder, 'package.json'),
      ),
      fs.promises.copyFile(
        path.join(__dirname, '..', 'package-lock.json'),
        path.join(__dirname, '..', tmpFolder, 'package-lock.json'),
      ),
    ]);

    const packageInfo = JSON.parse(fs.readFileSync(
      path.join(__dirname, '..', 'package.json'),
      'utf8'
    ));

    await Promise.all(packageInfo.workspaces.map((packageDir) => 
      fs.promises.mkdir(
        path.join(__dirname, '..', tmpFolder, packageDir),
        { recursive: true }
      )
    ));
    await Promise.all(packageInfo.workspaces.map((packageDir) => 
      fs.promises.copyFile(
        path.join(__dirname, '..', packageDir, 'package.json'),
        path.join(__dirname, '..', tmpFolder, packageDir, 'package.json'),
      )
    ));
  } catch (error) {
    throw error;
  }
})();
