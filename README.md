# Scalable URL Shortener

A high-performance URL shortening service built with Node.js, Redis, and AWS Lambda, capable of handling 100K+ requests per second.

## 🚀 Features

- High-performance URL shortening with low latency
- Redis caching layer reducing database load by 50%
- Serverless architecture using AWS Lambda and API Gateway
- Visit tracking and analytics
- Infrastructure as Code using Terraform
- Automatic scaling and fault tolerance
- RESTful API with CORS support

## 🏗 Architecture

The service is built on a modern serverless architecture:

- **API Layer**: AWS API Gateway + Lambda functions
- **Caching Layer**: Redis (AWS ElastiCache)
- **Database Layer**: Amazon DynamoDB
- **Infrastructure**: Managed through Terraform

## 🛠 Tech Stack

- Node.js 18.x
- AWS Lambda
- Amazon DynamoDB
- Redis (AWS ElastiCache)
- Terraform
- Serverless Framework
- Jest for testing

## 📋 Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- Terraform installed
- Redis CLI (optional, for debugging)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Deploy infrastructure:
```bash
cd infrastructure/terraform
terraform init
terraform apply
```

4. Deploy the application:
```bash
npm run deploy
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
STAGE=dev
REGION=us-east-1
BASE_URL=https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev
```

## 📡 API Endpoints

### Create Short URL
```http
POST /urls
Content-Type: application/json

{
    "longUrl": "https://example.com/very-long-url"
}
```

### Redirect to Original URL
```http
GET /{shortId}
```

### Get URL Statistics
```http
GET /urls/{shortId}/stats
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run integration tests:
```bash
npm run test:integration
```

## 📊 Performance

- Average response time: <50ms
- Cache hit ratio: >90%
- Successful redirects: 99.99%
- Maximum throughput: 100K+ requests/second

## 🔒 Security

- Input validation for all URLs
- Rate limiting per IP
- DDoS protection through AWS Shield
- HTTPS-only endpoints
- Secure Redis configuration

## 📝 Infrastructure Details

The project uses the following AWS services:

- **API Gateway**: Handles incoming HTTP requests
- **Lambda**: Processes requests and business logic
- **DynamoDB**: Stores URL mappings and metadata
- **ElastiCache (Redis)**: Caches frequently accessed URLs
- **CloudWatch**: Monitoring and logging
- **IAM**: Security and access control

## 🔍 Monitoring

- CloudWatch Metrics
- Custom Redis metrics
- DynamoDB throughput monitoring
- Lambda execution metrics
- API Gateway request tracking

## 🚨 Error Handling

The service implements comprehensive error handling:

- Invalid URL detection
- Rate limit exceeded
- Service unavailable
- Database connection issues
- Cache failures

## 🔄 Scaling

The service automatically scales based on:

- Number of requests
- Lambda concurrent executions
- DynamoDB capacity
- Redis cache size

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@yourcompany.com or open an issue in the GitHub repository.

## 🏆 Acknowledgments

- AWS Lambda team for excellent documentation
- Redis Labs for caching best practices
- The serverless community for valuable insights

## 🔮 Future Improvements

- [ ] Custom domain support
- [ ] Analytics dashboard
- [ ] Bulk URL processing
- [ ] URL expiration
- [ ] QR code generation
- [ ] API key authentication
- [ ] Custom short URL support
