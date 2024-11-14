pipeline {
    agent any

    environment {
        FRONTEND_DIR = "frontend"
        BACKEND_DIR = "backend"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies for frontend and backend...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker build -t your-docker-username/frontend:latest ./${FRONTEND_DIR}'
                sh 'docker build -t your-docker-username/backend:latest ./${BACKEND_DIR}'
            }
        }
        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker push your-docker-username/frontend:latest'
                    sh 'docker push your-docker-username/backend:latest'
                }
            }
        }
        // Deployment stage would follow here
    }
}
