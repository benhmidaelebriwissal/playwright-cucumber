pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'master', url: 'https://github.com/'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running E2E tests...'
                sh 'npx cucumber-js --tags "@e2e"'
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Publishing reports...'
                archiveArtifacts artifacts: 'tests/reports/**/*.html', allowEmptyArchive: true
                publishHTML(target: [
                    reportName: 'Cucumber HTML Report',
                    reportDir: 'tests/reports',
                    reportFiles: 'report.html',
                    keepAll: true
                ])
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}