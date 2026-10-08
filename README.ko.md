<div align="center">

# Ephemeris

**맥 데스크톱처럼 생기고, 맥처럼 움직이는 Jekyll 블로그.**
글은 문서 창으로 열리고, 글 목록은 Finder 에 있습니다. Dock · 메뉴 막대 · Spotlight 가 맥에서처럼 동작합니다.

[라이브 데모](https://wlswo.me) · [English](README.md)

<img src="docs/demo.gif" alt="잠금 해제, Dock 확대, Finder 에서 글 열기, Spotlight 검색, 시스템 설정에서 다크 모드로 바꾸기" width="880">

https://github.com/user-attachments/assets/5028657c-703d-47bd-aef0-c7312cae20bc

<sub>15초짜리 쇼릴입니다. 소리를 켜고 보세요.</sub>

</div>

## 기능

- **데스크톱**: 잠금 화면, 배경화면, 바탕 아이콘, 날씨 위젯. 메뉴 막대에는 Wi-Fi · 배터리 · 제어 센터 · Spotlight · 알림 센터
- **Dock**: GPU 로 처리하는 확대, 실행 중인 앱의 점, 실행할 때 튀어 오르기, 지니 효과로 최소화, 다운로드 스택
- **창**: 끌기, 모든 변에서 크기 조절, 화면 가장자리로 반쪽 · 4분의 1 붙이기, 확대 · 최소화, Mission Control(⌥↑), 앱 전환기(⌥Tab)
- **글을 세 가지로**: Finder(파일과 카테고리 태그), Obsidian(보관함의 노트), 미리보기(목차가 있는 읽기 창)
- **앱**: Mail(방문자가 나에게 메일 쓰기), 메모(고정된 about me 메모와 방문자 메모), 터미널(`ls` · `cat` · `open` · `neofetch` …), 캘린더, 게임(내 프로젝트), Spotify(유튜브로 재생하는 앨범 플레이어), 시스템 설정
- **시스템 설정**: 화면 모드(자동 · 라이트 · 다크), 배경화면(그림 · 단색 · 리눅스 명령어 격자), Dock 크기와 확대. 방문자마다 기억합니다
- **Spotlight**(⌘K / Ctrl+K): 글 · 앱 · 카테고리 검색과 간단한 계산
- **맥의 디테일**: SF Pro · Apple SD Gothic Neo 시스템 글꼴, 맥 커서, 페이지가 바쁠수록 빨리 달리는 메뉴 막대의 RunCat, 뒤에 있는 창의 회색 신호등
- **독자를 위해**: RSS · 사이트맵 · SEO · 공유 썸네일, 동작 줄이기와 투명도 줄이기 설정 존중, 어디서나 키보드로 조작, 폰 화면 지원
- **직접 빌드할 필요 없음**: GitHub Pages 가 빌드합니다. Jekyll 3/4 와 순수 JS 만 쓰고, 사이트에는 npm 이 없습니다

<table>
<tr>
<td><img src="docs/screenshot-light.png" alt="미리보기 창에 열린 글, 라이트 모드"></td>
<td><img src="docs/screenshot-dark.png" alt="글 목록을 보여 주는 Finder, 다크 모드"></td>
</tr>
</table>

## 빠르게 시작하기

1. **Use this template** → **Create a new repository** 를 누릅니다. 저장소 이름을 `<내 아이디>.github.io` 로 하면 `https://<내 아이디>.github.io` 에 블로그가 생깁니다.
2. **`_config.yml`** 을 고칩니다. 적어도 `title` · `author` · `email` · `url` 을 바꾸고, 맨 아래 `desktop:` 묶음도 살펴봅니다.
3. 저장소의 **Settings → Pages → Build and deployment** 에서 **Deploy from a branch** 를 고르고, `main` 과 `/ (root)` 를 선택해 저장합니다.
4. `_posts/` 의 샘플 글을 내 글로 바꿉니다.

1분쯤 지나면 데스크톱이 온라인에 올라옵니다.

## 설정

개인 값은 모두 `_config.yml` 과 `_data/` 에 있습니다. JavaScript 를 열 필요가 없습니다.

### `_config.yml`

| 키 | 하는 일 |
| --- | --- |
| `title` | 블로그 이름: 브라우저 탭, 이 Mac에 관하여, Obsidian 보관함, 터미널 |
| `author` | 내 이름: 잠금 화면, 이 Mac에 관하여, Mail, © 줄 |
| `email` | Mail 앱이 방문자의 메일을 보낼 주소. 비우면 Send 단추가 꺼집니다 |
| `url`, `baseurl` | 사이트 주소. `baseurl` 은 `/blog` 같은 하위 경로에 둘 때만 |
| `description` | 검색 엔진과 링크 미리보기의 기본 설명 |
| `timezone` | 글의 날짜와 주소를 이 시간대로 셉니다 |
| `desktop.apps` | 선택 앱 표시 여부. 묶음을 생략하면 기존처럼 모두 보이고, 각 앱을 `false` 로 끌 수 있습니다 |
| `wallpaper`, `wallpaper_2x`, `wallpaper_dark`, `wallpaper_dark_2x`, `wallpaper_tone` | 기본 배경화면. `wallpaper_tone: dark` 면 메뉴 막대 글자가 흰색 |
| `wallpaper_color`, `wallpaper_grid` | 선택: 그림 대신 단색, 또는 리눅스 명령어 격자 |

```yaml
desktop:
  username: guest           # 터미널 프롬프트와 whoami
  hostname: Ephemeris       # 터미널 프롬프트의 컴퓨터 이름
  wifi: Home-5G             # 연결된 것으로 보이는 Wi-Fi 이름
  apps:                     # 선택 앱. 생략한 키는 계속 표시
    obsidian: true
    mail: true
    notes: true
    terminal: true
    games: true
    music: true
  weather:                  # 바탕의 날씨 위젯(Open-Meteo, API 키 없음)
    city: Cupertino
    latitude: 37.3230
    longitude: -122.0322
  coins: [BTC-USD, ETH-USD] # 알림 센터의 시세 위젯(Coinbase). [] 이면 숨김
  about_category: Personal Blog   # 이 Mac에 관하여의 Category 줄
  druid: false              # false 그대로(원래 블로그의 앱이라 포함되지 않음)
```

`desktop.apps` 의 선택 앱을 `false` 로 바꾸면 Dock, Finder의 응용 프로그램 보기, Spotlight, 그리고 해당되는 터미널의 `~/Applications` 항목에서 사라집니다. `desktop.apps` 자체를 생략하면 기존처럼 모든 선택 앱을 표시합니다. Finder, Preview, 이 Mac에 관하여, 시스템 설정, Calendar는 기본 앱으로 유지됩니다.

`jekyll serve` 는 실행 중에 `_config.yml` 을 다시 읽지 않습니다. 고친 뒤에는 다시 켜 주세요.

### `_data/`

| 파일 | 담는 것 |
| --- | --- |
| `categories.yml` | 글 카테고리: 이름 · 아이콘 · 색, 그리고 `ko`(한국어 검색어) |
| `about_me.yml` | 메모 앱의 고정 메모(about me). `{posts}` · `{latest}` 는 글 수와 최근 글 제목으로 바뀝니다 |
| `projects.yml` | 게임 창에 앱 아이콘으로 서는 내 프로젝트. 아이콘은 `assets/images/apps/` |
| `music.yml` | Spotify 앱이 트는 앨범: 앨범 그림과 유튜브 영상 id |

## 글 쓰기

`_posts/YYYY-MM-DD-제목.md` 를 만듭니다.

```markdown
---
layout: minimal_post
title: "첫 글"
categories: [notes]
date: 2026-09-03 10:00:00 +0900
description: "Finder · Spotlight · 링크 미리보기에 보이는 한 줄 요약"
---

안녕, 데스크톱!
```

- `categories` 에는 `_data/categories.yml` 의 slug 하나를 적습니다.
- `##` · `###` 제목은 미리보기 창 사이드바의 목차가 됩니다.
- 코드 블록에는 문법 강조와 복사 단추가 붙고, 그림은 누르면 확대됩니다.

## 꾸미기

- **배경화면**: 그림을 `assets/images/` 에 넣고 `wallpaper*` 키를 그 경로로 바꿉니다. 방문자는 시스템 설정에서 다른 배경을 고를 수도 있습니다.
- **Dock 아이콘**: `assets/images/dock/<앱>-128.png` 와 `-256.png`(둘레 여백까지 그린 맥 스타일 둥근 사각형).
- **색과 크기**: 디자인 토큰은 `_sass/mac/_tokens.scss` 맨 위, 다크 모드는 `_sass/mac/_dark.scss` 에 있습니다.

## 내 컴퓨터에서 실행하기

```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

유튜브 임베드 규칙 때문에 음악 플레이어는 `127.0.0.1` 에서 재생되지 않습니다. `localhost` 로 여세요.

### 도구(선택, 사이트에 올라가지 않음)

| 폴더 | 하는 일 |
| --- | --- |
| `tools/og` | 글마다 1200×630 공유 썸네일을 `assets/og/` 에 굽습니다: `cd tools/og && npm install && node generate.mjs` |
| `tools/demo` | 실행 중인 개발 서버에서 `docs/demo.gif` 를 찍습니다(Chrome · ffmpeg 필요): `cd tools/demo && npm install && node record.mjs` |
| `tools/genie` | 지니 효과가 쓰는 html-to-image 를 다시 빌드합니다 |

## 브라우저

데스크톱과 모바일의 최신 Chrome · Edge · Safari · Firefox. CSS `backdrop-filter`, 개별 변형 속성(`scale` · `translate`), ES 모듈을 씁니다.

## 크레딧과 라이선스

테마 코드는 [MIT 라이선스](LICENSE)입니다. 글꼴 · 다른 회사의 그림 · 외부 서비스는 각자의 조건을 따릅니다. [NOTICE.md](NOTICE.md) 를 보세요.

Apple 과 관련 없는 개인 팬 프로젝트입니다. Apple · macOS · Finder 등의 이름과 로고는 Apple Inc. 의 상표입니다. 함께 들어 있는 맥 배경화면과 아이콘은 Apple 과 각 소유자의 것이라, 개인 블로그에는 괜찮지만 상업적으로 쓰려면 직접 만든 그림으로 바꿔 주세요.
