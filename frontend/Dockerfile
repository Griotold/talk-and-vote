FROM node:22-slim

# 컨테이너 내부의 작업 디렉토리를 /app으로 설정
# 이후 모든 명령어는 이 디렉토리를 기준으로 실행됨
# 디렉토리가 없으면 자동으로 생성됨
WORKDIR /app

# 의존성 설치
# package.json과 package-lock.json을 먼저 복사
# 전체 소스를 복사하기 전에 의존성 파일만 먼저 복사하는 이유:
# - Docker 레이어 캐싱 활용
# - package.json이 변경되지 않으면 npm install을 캐시에서 재사용
# - 코드만 수정했을 때 빌드 속도가 훨씬 빨라짐
COPY package*.json ./
RUN npm install

# 소스 복사
# 로컬의 전체 소스코드를 컨테이너의 /app으로 복사
# 첫 번째 . : 로컬의 현재 디렉토리 (./frontend)
# 두 번째 . : 컨테이너의 현재 작업 디렉토리 (/app)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
