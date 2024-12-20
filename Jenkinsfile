pipeline {
    agent any

    environment {
        FRONTEND_DIR = "frontend"
        BACKEND_DIR = "backend"
        KUBE_CONFIG = '/mnt/jenkins/.kube/config'  // Path to kubeconfig in Jenkins instance
        DOCKER_REGISTRY = 'docker.io'
        FRONTEND_IMAGE = 'meghanaharish/frontend'
        BACKEND_IMAGE = 'meghanaharish/backend'
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
                sh 'docker build -t ${DOCKER_REGISTRY}/${FRONTEND_IMAGE} ./${FRONTEND_DIR}'
                sh 'docker build -t ${DOCKER_REGISTRY}/${BACKEND_IMAGE} ./${BACKEND_DIR}'
            }
        }
        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE}'
                    sh 'docker push ${DOCKER_REGISTRY}/${BACKEND_IMAGE}'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying frontend and backend to Kubernetes...'
                // Use service account credentials stored in Jenkins
                withKubeConfig([credentialsId: 'kubeconfig-jenkins']) {
                    script {
                        // Set the KUBECONFIG environment variable to point to the correct file
                        sh 'export KUBECONFIG=$KUBE_CONFIG'
                        sh '''
                            kubectl apply -f kubernetes/deployment.yaml
                            kubectl apply -f kubernetes/service.yaml
                            kubectl apply -f kubernetes/ingress.yaml
                        '''
                    }
                }
            }
        }
    }
}




















// pipeline {
//     agent any

//     environment {
//         FRONTEND_DIR = "frontend"
//         BACKEND_DIR = "backend"
//         KUBE_CONFIG = '/mnt/jenkins/.kube/config'  // Added kubeconfig location
//         DOCKER_REGISTRY = 'docker.io'
//         FRONTEND_IMAGE = 'meghanaharish/frontend'
//         BACKEND_IMAGE = 'meghanaharish/backend'
//     }

//     stages {
//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing dependencies for frontend and backend...'
//                 dir("${FRONTEND_DIR}") {
//                     sh 'npm install'
//                 }
//                 dir("${BACKEND_DIR}") {
//                     sh 'npm install'
//                 }
//             }
//         }
//         stage('Build Docker Images') {
//             steps {
//                 echo 'Building Docker images...'
//                 sh 'docker build -t ${DOCKER_REGISTRY}/${FRONTEND_IMAGE} ./${FRONTEND_DIR}'
//                 sh 'docker build -t ${DOCKER_REGISTRY}/${BACKEND_IMAGE} ./${BACKEND_DIR}'
//             }
//         }
//         stage('Push Docker Images') {
//             steps {
//                 echo 'Pushing Docker images...'
//                 withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
//                     sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
//                     sh 'docker push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE}'
//                     sh 'docker push ${DOCKER_REGISTRY}/${BACKEND_IMAGE}'
//                 }
//             }
//         }
//         stage('Deploy to Kubernetes') {
//             steps {
//                 echo 'Deploying frontend and backend to Kubernetes...'
//                 withKubeConfig([credentialsId: 'kubeconfig-jenkins']) {
//                     sh '''
//                         kubectl apply -f kubernetes/deployment.yaml
//                         kubectl apply -f kubernetes/service.yaml
//                         kubectl apply -f kubernetes/ingress.yaml
//                     '''
//                 }
//             }
//         }
//     }
// }
