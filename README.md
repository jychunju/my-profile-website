# 개인 프로필 웹사이트

Node.js 18 이상이 설치된 상태에서 프로젝트 루트에서 `npm start`를 실행하고 http://localhost:3000 을 여세요. `npm run dev` 또는 `node server.cjs`로도 실행할 수 있습니다. 외부 패키지 설치 및 빌드는 필요하지 않습니다. 파일 수정 후 브라우저를 새로고침하면 반영됩니다. 서버 종료는 `Ctrl+C`입니다.

포트를 변경하려면 PowerShell에서 `$env:PORT = '3001'`을 실행한 뒤 `npm start`를 실행하세요.

```text
webpage/
├── public/             # 배포할 정적 웹사이트
│   ├── index.html      # 시작 페이지
│   ├── styles.css
│   └── script.js
├── stitch-export/      # 원본 디자인 참고 자료
├── server.cjs          # Node.js 기본 모듈로 만든 로컬 서버
├── package.json        # 실행 명령, 외부 의존성 없음
├── vercel.json         # Vercel 정적 배포 설정
└── README.md
```

새 이미지 등은 `public/assets/`에 추가하세요. 로컬 서버는 `public` 폴더만 제공합니다.

Vercel에서 Git 저장소를 가져올 때 Root Directory를 이 프로젝트 루트로 설정하세요. `vercel.json`은 Framework Preset을 Other (`null`), 빌드와 설치 명령을 생략, Output Directory를 `public`로 지정합니다. `server.cjs`는 로컬 실행용이며 정적 배포에 포함되지 않습니다. 공식 안내: https://vercel.com/docs/project-configuration/vercel-json

- `public/index.html`: Stitch 기반 디자인과 예시 프로필. 개인정보와 프로젝트 링크를 수정할 수 있습니다.
- `public/styles.css`: 원본 디자인의 스타일 및 모바일 반응형 구성.
- `public/script.js`: 모바일 메뉴, 현재 섹션 표시, 이메일 복사, 문의 양식을 메일 앱에 전달하는 기능.

프로젝트는 `https://example.com/projects/...` 예시 링크를 사용합니다. 이메일을 변경할 때는 `public/index.html`과 `public/script.js`의 `hong@example.com`을 함께 수정하세요. 연락 양식은 서버로 전송하지 않고 기본 메일 앱을 엽니다. 글꼴, 아이콘, 원본 프로필 이미지는 온라인 리소스를 사용하므로 인터넷 연결이 필요합니다.
