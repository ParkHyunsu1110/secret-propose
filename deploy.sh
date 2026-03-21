#!/bin/bash
set -e

SERVER_IP="168.107.12.237"
SSH_KEY="~/Downloads/ssh-key-2026-02-28.key"
SSH_USER="opc"
SSH_OPTS="-o ConnectTimeout=30 -o ServerAliveInterval=30 -o StrictHostKeyChecking=no"
JAR_NAME="secret-propose-0.0.1-SNAPSHOT.jar"
JAR_PATH="build/libs/$JAR_NAME"
REMOTE_DIR="/home/opc/app"

echo "=== 1. JAR 빌드 ==="
./gradlew bootJar --no-daemon

echo "=== 2. 서버 디렉토리 생성 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "mkdir -p $REMOTE_DIR/data"

echo "=== 3. JAR 전송 ==="
scp $SSH_OPTS -i $SSH_KEY $JAR_PATH $SSH_USER@$SERVER_IP:$REMOTE_DIR/$JAR_NAME

echo "=== 4. 기존 프로세스 종료 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "PIDS=\$(pgrep -f \"java .*${JAR_NAME}\" || true); if [ -n \"\$PIDS\" ]; then kill \$PIDS || true; fi"
sleep 2

echo "=== 5. 애플리케이션 시작 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "cd $REMOTE_DIR && nohup java -Xmx256m -jar $JAR_NAME --server.port=8080 > app.log 2>&1 &"
sleep 3

echo "=== 6. 상태 확인 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "ps aux | grep '$JAR_NAME' | grep -v grep && echo 'APP RUNNING' || echo 'APP NOT RUNNING'"

echo "=== 배포 완료 ==="
echo "API: http://$SERVER_IP:8080/api/memories"
