node {
    // stage ('Pull'){
    //     sh 'dir'
    //     git url: 'https://github.com/chansoo1280/portfolio.git', credentialsId: 'git-chansoo1280'
    // }
    // stage ('build'){
    //     withAWS(credentials: 'aws-chansoo1280', region: 'ap-northeast-2') {
    //         sh(script: 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 633540653248.dkr.ecr.ap-northeast-2.amazonaws.com')
    //         sh 'docker build -t portfolio .'
    //         sh "docker tag portfolio:latest 633540653248.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio:${env.BUILD_NUMBER}"
    //         sh "docker push 633540653248.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio:${env.BUILD_NUMBER}"
    //         sh 'docker ps'
    //     }
    // }
    stage ('gitops'){
        sh 'dir'
        sh '''#!/bin/bash
            curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
            mv kustomize /usr/local/bin/
            kustomize version
        '''
        git url: 'https://github.com/chansoo1280/devops.git', credentialsId: 'git-chansoo1280'
        sh 'dir'
        sh 'cd argo/my-apps/portfolio/base'
        sh 'dir'
        sh "kustomize edit set image \"633540653248.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio=633540653248.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio:${env.BUILD_NUMBER}\""
        sh "cat kustomization.yaml"
    }
}