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


// pipeline {
//   agent any
//   environment {
//     KUBE_CONFIG_TOKEN = credentials('kubeconfig-token')  // Fetch the token from Jenkins credentials
//     KUBE_API_SERVER = 
//   }
//   stages {
//     stage('Configure Kubernetes Access') {
//       steps {
//         sh '''
//         export KUBECONFIG=/tmp/kubeconfig
//         kubectl config set-cluster my-cluster --server=https://<K8S-API-SERVER> --insecure-skip-tls-verify=true
//         kubectl config set-credentials jenkins-user --token=$KUBE_CONFIG_TOKEN
//         # // kubectl config set-context my-context --cluster=my-cluster --user=jenkins-user
//         # // kubectl config use-context my-context
//         '''
//       }
//     }
//     stage('Get Kubernetes Namespaces') {
//       steps {
//         sh 'kubectl get namespaces'
//       }
//     }
//   }
// }
