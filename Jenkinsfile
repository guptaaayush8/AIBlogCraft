pipeline {
  agent any
  stages {
    stage('Get Kubernetes Namespaces') {
      steps {
        sh 'kubectl config get-contexts'
      }
    }
  }
}
