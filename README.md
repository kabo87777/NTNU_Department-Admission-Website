# Front end

## 建立專案

下載 package 和 dependency

```
$ pnpm install
```

## 編譯並為開發做熱重載

```
$ pnpm dev
```

## 寫完 Code 上傳前記得將 Coding Style 統一

```
$ pnpm prettier
$ pnpm lint --fix
$ pnpm lint
```

### 如果在 pnpm lint --fix 遇到 Permission Denied

代表被 permission denied 的檔案或目錄是 root 權限，因此先
(如果我的 user name 叫做 subarya)

```
$ sudo chown -R subarya:subarya 該資料夾或檔案
```
