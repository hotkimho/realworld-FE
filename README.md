# realworld-api

## RealwWorld 프로젝트란?
- 서로 다른 프론트엔드와 백엔드를 사용하여 `Medium` 사이트를 클론코딩 하는 프로젝트
- 참조 링크 : https://github.com/gothinkster/realworld

## 데모 사이트
- [sp.kp-realworld.com](https://sp.kp-realworld.com/)
- [kp-realworld.com](https://kp-realworld.com/)
- 서버 작업에 따라 동작이 안되는 홈페이지가 있을 수 있습니다. 다른 한 페이지는 동작이 가능합니다.
  
## 프로젝트 목적
- RealWorld 프로젝트를 구현하며, AWS ECS를 도입하고 스케일 아웃을 구현함으로써 안정적인 서비스 구현
- React + Golang, React + Spring boot 등 다양한 백엔드 프레임워크로 구현
  
## 기술 스택
- Front-End
    - React
    - Typescript
- Back-End
    - Go(v 1.20)
        - Gorilla/mux
        - Gorm(ORM)
- Database
    - AWS RDS(MariaDB)
    - Redis
- Infra and Deployment
    - AWS ECS(EC2)
    - Docker
    - Github actions
- Logging
    - AWS Cloudwatch
- API Doc
    - Swagger
- Error Tracking
    - Sentry

## API Docs
- [API Docs](https://api.kp-realworld.com/swagger/index.html)
  
## AWS 아키텍쳐
![Untitled](https://github.com/kp-realworld/realworld-BE/assets/26193155/0ee8acc0-f1dd-433e-b50b-29b79091aa3e)

## ERD
![erd](https://github.com/kp-realworld/realworld-BE/assets/26193155/8066c8a1-8db0-470c-82f3-399637d4f1c0)

