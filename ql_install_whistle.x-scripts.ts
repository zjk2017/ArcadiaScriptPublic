/*
 * @Author: renxia
 * @Date: 2024-04-03 19:33:28
 * @LastEditors: renxia
 * @LastEditTime: 2024-06-05 08:57:11
 * @Description:
 *
 * new Env('whistle.x-scripts 插件安装与更新')
 * cron: 0 18 * * *
 */
import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execPromisfy, rmrf, mkdirp } from '@lzwme/fe-utils';

const githubProxyUrl = process.env.GH_PROXY_URL ?? '';
const baseDir = process.env.QL_WHISTLE_BASEDIR || '/ql/data/scripts/whistle/';

const repoList = ['x-scripts-rules', 'whistle.x-scripts'];

async function updateRepo(repoName: string) {
  if (repoName === 'whistle.x-scripts' && process.env.WS_GLOBAL_INSTALL !== '0') {
    await execPromisfy(`npm i -g @lzwme/whistle.x-scripts`);
    return;
  }

  const dir = resolve(baseDir, repoName);

  if (fs.existsSync(resolve(dir, '.git/config'))) {
    await execPromisfy(`git fetch --all && git reset --hard remotes/origin/main`, true, { cwd: dir });
  } else {
    rmrf(dir);
    await execPromisfy(`git clone ${githubProxyUrl}https://github.com/lzwme/${repoName}.git`, true, { cwd: dirname(dir) });
  }

  if (repoName === 'whistle.x-scripts') {
    await execPromisfy('pnpm install && pnpm build && npm link .', true, { cwd: dir });
  }
}

async function start() {
  mkdirp(baseDir);
  process.chdir(baseDir);
  console.log(process.cwd());

  const r = await execPromisfy('w2 stop', true, { cwd: baseDir });
  if (r.stderr) await execPromisfy('npm i -g whistle', true, { cwd: baseDir });
  for (const repoName of repoList) await updateRepo(repoName);

  await execPromisfy('w2 start', true, { cwd: baseDir });
}

start()
  .catch((e) => console.error(e))
  .finally(() => process.exit());
