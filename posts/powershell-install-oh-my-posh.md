---
title: "PowerShell - Install Oh-My-Posh"
tag: "Setup"
date: "January 24 2023"
excerpt: "Pada artikel ini kita akan melakukan instalasi Oh-My-Posh"
cover_image: "/images/posts/ohmyposh.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Install Oh My Posh

Buka Powershell dan ketikan perintah berikut ini untuk melakukan instalasi `oh-my-posh`

```powershell
winget install oh-my-posh
```

Setelah itu ketikan perintah berikut

```powershell
winget install --id XP8K0HKJFRXGCK --source msstore
```

## Buat Theme File Untuk Oh My Posh

> **CATATAN**: Contoh file tema disini berada di PATH `C:\Users\arman\AppData\Local\Programs\oh-my-posh\themes\me.omp.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "alignment": "left",
      "segments": [
        {
          "background": "#ffffff",
          "foreground": "#505050",
          "leading_diamond": "\u256d\u2500",
          "style": "diamond",
          "trailing_diamond": "\ue0b0",
          "type": "os"
        },
        {
          "background": "#2a2a2a",
          "foreground": "#16d5d1",
          "powerline_symbol": "\ue0b0",
          "properties": {
            "style": "folder",
            "folder_icon": "\uf07c"
          },
          "style": "powerline",
          "template": "  {{ .Path }} ",
          "type": "path"
        },
        {
          "background": "#addb67",
          "background_templates": [
            "{{ if or (.Working.Changed) (.Staging.Changed) }}#e4cf6a{{ end }}",
            "{{ if and (gt .Ahead 0) (gt .Behind 0) }}#f78c6c{{ end }}",
            "{{ if gt .Ahead 0 }}#C792EA{{ end }}",
            "{{ if gt .Behind 0 }}#c792ea{{ end }}"
          ],
          "foreground": "#011627",
          "powerline_symbol": "\ue0b0",
          "properties": {
            "branch_icon": "\ue725 ",
            "fetch_stash_count": true,
            "fetch_status": true,
            "fetch_upstream_icon": true,
            "fetch_worktree_count": true
          },
          "style": "powerline",
          "template": " {{ url .UpstreamIcon .UpstreamURL }}{{ .HEAD }}{{if .BranchStatus }} {{ .BranchStatus }}{{ end }}{{ if .Working.Changed }} \uf044 {{ .Working.String }}{{ end }}{{ if and (.Working.Changed) (.Staging.Changed) }} |{{ end }}{{ if .Staging.Changed }} \uf046 {{ .Staging.String }}{{ end }}{{ if gt .StashCount 0 }} \uf692 {{ .StashCount }}{{ end }} ",
          "type": "git"
        },
        {
          "background": "#ff79c6",
          "foreground": "#000000",
          "leading_diamond": "<transparent,#ff79c6>\ue0b0</>",
          "properties": {
            "time_format": "15:04:05 PM"
          },
          "style": "diamond",
          "template": " \u2665 {{ .CurrentDate | date .Format }} ",
          "trailing_diamond": "\ue0b0",
          "type": "time"
        }
      ],
      "type": "prompt",
      "newline": true
    },
    {
      "alignment": "right",
      "overflow": "break",
      "segments": [
        {
          "background": "#2a2a2a",
          "foreground": "#ffffff",
          "leading_diamond": "\ue0b2",
          "style": "diamond",
          "template": "  {{ .Name }} ",
          "trailing_diamond": "<transparent,#2a2a2a>\ue0b2</>",
          "type": "shell"
        },
        {
          "background": "#7a40c6",
          "foreground": "#011627",
          "leading_diamond": "\ue0b2",
          "style": "diamond",
          "template": "  {{ round .PhysicalPercentUsed .Precision }}% ",
          "trailing_diamond": "<transparent,#7a40c6>\ue0b2</>",
          "type": "sysinfo"
        },
        {
          "background": "#91f2ff",
          "foreground": "#000000",
          "leading_diamond": "\ue0b2",
          "properties": {
            "style": "roundrock",
            "threshold": 0
          },
          "style": "diamond",
          "template": "  {{ .FormattedMs }} ",
          "trailing_diamond": "<transparent,#91f2ff>\ue0b2</>",
          "type": "executiontime"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "left",
      "newline": true,
      "segments": [
        {
          "foreground": "#ffffff",
          "style": "plain",
          "template": "\u2570\u2500",
          "type": "text"
        },
        {
          "background": "#1DB954",
          "foreground": "#011627",
          "leading_diamond": "\ue0b6",
          "properties": {
            "playing_icon": "\uf1bc "
          },
          "style": "diamond",
          "template": " {{ .Icon }}{{ if ne .Status \"stopped\" }}{{ .Artist }} ~ {{ .Track }}{{ end }} ",
          "trailing_diamond": "\ue0c6 ",
          "type": "spotify"
        },
        {
          "foreground": "#1DB954",
          "foreground_templates": ["{{ if gt .Code 0 }}#ef5350{{ end }}"],
          "properties": {
            "always_enabled": true
          },
          "style": "plain",
          "template": "",
          "type": "exit"
        }
      ],
      "type": "prompt"
    }
  ],
  "console_title_template": "{{ .Folder }}",
  "final_space": true,
  "transient_prompt": {
    "background": "transparent",
    "foreground": "#d6deeb",
    "template": "\ue285 "
  },
  "version": 2
}
```

## Load Theme

Setelah Theme diatas kita buat selanjutnya kita akan gunakan atau me-load theme nya dengan cara

```powershell
oh-my-posh init pwsh --config "C:\Users\arman\AppData\Local\Programs\oh-my-posh\themes\me.omp.json" | Invoke-Expression
```

> **CATATAN**: Cara diatas akan meload oh-my-posh hanya sekali (jika keluar terminal atau membuka baru maka tidak akan me-load tema nya).
> Untuk menjalankan `oh-my-posh` secara otomatis di powershell harus menambahkan script di `$PROFILE`

Langkah pertama untuk melakukannya adalah membuat file `$PROFILE`

```powershell
New-Item -Path $PROFILE -Type File -Force
```

Setelah itu buka dengan text editor, disini saya menggunakan notepad

```powershell
notepad $PROFILE
```

Masukan script di dalam file `$PROFILE`

```powershell
oh-my-posh init pwsh --config "C:\Users\arman\AppData\Local\Programs\oh-my-posh\themes\me.omp.json" | Invoke-Expression
```

> Jika muncul error ketika startup powershell masalah dengan startup command, jalankan perintah berikut:

```powershell
Set-ExecutionPolicy RemoteSigned
```

## Hasilnya

![image](https://user-images.githubusercontent.com/64394320/216772160-e8488abc-7d10-4fd2-8132-9069de597e8a.png)
