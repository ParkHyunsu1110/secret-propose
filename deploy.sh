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

echo "=== 4. systemd 서비스 재시작 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "sudo systemctl daemon-reload && sudo systemctl restart secret-propose"
sleep 2

echo "=== 5. 상태 확인 ==="
ssh $SSH_OPTS -i $SSH_KEY $SSH_USER@$SERVER_IP "sudo systemctl is-active secret-propose && sudo systemctl status secret-propose --no-pager -n 20"

echo "=== 배포 완료 ==="
echo "API: http://$SERVER_IP:8080/api/memories"
