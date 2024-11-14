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
                sh 'docker build -t meghanaharish/frontend:latest ./${FRONTEND_DIR}'
                sh 'docker build -t meghanaharish/backend:latest ./${BACKEND_DIR}'
            }
        }
        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker push meghanaharish/frontend:latest'
                    sh 'docker push meghanaharish/backend:latest'
                }
            }
        }
        // Deployment stage would follow here
    }
}
