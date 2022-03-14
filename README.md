# BeadalMate_iOS

- Convention
    - Git Convention
    
    ```markdown
    Master (Main Branch)
    Develop (Main Branch)
    Feature/<Issue_number> or <Feature_name> / <Short Description>
    Release/<version_number>
    Hotfix/<Issue_number> or Issue/<Issue_number>
    ```
    
    - Git Commit Convention
    
    ```markdown
    feat: 새로운 기능 추가 (a new feature)
    fix: 버그 수정
    docs: 문서 수정
    style: 코드 포맷팅, 링팅, 세미콜론 누락, 콘솔로그 삭제, 코드 변경 X
    refractor: 코드 리팩토링
    chore: 빌드 업무 수정, 패키지 매니저 수정
    ```
    
    - React Native Convention
    
      - eslint/prettier
        - [Airbnb Script Convention](https://github.com/airbnb/javascript)
    
      - import
        - 상대경로
        - 예외: babel.config.js의 alias 경로에 해당 되면 alias path를 사용
    
    - Naming Convention
        - Kinds of naming cases
    
    | case | Description | example |
    | --- | --- | --- |
    | kebob-case | 소문자만 사용. 띄어쓰기 대신 '-' 사용 | what-do-you-want |
    | lowerCamelCase | 소문자 사용. 띄어쓰기 대신 대문자 사용 | whatDoYouWant |
    | PascalCase | 첫문자 대문자 사용. 띄어쓰기 대신 대문자 사용 | WhatDoYouWant |
    | snake_case | 소문자만 사용. 띄어쓰기 대신 '_' 사용 | what_do_you_want |
    | UPPER_CASE | 대문자만 사용. 띄어쓰기 대신 '_' 사용 | WHAT_DO_YOU_WANT |
    - directory: kebab-case
    
    ```markdown
    order
    
    intersection-bserver
    ```
    
    - .js: lowerCamelCase
    
    ```markdown
    cartService.ts
    ```
    
    - class | type | interface: PascalCase
    
    ```markdown
    // Timer.js 
    class Timer { 
    	// ... 
    }
    ```
    
    ```markdown
    // OrderDetail.ts 
    type OrderDetail { 
    	// ... 
    }
    ```
    
    - .jsx: PascalCase
    
    ```markdown
    CartList.jsx
    ```
    
    - etc: kebab-case
    
    ```markdown
    home-logo.png
    favicon.ico
    ```
    
    - Constant: UPPER_CASE
    
    ```markdown
    const MAXIMUM_COUNT = 99
    ```
    
    - React Component | Class | Type | Interface
    
    ```markdown
    // HomeScreen.jsx 
    function HomeScreen () { 
    	return ( <div>Home</div> ) 
    }
    ```
    
    - ETC: lowerCamelCase
    
    ```markdown
    function getStock () {
    }
    ```
