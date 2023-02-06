<h1>react.js, gradle, springboot 연동 방법</h1>

1. SpringProjectName/src/main/ 경로로 접근 후 react 설치
```batch
cd src/main
npx create-react-app frontend	# npx create-reeact {프로젝트명}
```

2. 만든 리액트 프로젝트 폴더로 이동하여 npm 실행
```batch
cd frontend	# cd {프로젝트명}
npm start
```
3. 새 터미널 창 열고 작업하던 경로로 이동 후 아래 명령어 실행
```batch
npm install
npm run-script build
npm run eject   # 에러 발생 시 데이터를 전부 git push한 상태인지 확인
```

4. [리액트 PROJECT NAME]/config/paths.js 파일에서 buildPath 변수 build -> build/static


5. [리액트 PROJECT NAME] 폴더에서 axios를 설치
```batch
npm install axios --save
```

6. [리액트 PROJECT NAME]/pakage.json에 "proxy": "http://localhost:8080" 추가

7. [리액트 PROJECT NAME]/src/App.js에 해당 코드 추가
```javascript
import React, {useEffect, useState} from 'react';
    import axios from 'axios';

    function App() {
    const [hello, setHello] = useState('')

    useEffect(() => {
    axios.get('/api/hello')
    .then(response => setHello(response.data))
    .catch(error => console.log(error))
}, []);

    return (
    <div>
    백엔드에서 가져온 데이터입니다 : {hello}
    </div>
    );
}

export default App;
```

8. src/main/java/com.[springboot 프로젝트]에서 패키지 생성 후 HelloWorldController.java 파일을 생성
```java
package com.demogroup.demoweb.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
}
```

여기까지 진행시 localhost:3000에서는 "백엔드에서 가져온 데이터입니다 : hello world!"가,
localhost:8080에서는 "hello world!"가 출력되어야 한다.
(react는 npm start, spring boot는 project run 해야 함)
---

<h5>이제 localhost:8080에서 리액트 화면이 나올 수 있도록 스크립트 작성</h5>

9. SpringBoot 프로젝트의 build.gradle로 이동해서 dependencies{ ... }와 test{ ... } 사이에 아래 소스 첨부
```batch
def webappDir = "$projectDir/src/main/[PROJECTNAME]"

 sourceSets {
     main {
         resources {
         srcDirs = ["$webappDir/build", "$projectDir/src/main/resources"]
         }
    }
 }

 processResources {
    dependsOn "buildReact"
 }

 task buildReact(type: Exec) {
     dependsOn "installReact"
     workingDir "$webappDir"
     inputs.dir "$webappDir"
     group = BasePlugin.BUILD_GROUP
     if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
        commandLine "npm.cmd", "run-script", "build"
     } else {
        commandLine "npm", "run-script", "build"
     }
 }

 task installReact(type: Exec) {
     workingDir "$webappDir"
     inputs.dir "$webappDir"
     group = BasePlugin.BUILD_GROUP
     if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
         commandLine "npm.cmd", "audit", "fix"
         commandLine 'npm.cmd', 'install'
     } else {
         commandLine "npm", "audit", "fix"
         commandLine 'npm', 'install'
     }
 }

 task copyReactBuildFiles(type: Copy) {
	dependsOn "buildReact"
	from "$frontendDir/build"
	into "$projectDir/src/main/resources/static"
}
```

10. 홈 디렉토리로 빠져나와 빌드를 실행
```batch
./gradlew build
```

11. 빌드 완료 후 [SpringProjectName]/build/libs로 이동

12. 폴더 안에 있는 jar 파일 실행(java -jar FILENAME)

13. Localhost:8080 접속해서 React화면 출력되면 성공!

---
<h1>프론트앤드 필요 라이브러리 설치를 위한 명령어</h1>

직접 제작한 App.js로 내용을 변경하기 전에
프론트엔드 프로젝트 위치에 설치해야 정상 동작함
+App.js에 import axios from 'axios';는 지우지 말기

```batch
npm install react-router-dom
npm install --save styled-components
npm install @mui/material
npm install @mui/icons-material
npm install @emotion/styled
```

---
<h1>gradlew build시 오류 발생 해결</h1>

build.gradle 파일에 아래 코드 추가

```javascript
tasks {
	processResources {
		duplicatesStrategy = org.gradle.api.file.DuplicatesStrategy.INCLUDE
	}
}
```