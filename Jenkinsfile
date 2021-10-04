node {
    environment {
        AWS_ECR = "633540653248.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio"
    }
    stage ('Pull'){
        sh 'dir'
        git url: 'https://github.com/chansoo1280/portfolio.git', credentialsId: 'git-chansoo1280'
    }
    stage ('build'){
        withAWS(credentials: 'aws-chansoo1280', region: 'ap-northeast-2') {
            sh(script: 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 633540653248.dkr.ecr.ap-northeast-2.amazonaws.com')
            sh 'docker build -t portfolio .'
            sh "docker tag portfolio:latest ${AWS_ECR}:${env.BUILD_NUMBER}"
            sh "docker push ${AWS_ECR}:${env.BUILD_NUMBER}"
            sh 'docker ps'
        }
    }
    stage ('gitops'){
        sh 'dir'
        sh '''#!/bin/bash
            curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
            mv kustomize /usr/local/bin/
            kustomize version
        '''
        git url: 'https://github.com/chansoo1280/devops.git', credentialsId: 'git-chansoo1280'
        sh 'dir'
        dir('argo/my-apps/portfolio/base') {
            sh "pwd"
            sh 'dir'
            sh "kustomize edit set image \"${AWS_ECR}=${AWS_ECR}:${env.BUILD_NUMBER}\""
            sh "cat kustomization.yaml"
        }
        sh '''
            git add .
            git commit -m "CODE BUILD"
            git push origin master
        '''
    }
}