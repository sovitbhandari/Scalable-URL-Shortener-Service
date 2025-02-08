# 🚀 Scalable URL Shortener

A high-performance URL shortening service built with Node.js, Redis, and AWS Lambda, capable of handling 100K+ requests per second.

## 📋 Tech Stack

- Node.js 18.x
- AWS Lambda
- Amazon DynamoDB
- Redis (AWS ElastiCache)
- Terraform
- Serverless Framework
- Jest for testing

Create a short URL:
```bash
curl -X POST https://your-api.execute-api#.amazonaws.com/dev/urls \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'
```

## 🛠 Prerequisites

1. Install required tools:
```bash
# Install Node.js (Mac)
brew install node

# Install AWS CLI (Mac)
brew install awscli

# Install Terraform (Mac)
brew install terraform

# Install Serverless Framework
npm install -g serverless
```

2. Create AWS Account:
- Go to [AWS Console](https://aws.amazon.com/)
- Create a new account
- Create an IAM user with programmatic access
- Save the Access Key ID and Secret Access Key

## 🚀 Deployment Steps

### 1. Clone and Setup
```bash
# Clone repository
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener

# Install dependencies
npm install
```

### 2. Configure AWS
```bash
aws configure
# Enter your AWS credentials when prompted:
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json
```

### 3. Deploy Infrastructure
```bash
# Navigate to Terraform directory
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Create terraform.tfvars file
cat << EOF > terraform.tfvars
vpc_id = "vpc-xxxxx"                                    # Your VPC ID
vpc_cidr = "10.0.0.0/16"                               # Your VPC CIDR
private_subnet_ids = ["subnet-xxxxx", "subnet-yyyyy"]  # Your subnet IDs
environment = "dev"
EOF

# Deploy infrastructure
terraform apply -auto-approve
```

### 4. Configure Environment
```bash
# Create .env file in project root
cat << EOF > .env
REDIS_HOST=$(terraform output -raw redis_endpoint)
REDIS_PORT=$(terraform output -raw redis_port)
DYNAMODB_TABLE=$(terraform output -raw dynamodb_table_name)
STAGE=dev
REGION=us-east-1
BASE_URL=https://your-api.execute-api.us-east-1.amazonaws.com/dev
EOF
```

### 5. Deploy Application
```bash
# Return to project root
cd ../..

# Deploy using Serverless Framework
serverless deploy
```

## 🧪 Testing the Deployment

### 1. Create a Short URL
```bash
curl -X POST https://your-api.execute-api.us-east-1.amazonaws.com/dev/urls \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'

# Expected Response:
{
  "shortId": "abc123",
  "shortUrl": "https://your-api.execute-api.us-east-1.amazonaws.com/dev/abc123",
  "longUrl": "https://example.com"
}
```

### 2. Access Short URL
Open the shortUrl in your browser or:
```bash
curl -I https://your-api.execute-api.us-east-1.amazonaws.com/dev/abc123
```

### 3. View Statistics
```bash
curl https://your-api.execute-api.us-east-1.amazonaws.com/dev/urls/abc123/stats
```

## 🔍 Monitoring

Access logs and metrics:
1. Open [AWS CloudWatch](https://console.aws.amazon.com/cloudwatch/)
2. Check the following metrics:
   - Lambda function invocations
   - API Gateway requests
   - DynamoDB operations
   - Redis cache hits/misses

## 🚨 Troubleshooting

### Common Issues

1. **Deployment Fails**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Verify VPC settings
aws ec2 describe-vpcs
```

2. **Redis Connection Issues**
```bash
# Test Redis connection
redis-cli -h $REDIS_HOST -p $REDIS_PORT ping
```

3. **Lambda Errors**
- Check CloudWatch logs:
```bash
serverless logs -f createShortUrl
serverless logs -f redirectToLongUrl
```

## 🧹 Cleanup

When you're done testing:
```bash
# Remove serverless deployment
serverless remove

# Destroy infrastructure
cd infrastructure/terraform
terraform destroy -auto-approve
```

## 💰 Cost Estimation

Free tier eligible, but typical monthly costs:
- Lambda: ~$5
- DynamoDB: ~$10
- Redis: ~$15
- API Gateway: ~$5
- Total: ~$35/month

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
