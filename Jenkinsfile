pipeline {
  agent any
  stages {
    stage('Get Kubernetes Namespaces') {
      steps {
        sh 'kubectl get ns'
      }
    }
  }
}
