FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# 컨테이너 시작 시 uvicorn으로 FastAPI 서버 실행
# --host 0.0.0.0: 모든 네트워크 인터페이스에서 접근 가능 (컨테이너 외부에서 접근하려면 필수)
# --port 8000: 8000 포트에서 실행
# --reload: 코드 변경 시 자동 재시작 (개발 환경용)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
